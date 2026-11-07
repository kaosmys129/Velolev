/**
 * volvet 工业机械 - 邮件订阅者数据存储 (SQLite)
 * 严格保持在私有目录，防止暴露于前端公网资源
 */
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync, existsSync, lstatSync } from "node:fs";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";

export class SubscriptionStore {
  constructor(directory) {
    this.directory = resolve(directory);
    mkdirSync(this.directory, { recursive: true, mode: 0o700 });
    if (lstatSync(this.directory).isSymbolicLink()) {
      throw new Error("Subscription directory must not be a symbolic link.");
    }
    chmodSync(this.directory, 0o700);

    const database = join(this.directory, "subscriptions.sqlite");
    if (existsSync(database) && lstatSync(database).isSymbolicLink()) {
      throw new Error("Subscription database must not be a symbolic link.");
    }

    this.db = new DatabaseSync(database);
    chmodSync(database, 0o600);

    this.db.exec(`
      PRAGMA journal_mode=WAL;
      PRAGMA synchronous=FULL;
      PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        locale TEXT NOT NULL DEFAULT 'en',
        country TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        source_page TEXT,
        resend_contact_id TEXT,
        created_at TEXT NOT NULL,
        unsubscribed_at TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
      CREATE INDEX IF NOT EXISTS idx_subscribers_created ON subscribers(created_at DESC);
    `);
  }

  normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  get(email) {
    const normalized = this.normalizeEmail(email);
    return this.db.prepare("SELECT * FROM subscribers WHERE email=?").get(normalized) || null;
  }

  subscribe({ email, locale = "en", country = null, sourcePage = "/", resendContactId = null }) {
    const normalized = this.normalizeEmail(email);
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error("Invalid email address format.");
    }

    const existing = this.get(normalized);
    const now = new Date().toISOString();

    if (existing) {
      if (existing.status === "unsubscribed") {
        this.db.prepare(`
          UPDATE subscribers 
          SET status='active', unsubscribed_at=NULL, locale=?, country=COALESCE(?, country),
              source_page=COALESCE(?, source_page), resend_contact_id=COALESCE(?, resend_contact_id)
          WHERE email=?
        `).run(locale, country, sourcePage, resendContactId, normalized);
        return { id: existing.id, email: normalized, status: "resubscribed", isNew: false };
      }
      return { id: existing.id, email: normalized, status: "active", isNew: false };
    }

    const id = randomUUID();
    this.db.prepare(`
      INSERT INTO subscribers (id, email, locale, country, status, source_page, resend_contact_id, created_at)
      VALUES (?, ?, ?, ?, 'active', ?, ?, ?)
    `).run(id, normalized, locale, country, sourcePage, resendContactId, now);

    return { id, email: normalized, status: "active", isNew: true };
  }

  unsubscribe(email) {
    const normalized = this.normalizeEmail(email);
    const now = new Date().toISOString();
    const result = this.db.prepare(`
      UPDATE subscribers 
      SET status='unsubscribed', unsubscribed_at=?
      WHERE email=? AND status='active'
    `).run(now, normalized);

    return { email: normalized, changed: result.changes > 0 };
  }

  isSubscribed(email) {
    const record = this.get(email);
    return Boolean(record && record.status === "active");
  }

  updateContactId(email, contactId) {
    const normalized = this.normalizeEmail(email);
    this.db.prepare("UPDATE subscribers SET resend_contact_id=? WHERE email=?").run(contactId, normalized);
  }

  listActive({ offset = 0, limit = 50 } = {}) {
    const total = this.db.prepare("SELECT count(*) as total FROM subscribers WHERE status='active'").get().total;
    const rows = this.db.prepare(`
      SELECT id, email, locale, country, source_page, resend_contact_id, created_at 
      FROM subscribers 
      WHERE status='active' 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `).all(Math.floor(Math.min(Math.max(limit, 1), 500)), Math.floor(Math.max(offset, 0)));

    return { total, items: rows, offset, limit };
  }

  totalActive() {
    return this.db.prepare("SELECT count(*) as total FROM subscribers WHERE status='active'").get().total;
  }

  close() {
    if (!this.closed) {
      this.db.close();
      this.closed = true;
    }
  }
}
