import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync, existsSync, lstatSync } from "node:fs";
import { join, resolve } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { InquiryError } from "./inquiry-validation.mjs";

export class InquiryStore {
  constructor(directory, {testMode = false} = {}) {
    this.directory = resolve(directory); this.testMode = testMode;
    mkdirSync(this.directory,{recursive:true,mode:0o700});
    if (lstatSync(this.directory).isSymbolicLink()) throw new Error("Inquiry directory must not be a symbolic link.");
    chmodSync(this.directory,0o700);
    const database = join(this.directory,"inquiries.sqlite");
    if (existsSync(database) && lstatSync(database).isSymbolicLink()) throw new Error("Inquiry database must not be a symbolic link.");
    this.db = new DatabaseSync(database); chmodSync(database,0o600);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY, reference TEXT UNIQUE NOT NULL, idempotency_key TEXT UNIQUE NOT NULL,
        digest TEXT NOT NULL, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new',
        is_test INTEGER NOT NULL, payload TEXT NOT NULL, attachment_name TEXT,
        attachment_type TEXT, attachment_size INTEGER, attachment BLOB
      );
      CREATE INDEX IF NOT EXISTS inquiries_created ON inquiries(created_at DESC);`);
  }
  existing(key) { return this.db.prepare("SELECT id,reference,digest,created_at,is_test FROM inquiries WHERE idempotency_key=?").get(key); }
  receipt(row, duplicate = false) { return {id:row.id,reference:row.reference,receivedAt:row.created_at,status:"received",isTest:Boolean(row.is_test),duplicate,emailNotification:"not_configured"}; }
  save(payload, attachment, key) {
    const digest = createHash("sha256").update(JSON.stringify(payload)).update(attachment?.sha256 ?? "").update(attachment?.name ?? "").digest("hex");
    const existing = this.existing(key);
    if (existing) {
      if (existing.digest !== digest) throw new InquiryError(409,"request_changed","The request changed. Please start a new submission.");
      return this.receipt(existing,true);
    }
    const id = randomUUID(), createdAt = new Date().toISOString();
    const reference = `VOL-${createdAt.slice(0,10).replaceAll("-","")}-${id.slice(0,8).toUpperCase()}`;
    try {
      this.db.prepare(`INSERT INTO inquiries (id,reference,idempotency_key,digest,created_at,is_test,payload,attachment_name,attachment_type,attachment_size,attachment)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(id,reference,key,digest,createdAt,this.testMode?1:0,JSON.stringify(payload),attachment?.name??null,attachment?.type??null,attachment?.size??null,attachment?.bytes??null);
    } catch (error) {
      const prior = this.existing(key);
      if (prior && prior.digest === digest) return this.receipt(prior,true);
      throw error;
    }
    return this.receipt({id,reference,created_at:createdAt,is_test:this.testMode?1:0});
  }
  format(row) {
    if (!row) return null;
    return {id:row.id,reference:row.reference,createdAt:row.created_at,status:row.status,isTest:Boolean(row.is_test),...JSON.parse(row.payload),attachment:row.attachment_name?{name:row.attachment_name,type:row.attachment_type,size:row.attachment_size}:null};
  }
  list({offset=0,limit=30,includeTests=false}={}) {
    const where=includeTests?"":"WHERE is_test=0";
    const total=this.db.prepare(`SELECT count(*) AS total FROM inquiries ${where}`).get().total;
    const rows=this.db.prepare(`SELECT id,reference,created_at,status,is_test,payload,attachment_name,attachment_type,attachment_size FROM inquiries ${where} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`).all(Math.floor(Math.min(Math.max(limit,1),100)),Math.floor(Math.max(offset,0)));
    return {total,items:rows.map((r)=>this.format(r)),offset,limit};
  }
  get(id) { return this.format(this.db.prepare("SELECT id,reference,created_at,status,is_test,payload,attachment_name,attachment_type,attachment_size FROM inquiries WHERE id=?").get(id)); }
  attachment(id) { return this.db.prepare("SELECT attachment_name,attachment_type,attachment FROM inquiries WHERE id=? AND attachment IS NOT NULL").get(id)??null; }
  update(id,status) {
    if (!["new","in_review","quoted","closed"].includes(status)) throw new InquiryError(422,"invalid_status","Unknown inquiry status.");
    const changed=this.db.prepare("UPDATE inquiries SET status=? WHERE id=?").run(status,id).changes;
    if(!changed)throw new InquiryError(404,"not_found","Inquiry not found.");
    return this.get(id);
  }
  exportCsv({includeTests=false}={}) {
    const fields=["reference","createdAt","status","isTest","name","company","email","phone","country","inquiryType","application","quantity","poleHeight","poleWeight","message","sourcePage","locale"];
    const cell=(v)=>{let s=String(v??"");if(/^[=+@\-\t\r\n]|^\s+[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
    const rows=this.list({limit:100,includeTests});let items=[...rows.items];
    for(let offset=100;offset<rows.total;offset+=100)items.push(...this.list({limit:100,offset,includeTests}).items);
    return "\ufeff"+[fields.map(cell).join(","),...items.map(row=>fields.map(k=>cell(row[k])).join(","))].join("\r\n");
  }
  close() { if(!this.closed){this.db.close();this.closed=true;} }
}
