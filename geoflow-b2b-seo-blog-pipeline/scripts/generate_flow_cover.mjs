#!/usr/bin/env node
/**
 * generate_flow_cover.mjs
 * 
 * GEOFlow 出海文章高定浅色系工程封面大图生成引擎 (Nordic Light Industrial Style)
 * 深度对齐 Astro 站点浅色系视觉体系 (--paper: #f3f2ec, --ink: #1d201e, --line: #d5d8cd, --yellow: #f4cc3d)
 * 
 * 核心升级：
 *   1. 彻底切换为整站统一的高定浅色系（工程暖白底色 + 精细浅灰坐标网格 + 工业安全橙与石墨黑高对比）；
 *   2. 背景丰富多元化：根据文章核心内容动态融合【CAD 机械蓝图剖面 + 真实施工道路标线 + 太阳能光伏/地基法兰线稿 + 吊车对比外廓 + 0-90° 激光起升轨迹】；
 *   3. 画面右侧置入 volvet 真实高精透明设备立姿（823x579 透明抠图），配以自然柔和的重机漫射投影；
 *   4. 国际顶级工业大刊排版（IEEE Spectrum / Scandinavian Industrial Design 风格）：
 *      - 醒目大标题、深浅字重交替、关键词工业橙高亮、纯白浮雕 HUD 遥测三联数据卡；
 *   5. 保持 Google Flow MCP (Nano Banana 2 / Imagen 4) 的提示词生成与参考图绑定契约（浅色实景光照规范）；
 *   6. 自动回写 Markdown Frontmatter (coverImage) 与正文顶部图注，并同步至 Astro public 目录。
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态定位工程根目录
let projectRoot = '/Users/peterpc/Documents/liftpolemachine-web';
const candidates = [process.cwd(), path.resolve(__dirname, '../../..'), '/Users/peterpc/Documents/liftpolemachine-web'];
for (const c of candidates) {
  try {
    const s = await fs.stat(path.join(c, 'maquin-astro-theme'));
    if (s.isDirectory()) {
      projectRoot = c;
      break;
    }
  } catch {}
}

// 资源绝对路径
const REFERENCE_IMAGE_PATH = path.resolve(projectRoot, 'portable-pole-lifter-side-master.png');
const RIG_CUTOUT_PATH = path.resolve(projectRoot, 'design-exports/assets/portable-pole-lifter-hero-cutout.png');

// 8 种语言的封面图排版与图注文案字典 (浅色系版)
const COVER_I18N = {
  zh: {
    kicker: '全球重工基础设施现场特讯 · 工况技术标定',
    heroBadge: 'F001-F031 物理事实网 · 免吊车作业核定',
    defaultTitle: '零吊车 12m 路灯原位液压起竖系统',
    defaultSubtitle: '85kg 分体双模组流体动力架构 · 标定 300kg 垂直试验台核定载荷 · 严格双人标准化作业编制 · 彻底免除大型汽车吊进场审批与封路损耗',
    kpi1: '300KG 垂直核定载荷',
    kpi1Sub: 'F002 · 垂直试验台 24H 稳压保载',
    kpi2: '12M 最大适配杆高',
    kpi2Sub: 'F003 · 6M-12M 市政照明灯柱',
    kpi3: '85KG 分体双模组',
    kpi3Sub: 'F008 · 45KG 主机 + 40KG 电箱',
    mapLegend: '现场实测工况 · 2.5M 安全作业半径 · 零汽车吊支腿占道',
    statusTag: '现场工况核验通过 (VERIFIED)',
    figureCaption: (slug) => `\n![volvet 便携式路灯升杆机工程现场真实感封面大图](/images/${slug}/cover-flow-hero-16x9.png)\n*封面全景大图：volvet 便携式升杆机 12m 市政路灯免吊车原位液压起竖工程全景。背景融合施工现场 CAD 蓝图与工况测绘标线，标定 24V DC 动力总成与严格双人作业编制合规，彻底消除汽车起重机占道盲区。*\n`
  },
  en: {
    kicker: 'GLOBAL INFRASTRUCTURE FIELD DISPATCH · ENGINEERING LOG',
    heroBadge: 'FACT REGISTER F001-F031 · ZERO-CRANE CERTIFIED',
    defaultTitle: 'Zero-Crane 12m Light Pole Hydraulic Erection',
    defaultSubtitle: 'Split 85kg Two-Module Architecture for Rapid Ground-Level Deployment · Verified 300kg Proof Load · Eliminates 16-Ton Boom Truck Roadway Closures',
    kpi1: '300KG PROOF LOAD',
    kpi1Sub: 'F002 · VERTICAL TEST RIG AUDITED',
    kpi2: '12M MAX COLUMN',
    kpi2Sub: 'F003 · STANDARD 6M–12M SHAFTS',
    kpi3: '85KG SPLIT WEIGHT',
    kpi3Sub: 'F008 · 45KG RIG + 40KG 24V PACK',
    mapLegend: 'SITE ENGINEERING CADASTRAL · 2.5M SAFETY RADIUS · ZERO OUTRIGGER FOOTPRINT',
    statusTag: 'FIELD VERIFIED SPECIFICATION',
    figureCaption: (slug) => `\n![volvet Portable Light Pole Lifter Cinematic Engineering Cover Hero](/images/${slug}/cover-flow-hero-16x9.png)\n*Cover Hero: On-site zero-crane erection of 12m municipal lighting pole using volvet portable lifter. Integrated with site engineering layout and mechanical blueprint. Standard 2-person crew compliance eliminates heavy crane roadway closures.*\n`
  },
  es: {
    kicker: 'DESPACHO DE INFRAESTRUCTURA GLOBAL · REGISTRO TÉCNICO',
    heroBadge: 'REGISTRO DE HECHOS F001-F031 · OPERACIÓN SIN GRÚA',
    defaultTitle: 'Instalación Hidráulica de Postes de 12m Sin Grúa',
    defaultSubtitle: 'Arquitectura Bimodular de 85kg para Despliegue Rápido en Suelo · Carga de Prueba de 300kg · Elimina Permisos de Bloqueo Vial por Grúas Pesadas',
    kpi1: '300 KG CARGA DE PRUEBA',
    kpi1Sub: 'F002 · BANCO VERTICAL CERTIFICADO',
    kpi2: '12 M ALTURA MÁXIMA',
    kpi2Sub: 'F003 · POSTES ESTÁNDAR 6M-12M',
    kpi3: '85 KG SISTEMA DIVIDIDO',
    kpi3Sub: 'F008 · ELEVADOR 45KG + BATERÍA 40KG',
    mapLegend: 'TOPOLOGÍA DE OBRA EN CAMPO · RADIO DE SEGURIDAD 2.5M · CERO ESTABILIZADORES',
    statusTag: 'ESPECIFICACIÓN VERIFICADA',
    figureCaption: (slug) => `\n![Elevador portátil de postes volvet portada de ingeniería cinematográfica](/images/${slug}/cover-flow-hero-16x9.png)\n*Portada Principal: Despliegue en campo del elevador portátil de postes de luz volvet para instalación sin grúa de columnas de 12 m. Integrado con esquemas de ingeniería y sin cortes de tránsito vial.*\n`
  },
  fr: {
    kicker: 'DISPATCH INFRASTRUCTURE INDUSTRIELLE · RAPPORT CHANTIER',
    heroBadge: 'REGISTRE DES FAITS F001-F031 · VALIDÉ SANS CAMION-GRUE',
    defaultTitle: 'Érection Hydraulique de Candélabres 12m Sans Grue',
    defaultSubtitle: 'Architecture Bimodulaire 85kg Déployable au Sol · Charge d\'Épreuve 300kg · Élimine les Blocages de Voie et Camions-Grues 16 Tonnes',
    kpi1: '300KG CHARGE D\'ÉPREUVE',
    kpi1Sub: 'F002 · BANC D\'ESSAI VERTICAL HOMOLOGUÉ',
    kpi2: '12M HAUTEUR MAX.',
    kpi2Sub: 'F003 · MÂTS STANDARDS 6M–12M',
    kpi3: '85KG BI-MODULE SPLIT',
    kpi3Sub: 'F008 · VÉRIN 45KG + ARMOIRE 40KG',
    mapLegend: 'PLAN DE VOIRIE DU CHANTIER · RAYON DE SÉCURITÉ 2,5M · ZÉRO STABILISATEUR',
    statusTag: 'CONFORME AUX NORMES OSHA / IEEE',
    figureCaption: (slug) => `\n![Élévateur de candélabre portable volvet couverture d'ingénierie cinématique](/images/${slug}/cover-flow-hero-16x9.png)\n*Image de Couverture : Déploiement sur site du système de levage hydraulique portable volvet pour mâts de 12 m sans camion-grue. Intégré aux plans de chantier et normes de sécurité.*\n`
  },
  pt: {
    kicker: 'INFRAESTRUTURA PESADA GLOBAL · RELATÓRIO TÉCNICO DE OBRA',
    heroBadge: 'REGISTRO DE FATOS F001-F031 · EREÇÃO SEM GUINDASTE',
    defaultTitle: 'Ereção Hidráulica de Postes de 12m Sem Guindaste',
    defaultSubtitle: 'Arquitetura Bipartida de 85kg para Montagem no Solo · Carga de Prova de 300kg · Elimina Interdição de Vias por Caminhões-Guindaste',
    kpi1: '300KG CARGA DE PROVA',
    kpi1Sub: 'F002 · BANCADA VERTICAL TESTADA',
    kpi2: '12M ALTURA MÁXIMA',
    kpi2Sub: 'F003 · POSTES PADRÃO 6M–12M',
    kpi3: '85KG SISTEMA BIPARTIDO',
    kpi3Sub: 'F008 · MÓDULO 45KG + BATERIA 40KG',
    mapLegend: 'TOPOLOGIA TÉCNICA LOCAL · RAIO DE SEGURANÇA 2,5M · SEM SAPATAS ESTABILIZADORAS',
    statusTag: 'OPERAÇÃO EM CAMPO HOMOLOGADA',
    figureCaption: (slug) => `\n![Elevador portátil de postes volvet capa de engenharia cinematográfica](/images/${slug}/cover-flow-hero-16x9.png)\n*Capa Principal: Montagem em campo de poste de iluminação de 12m sem caminhão-guindaste com o elevador portátil volvet. Integrado com plantas técnicas de obra.*\n`
  },
  vi: {
    kicker: 'BÁO CÁO KỸ THUẬT HẠ TẦNG TOÀN CẦU · HỒ SƠ CÔNG TRÌNH',
    heroBadge: 'MẠNG LƯỚI THỰC TẾ F001-F031 · THI CÔNG KHÔNG DÙNG CẦU',
    defaultTitle: 'Dựng Trụ Đèn 12m Bằng Thủy Lực Không Dùng Cần Cẩu',
    defaultSubtitle: 'Kết Cấu Tách Đôi 85kg Lắp Ráp Tại Mặt Đất · Tải Trọng Thử Nghiệm 300kg · Loại Bỏ Hoàn Toàn Gián Đoạn Giao Thông Do Xe Cẩu 16 Tấn',
    kpi1: '300KG TẢI TRỌNG THỬ NGHIỆM',
    kpi1Sub: 'F002 · KIỂM ĐỊNH BÀN NÂNG THẲNG ĐỨNG',
    kpi2: '12M CHIỀU CAO CỘT',
    kpi2Sub: 'F003 · CỘT ĐÈN TIÊU CHUẨN 6M–12M',
    kpi3: '85KG TRỌNG LƯỢNG RỜI',
    kpi3Sub: 'F008 · TRỤ NÂNG 45KG + PIN 40KG',
    mapLegend: 'MẶT BẰNG THI CÔNG ĐÔ THỊ · BÁN KÍNH AN TOÀN 2.5M · KHÔNG CHÂN CHỐNG CẨU',
    statusTag: 'HỆ THỐNG ĐÃ KIỂM ĐỊNH CHẤT LƯỢNG',
    figureCaption: (slug) => `\n![Máy dựng trụ đèn chiếu sáng di động volvet ảnh bìa kỹ thuật điện ảnh](/images/${slug}/cover-flow-hero-16x9.png)\n*Hình Bìa Toàn Cảnh: Hiện trường thi công lắp dựng cột đèn chiếu sáng 12m không cần xe cẩu bằng máy nâng thủy lực di động volvet kết hợp bản vẽ thiết kế thi công.*\n`
  },
  th: {
    kicker: 'รายงานภาคสนามโครงสร้างพื้นฐานระดับโลก · ข้อมูลวิศวกรรมหน้างาน',
    heroBadge: 'เครือข่ายข้อเท็จจริง F001-F031 · ทำงานโดยไม่ใช้รถเครน',
    defaultTitle: 'ระบบยกเสาไฟถนน 12m ไฮดรอลิกโดยไม่ใช้รถเครน',
    defaultSubtitle: 'โครงสร้างแยกสองส่วน 85 กก. ติดตั้งที่ระดับพื้นดิน · โหลดทดสอบ 300 กก. · ปราศจากการปิดถนนและไม่ต้องใช้รถเครน 16 ตัน',
    kpi1: '300 กก. โหลดทดสอบแนวตั้ง',
    kpi1Sub: 'F002 · ผ่านการทดสอบแท่นทดสอบแนวตั้ง',
    kpi2: '12 ม. ความสูงเสาสูงสุด',
    kpi2Sub: 'F003 · เสาไฟมาตรฐาน 6 ม. - 12 ม.',
    kpi3: '85 กก. น้ำหนักแยกสองส่วน',
    kpi3Sub: 'F008 · แท่นยก 45 กก. + ชุดไฟ 40 กก.',
    mapLegend: 'ผังวิศวกรรมถนนภาคสนาม · รัศมีความปลอดภัย 2.5 ม. · ไม่มีขาค้ำยันกีดขวางทาง',
    statusTag: 'มาตรฐานวิศวกรรมได้รับการยืนยัน',
    figureCaption: (slug) => `\n![เครื่องยกเสาไฟถนนแบบพกพา volvet ภาพหน้าปกวิศวกรรมภาพยนตร์](/images/${slug}/cover-flow-hero-16x9.png)\n*ภาพหน้าปกหลัก: การติดตั้งเสาไฟถนนเทศบาลสูง 12 เมตรในสถานที่จริงโดยไม่ต้องใช้รถเครนด้วยเครื่องยกไฮดรอลิกแบบพกพา volvet ผสานแบบร่างทางวิศวกรรมหน้างาน.*\n`
  },
  id: {
    kicker: 'DISPATCH INFRASTRUKTUR GLOBAL · CATATAN TEKNIK LAPANGAN',
    heroBadge: 'JARINGAN FAKTA F001-F031 · TERSERTIFIKASI TANPA DEREK',
    defaultTitle: 'Pemasangan Tiang Lampu 12m Hidrolik Tanpa Derek',
    defaultSubtitle: 'Arsitektur Bimodular 85kg Pemasangan di Permukaan Tanah · Beban Uji 300kg · Menghilangkan Penutupan Jalan Oleh Truk Derek 16 Ton',
    kpi1: '300KG BEBAN UJI VERTIKAL',
    kpi1Sub: 'F002 · TERUJI PADA BENCH VERTIKAL',
    kpi2: '12M TINGGI TIANG MAKSIMAL',
    kpi2Sub: 'F003 · TIANG PENERANGAN 6M–12M',
    kpi3: '85KG BERAT TERPISAH',
    kpi3Sub: 'F008 · ALAT 45KG + BATERAI 40KG',
    mapLegend: 'TATA LETAK PROYEK JALAN · RADIUS KEAMANAN 2.5M · BEBAS KAKI DEREK',
    statusTag: 'VERIFIKASI TEKNIS SELESAI',
    figureCaption: (slug) => `\n![Alat pengangkat tiang lampu portabel volvet sampul rekayasa sinematik](/images/${slug}/cover-flow-hero-16x9.png)\n*Sampul Utama: Pemasangan tiang lampu jalan 12 meter di lapangan tanpa truk derek menggunakan pengangkat hidrolik portabel volvet. Dilengkapi tata letak rekayasa lapangan.*\n`
  }
};

/**
 * 语言检测器
 */
export function detectArticleLanguage(filePath, content) {
  const base = path.basename(filePath, path.extname(filePath)).toLowerCase();
  const langMatch = base.match(/-(zh|en|es|fr|pt|vi|th|id)$/);
  if (langMatch) return langMatch[1];

  if (/[\u0e00-\u0e7f]/.test(content)) return 'th';
  if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(content)) return 'vi';
  if (/[\u4e00-\u9fa5]/.test(content)) return 'zh';
  if (/\b(d'épreuve|candélabre|conformité|levage|techniciens)\b/i.test(content)) return 'fr';
  if (/\b(instalação|guindaste|bipartido|operadores|iluminação)\b/i.test(content)) return 'pt';
  if (/\b(elevador|instalación|postes|cuadrilla|hidráulica)\b/i.test(content)) return 'es';
  if (/\b(pemasangan|pengangkat|tanpa derek|petugas|tiang lampu)\b/i.test(content)) return 'id';

  return 'en';
}

/**
 * 工况分类与工程背景元素识别
 */
export function extractArticleHighlights(content, filePath, lang) {
  const baseName = path.basename(filePath, path.extname(filePath));
  let slug = baseName
    .replace(/polelift/gi, 'volvet-lifter')
    .replace(/velolev/gi, 'volvet');

  let title = '';
  let metaDesc = '';
  let keyTakeaways = [];
  let contextType = 'urban'; // urban | highway | solar | flange
  let specificContext = 'urban roadway sidewalk with pedestrian brick pavers and curbside green strip';
  let coordinates = '31°14\'24.8"N 121°28\'12.4"E';
  let projectTag = 'URBAN UTILITY MUNICIPAL INFRASTRUCTURE';

  // 1. 匹配 Frontmatter
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  let body = content;
  if (fmMatch) {
    body = content.slice(fmMatch[0].length);
    const lines = fmMatch[1].split('\n');
    for (const l of lines) {
      const kv = l.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
      if (kv) {
        const k = kv[1].trim().toLowerCase();
        const v = kv[2].trim().replace(/^["']|["']$/g, '');
        if (k === 'title') title = v;
        if (k === 'slug') slug = v;
        if (k === 'description' || k === 'meta_description') metaDesc = v;
      }
    }
  }

  // 2. 匹配 H1 标题
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) title = h1Match[1].trim();
  }

  // 3. 匹配 Key Takeaways
  const ktMatch = body.match(/^> ### [^\n]+\n((?:> [^\n]+\n)+)/m);
  if (ktMatch) {
    keyTakeaways = ktMatch[1]
      .split('\n')
      .map(s => s.replace(/^>\s*[-*]?\s*/, '').trim())
      .filter(s => s.length > 5);
  }

  // 4. 分析工况特征与背景元素主题
  const lowerContent = body.toLowerCase();
  if (lowerContent.includes('highway') || lowerContent.includes('高速') || lowerContent.includes('autovía') || lowerContent.includes('crane vs') || lowerContent.includes('随车吊') || lowerContent.includes('compar')) {
    contextType = 'highway';
    specificContext = 'intercity highway road shoulder with protective guardrails and crash cushions, eliminating 16-ton crane lane blockage';
    coordinates = '32°03\'18.2"N 118°47\'39.1"E';
    projectTag = 'HIGHWAY CORRIDOR · ZERO-CRANE ACCESS';
  } else if (lowerContent.includes('solar') || lowerContent.includes('太阳能') || lowerContent.includes('battery') || lowerContent.includes('off-grid')) {
    contextType = 'solar';
    specificContext = 'clean energy industrial park and off-grid solar street lighting array with PV module assembly';
    coordinates = '22°34\'12.0"N 113°53\'28.5"E';
    projectTag = 'SOLAR OFF-GRID MICROGRID · PV ARRAY';
  } else if (lowerContent.includes('flange') || lowerContent.includes('法兰') || lowerContent.includes('p.c.d.') || lowerContent.includes('mặt bích') || lowerContent.includes('foundation') || lowerContent.includes('地基')) {
    contextType = 'flange';
    specificContext = 'concrete pedestal foundation with exposed heavy M20 anchor bolts and slotted flange plate compatibility';
    coordinates = '39°54\'15.6"N 116°24\'27.0"E';
    projectTag = 'CIVIL STRUCTURAL CAD · P.C.D. 180-260MM';
  } else {
    contextType = 'urban';
    specificContext = 'dense municipal sidewalk with brick pavers, curbside trees, zero space for crane outriggers';
    coordinates = '31°14\'24.8"N 121°28\'12.4"E';
    projectTag = 'MUNICIPAL URBAN STREETLIGHT RENEWAL';
  }

  const dict = COVER_I18N[lang] || COVER_I18N.en;

  return {
    slug,
    lang,
    contextType,
    coordinates,
    projectTag,
    title: title || dict.defaultTitle,
    subtitle: metaDesc || (keyTakeaways[0] ? keyTakeaways[0].slice(0, 150) : dict.defaultSubtitle),
    keyTakeaways,
    specificContext,
    dict
  };
}

/**
 * 组装 Google Flow MCP (Nano Banana 2 / Imagen 4) 浅色系实景工程提示词
 */
export function buildGoogleFlowPrompt(highlights) {
  const { specificContext } = highlights;

  const prompt = [
    `Cinematic, bright daylight, Scandinavian architectural documentary engineering photography of the volvet portable light pole lifter rig operating on site.`,
    `Subject: A heavy-duty, compact industrial fluid-power pole lifter machine with a telescoping hydraulic lift column (finished in industrial safety orange and graphite grey), firmly bolted to a concrete foundation base with heavy galvanized anchor bolts. A secondary mechanical safety lock pin is clearly visible on the hydraulic mast.`,
    `Action & Crew: Two professional utility electricians wearing clean fluorescent high-visibility safety vests (EN ISO 20471 compliant) and hard hats are working collaboratively. One technician operates the handheld ergonomic remote control pendant, while the second technician observes at a 45-degree vantage angle to ensure clearance. A standard 10-meter octagonal galvanized steel street lighting pole is tilting steadily upward from 0 to 45 degrees towards the vertical position.`,
    `Setting & Environment: ${specificContext}. Bright morning natural sunlight, clear blue sky, clean pale concrete pavement and curb alignment. Clean site logistics. Noticeably NO large mobile cranes, NO 16-ton boom trucks, NO extended outriggers blocking traffic, leaving the street lane completely open and unobstructed.`,
    `Style & Lighting: Clean Scandinavian light industrial aesthetic, high-key photography, shot on Hasselblad H6D-100c medium format camera with 50mm f/4 prime lens. Warm morning daylight casting soft, realistic shadows on light-toned pavement. Crisp engineering details, authentic mechanical textures, shallow depth of field, 8K resolution, ultra-detailed, photorealistic editorial style, award-winning industrial design showcase, zero AI cartoonish artifacts, no dark gritty shadows, no text watermark.`
  ].join(' ');

  return {
    prompt,
    model: 'Nano Banana 2',
    ratio: '16:9',
    auto_confirm: true,
    reference_images: [REFERENCE_IMAGE_PATH]
  };
}

/**
 * 生成高定浅色系工程图与多元背景元素 SVG
 * 融入：CAD 蓝图线稿、真实路况标线、等高线、力学起升导轨、地基法兰与微缩拓扑
 */
export function generateContextualEngineeringSvg(contextType) {
  // 浅色系高定色彩规范 (Nordic Light Industrial)
  const lineSubtle = 'rgba(29, 32, 30, 0.08)';  // 淡灰辅助网格线
  const linePrimary = 'rgba(29, 32, 30, 0.22)'; // 主要工程结构线
  const orangeAccent = '#ea580c';                // 工业安全橙标示
  const blueBlueprint = '#0284c7';               // CAD 蓝图指示色
  const yellowRoad = '#f59e0b';                  // 道路交通黄色虚线
  const nodeFill = '#0ea5e9';                    // 灯位点

  let contextualVectors = '';

  if (contextType === 'highway') {
    // 高速公路工况：双向 6 车道标线 + 16t 随车吊危险作业圈对比 + 道路走廊
    contextualVectors = `
      <!-- 背景：轻量化微缩拓扑线与等高线 -->
      <path d="M-50 220 C400 180, 800 320, 1300 240 S1800 380, 2050 320" fill="none" stroke="${lineSubtle}" stroke-width="2" />
      <path d="M-50 380 C350 320, 750 460, 1350 390 S1850 510, 2050 460" fill="none" stroke="${lineSubtle}" stroke-width="2" />
      <path d="M-50 580 C300 520, 700 680, 1250 600 S1750 720, 2050 670" fill="none" stroke="${lineSubtle}" stroke-width="2" />

      <!-- 高速公路干线与主辅道 (浅灰高质感路面标线) -->
      <path d="M-50 820 C500 750, 950 560, 1400 380 S1800 180, 2050 120" fill="none" stroke="rgba(226, 232, 240, 0.9)" stroke-width="70" />
      <path d="M-50 820 C500 750, 950 560, 1400 380 S1800 180, 2050 120" fill="none" stroke="${linePrimary}" stroke-width="4" />
      <path d="M-50 820 C500 750, 950 560, 1400 380 S1800 180, 2050 120" fill="none" stroke="${yellowRoad}" stroke-width="3" stroke-dasharray="16 12" />

      <!-- 远景：16t 汽车起重机对比线框与 15m 封路危险半径 (对比突出痛点) -->
      <g opacity="0.45" transform="translate(1420, 220)">
        <circle cx="0" cy="0" r="140" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" />
        <line x1="-140" y1="0" x2="140" y2="0" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="0" y1="-140" x2="0" y2="140" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 4" />
        <text x="-120" y="-150" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#ef4444" font-weight="700">⚠️ TRADITIONAL CRANE RISK ZONE: 15M (ROAD CLOSURE REQUIRED)</text>
      </g>

      <!-- 近景：便携式立杆机 2.5m 紧凑自锚作业区 (高亮绿/橙) -->
      <circle cx="1480" cy="580" r="160" fill="rgba(234, 88, 12, 0.04)" stroke="${orangeAccent}" stroke-width="2.5" stroke-dasharray="8 6" />
      <circle cx="1480" cy="580" r="8" fill="${orangeAccent}" />
      <text x="1330" y="770" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${orangeAccent}" font-weight="700">✓ VOLVET RIG: ZERO CRANE OUTRIGGER FOOTPRINT</text>

      <!-- 高速公路路桩与标牌微缩符号 -->
      <rect x="1100" y="180" width="160" height="36" rx="4" fill="#ffffff" stroke="${linePrimary}" stroke-width="1.5" />
      <text x="1115" y="204" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#1d201e" font-weight="700">KM 42+300 CORRIDOR</text>
    `;
  } else if (contextType === 'solar') {
    // 太阳能离网工况：光伏阵列线框 + 24V DC 动力总成 + 灯杆阵列拓扑
    contextualVectors = `
      <!-- 太阳能单晶硅光伏组件 (PV Module) CAD 几何结构线框 -->
      <g transform="translate(1200, 160) scale(0.9)" opacity="0.6">
        <rect x="0" y="0" width="360" height="220" rx="4" fill="rgba(2, 132, 199, 0.05)" stroke="${blueBlueprint}" stroke-width="2" />
        <line x1="120" y1="0" x2="120" y2="220" stroke="${blueBlueprint}" stroke-width="1.5" />
        <line x1="240" y1="0" x2="240" y2="220" stroke="${blueBlueprint}" stroke-width="1.5" />
        <line x1="0" y1="73" x2="360" y2="73" stroke="${blueBlueprint}" stroke-width="1.5" />
        <line x1="0" y1="146" x2="360" y2="146" stroke="${blueBlueprint}" stroke-width="1.5" />
        <text x="10" y="245" font-family="'IBM Plex Mono', monospace" font-size="12" fill="${blueBlueprint}" font-weight="600">PHOTOVOLTAIC MODULE ARRAY (CLEAN ENERGY)</text>
      </g>

      <!-- 24V DC 储能电池回路与 50+ 次循环动能示意 -->
      <g transform="translate(1260, 480)" opacity="0.75">
        <rect x="0" y="0" width="280" height="140" rx="6" fill="#ffffff" stroke="${orangeAccent}" stroke-width="2" />
        <circle cx="40" cy="40" r="16" fill="rgba(234, 88, 12, 0.1)" stroke="${orangeAccent}" stroke-width="2" />
        <text x="34" y="46" font-family="'IBM Plex Mono', monospace" font-size="14" fill="${orangeAccent}" font-weight="800">⚡</text>
        <text x="70" y="45" font-family="'IBM Plex Mono', monospace" font-size="14" fill="#1d201e" font-weight="700">24V DC POWER UNIT</text>
        <text x="70" y="70" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#64748b">F004 · 50+ Lifting Cycles/Charge</text>
        <text x="70" y="95" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#64748b">Operating Temp: -20°C to +50°C</text>
      </g>

      <!-- 园区道路网与分布式太阳能灯杆节点 (P-01 ~ P-08) -->
      ${[1120, 1340, 1560, 1780].map((x, i) => `
        <circle cx="${x}" cy="780" r="6" fill="${nodeFill}" />
        <circle cx="${x}" cy="780" r="16" fill="none" stroke="${nodeFill}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.7" />
        <text x="${x - 14}" y="815" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#0284c7" font-weight="600">P-${String(i+1).padStart(2, '0')}</text>
      `).join('')}
    `;
  } else if (contextType === 'flange') {
    // 地基法兰与土建力学工况：混凝土短柱基座 + P.C.D. 180-260mm 同心力学分布圆 + M16-M24 锚栓
    contextualVectors = `
      <!-- 混凝土基座俯视 CAD 轴线与地脚螺栓笼 -->
      <g transform="translate(1380, 500)">
        <!-- 基础短柱轮廓 (600x600mm) -->
        <rect x="-240" y="-240" width="480" height="480" fill="rgba(241, 245, 249, 0.7)" stroke="${linePrimary}" stroke-width="2.5" stroke-dasharray="8 6" />
        
        <!-- P.C.D. 180mm 最小圆 与 260mm 最大圆 (双同心圆标定) -->
        <circle cx="0" cy="0" r="180" fill="none" stroke="${blueBlueprint}" stroke-width="2" stroke-dasharray="8 6" />
        <circle cx="0" cy="0" r="130" fill="none" stroke="${orangeAccent}" stroke-width="3" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="${linePrimary}" stroke-width="1.5" />
        
        <!-- 4 向 90° 径向长腰孔与 M20/M24 螺栓 -->
        ${[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const x = Math.round(Math.cos(rad) * 130);
          const y = Math.round(Math.sin(rad) * 130);
          return `
            <line x1="0" y1="0" x2="${Math.cos(rad) * 200}" y2="${Math.sin(rad) * 200}" stroke="${linePrimary}" stroke-width="1.5" stroke-dasharray="4 4" />
            <circle cx="${x}" cy="${y}" r="14" fill="#ffffff" stroke="${orangeAccent}" stroke-width="3" />
            <circle cx="${x}" cy="${y}" r="6" fill="${orangeAccent}" />
          `;
        }).join('')}

        <!-- 标定文字 -->
        <text x="-160" y="-255" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#1d201e" font-weight="700">CONCRETE PEDESTAL CAD: 600×600MM</text>
        <text x="-140" y="220" font-family="'IBM Plex Mono', monospace" font-size="12" fill="${orangeAccent}" font-weight="700">P.C.D. RANGE: 180mm (MIN) - 260mm (MAX)</text>
        <text x="-120" y="240" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#64748b">ASTM F1554 GRADE 55 ANCHOR FIT</text>
      </g>
    `;
  } else {
    // 城市市政道路工况：人行道铺装砖标线 + 1.2m 狭小通过廊道 + 沿街树穴绿化带与路灯点
    contextualVectors = `
      <!-- 人行道铺砖与路缘石几何线 (Pedestrian Paver Grid & Curbside Line) -->
      <g opacity="0.35">
        <line x1="0" y1="420" x2="1920" y2="420" stroke="${linePrimary}" stroke-width="2" />
        <line x1="0" y1="480" x2="1920" y2="480" stroke="${linePrimary}" stroke-width="4" />
        <line x1="0" y1="720" x2="1920" y2="720" stroke="${linePrimary}" stroke-width="2" stroke-dasharray="8 6" />
        ${[200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800].map(x => `
          <line x1="${x}" y1="420" x2="${x}" y2="720" stroke="${lineSubtle}" stroke-width="1.5" />
        `).join('')}
      </g>

      <!-- 沿街路灯预埋点位与绿化带微缩符号 (Curbside Trees & Light Pole Nodes) -->
      ${[350, 750, 1150, 1550].map((x, i) => `
        <circle cx="${x}" cy="450" r="8" fill="#ffffff" stroke="${blueBlueprint}" stroke-width="2.5" />
        <circle cx="${x}" cy="450" r="3" fill="${blueBlueprint}" />
        <rect x="${x + 60}" y="435" width="80" height="30" rx="3" fill="#ffffff" stroke="${linePrimary}" stroke-width="1" />
        <text x="${x + 72}" y="455" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#1d201e" font-weight="700">LP-${String(i+1).padStart(2, '0')}</text>
      `).join('')}

      <!-- 双人协同搬运 1.2m 狭窄空间准入通道标定 -->
      <g transform="translate(1240, 240)">
        <rect x="0" y="0" width="380" height="90" rx="6" fill="#ffffff" stroke="${orangeAccent}" stroke-width="2" />
        <text x="20" y="32" font-family="'IBM Plex Mono', monospace" font-size="13" fill="${orangeAccent}" font-weight="700">✓ 1.2M NARROW ACCESS CORRIDOR</text>
        <text x="20" y="55" font-family="'IBM Plex Mono', monospace" font-size="12" fill="#1d201e">Two-Worker Pickup Transport (≤45kg each)</text>
        <text x="20" y="74" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#64748b">Zero heavy crane roadway permits needed</text>
      </g>
    `;
  }

  return `
    <svg class="engineering-backdrop-canvas" viewBox="0 0 1920 1080" preserveAspectRatio="none">
      <defs>
        <!-- 浅色工程坐标纸细密微网格 (Astro 浅纸底色) -->
        <pattern id="lightCadGrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(29, 32, 30, 0.04)" stroke-width="1"/>
          <circle cx="48" cy="0" r="1.5" fill="rgba(29, 32, 30, 0.08)" />
        </pattern>
        <!-- 柔和浅色渐变底板 -->
        <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fcfcfb" />
          <stop offset="50%" stop-color="#f5f6f2" />
          <stop offset="100%" stop-color="#ebede5" />
        </linearGradient>
        <!-- 左侧文本易读性微遮罩 (白纸渐变，确保文字清晰无比) -->
        <linearGradient id="scrimWhite" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(252, 252, 251, 0.98)" />
          <stop offset="55%" stop-color="rgba(252, 252, 251, 0.92)" />
          <stop offset="78%" stop-color="rgba(252, 252, 251, 0.65)" />
          <stop offset="100%" stop-color="rgba(252, 252, 251, 0.2)" />
        </linearGradient>
      </defs>

      <!-- 1. 底层工程纸与 CAD 细网格 -->
      <rect width="1920" height="1080" fill="url(#paperGrad)" />
      <rect width="1920" height="1080" fill="url(#lightCadGrid)" />

      <!-- 2. 工况特定多元工程矢量图元 -->
      ${contextualVectors}

      <!-- 3. 左侧清爽渐变遮罩 (保证左侧文字 100% 锐利高对比) -->
      <rect width="1920" height="1080" fill="url(#scrimWhite)" />
    </svg>
  `;
}

/**
 * 构建高定浅色系封面 HTML 模板 (Astro 浅色工程风格 + 真实设备立体抠图 + 科技大刊排版)
 */
export async function renderSwissCoverHtml(highlights) {
  const { dict, title, subtitle, specificContext, lang, contextType, coordinates, projectTag } = highlights;

  // 1. 生成浅色系多元工程图底图
  const bgSvg = generateContextualEngineeringSvg(contextType);

  // 2. 读取并内联真实设备透明抠图
  let rigBase64 = '';
  try {
    const rigBuf = await fs.readFile(RIG_CUTOUT_PATH);
    rigBase64 = `data:image/png;base64,${rigBuf.toString('base64')}`;
  } catch {
    try {
      const sideBuf = await fs.readFile(REFERENCE_IMAGE_PATH);
      rigBase64 = `data:image/png;base64,${sideBuf.toString('base64')}`;
    } catch {}
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    font-family: 'Plus Jakarta Sans', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
    color: #1d201e; /* 对齐 Astro --ink 主色 */
    background-color: #f3f2ec; /* 对齐 Astro --paper 底色 */
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 84px 60px 84px;
  }

  /* 浅色工程矢量底图层 */
  .engineering-backdrop-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 1920px;
    height: 1080px;
    z-index: 1;
    pointer-events: none;
  }

  /* 真实设备透明立姿与高光投影 (画面右侧) */
  .hero-rig-composition {
    position: absolute;
    right: 40px;
    bottom: 50px;
    width: 820px;
    height: 940px;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    pointer-events: none;
  }

  .rig-image {
    max-width: 760px;
    max-height: 820px;
    object-fit: contain;
    /* 浅色背景下的高质感立体漫射投影 */
    filter: drop-shadow(0 28px 40px rgba(29, 32, 30, 0.18)) drop-shadow(0 8px 16px rgba(29, 32, 30, 0.08));
  }

  /* 激光起升动态圆弧与标尺 HUD (浅色系高精线稿) */
  .rig-hud-overlay {
    position: absolute;
    right: 60px;
    bottom: 120px;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    border: 1.5px dashed rgba(2, 132, 199, 0.35);
    pointer-events: none;
  }

  .hud-angle-pill {
    position: absolute;
    top: 60px;
    left: 80px;
    background: #ffffff;
    border: 1.5px solid #0284c7;
    color: #0284c7;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 4px;
    letter-spacing: 0.06em;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
  }

  /* 主体图文内容层 (画面左侧与全景层) */
  .editorial-content-layer {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 1140px;
  }

  /* 顶部导航与项目定位栏 */
  .top-meta-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1.5px solid rgba(29, 32, 30, 0.1);
    padding-bottom: 24px;
  }

  .brand-and-gis-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-lockup {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .brand-badge {
    background: #ea580c; /* 工业安全橙高亮 */
    color: #ffffff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 16px;
    font-weight: 800;
    padding: 6px 16px;
    border-radius: 3px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
  }

  .brand-title {
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #1d201e;
  }

  .gis-telemetry-tag {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    color: #0284c7;
    background: #ffffff;
    border: 1px solid rgba(2, 132, 199, 0.3);
    padding: 6px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background: #0284c7;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(2, 132, 199, 0.6);
  }

  .sub-meta-coordinates {
    display: flex;
    gap: 28px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    color: #64748b;
    letter-spacing: 0.04em;
  }

  .sub-meta-coordinates span {
    color: #1d201e;
    font-weight: 600;
  }

  /* 文章主标题与排版区域 (浅色大刊工程封面，强烈点击欲望) */
  .hero-article-body {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .context-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1.5px solid rgba(234, 88, 12, 0.4);
    color: #ea580c;
    padding: 8px 18px;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 22px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: 0 2px 8px rgba(234, 88, 12, 0.08);
  }

  .hero-h1 {
    font-size: 58px;
    font-weight: 900;
    line-height: 1.14;
    letter-spacing: -0.025em;
    color: #1d201e; /* 深石墨色 */
    margin-bottom: 22px;
  }

  .hero-h1 em {
    font-style: normal;
    color: #ea580c; /* 工业安全橙高亮关键词 */
    border-bottom: 4px solid #f4cc3d; /* 对齐 Astro 品牌黄 */
    padding-bottom: 2px;
  }

  .hero-desc {
    font-size: 21px;
    font-weight: 400;
    line-height: 1.55;
    color: #4b5563; /* 优雅的冷灰色，易读性极佳 */
    max-width: 960px;
    margin-bottom: 32px;
  }

  /* 三联核心参数 HUD 胶囊仪表 (浅色浮雕纯白卡片) */
  .telemetry-strip {
    display: flex;
    gap: 20px;
  }

  .telemetry-card {
    background: #ffffff;
    border: 1px solid #d5d8cd;
    border-radius: 6px;
    padding: 18px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 250px;
    box-shadow: 0 10px 25px rgba(29, 32, 30, 0.06);
    border-left: 4px solid #ea580c;
  }

  .telemetry-val {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 24px;
    font-weight: 700;
    color: #1d201e;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .telemetry-val .unit {
    color: #ea580c;
    font-size: 16px;
  }

  .telemetry-sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #64748b;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  /* 底部栏 (现场执行状态与规范符合) */
  .bottom-dispatch-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1.5px solid rgba(29, 32, 30, 0.1);
    padding-top: 20px;
  }

  .legend-specs {
    display: flex;
    gap: 32px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    color: #64748b;
  }

  .legend-specs div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .legend-specs span {
    color: #1d201e;
    font-weight: 700;
  }

  .indicator-box {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #15803d;
    background: #ffffff;
    border: 1px solid rgba(22, 163, 74, 0.3);
    padding: 6px 14px;
    border-radius: 4px;
    letter-spacing: 0.06em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  .dot-green {
    width: 7px;
    height: 7px;
    background: #16a34a;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(22, 163, 74, 0.6);
  }
</style>
</head>
<body>
  <!-- 1. 背景层：高定浅色系工程图与多元背景元素 SVG -->
  ${bgSvg}

  <!-- 2. 中景层：真实设备立体抠图与激光起竖 HUD (右侧) -->
  <div class="hero-rig-composition">
    <div class="rig-hud-overlay">
      <div class="hud-angle-pill">📐 0°-45° TILT TRAJECTORY</div>
    </div>
    ${rigBase64 ? `<img src="${rigBase64}" class="rig-image" alt="volvet portable light pole lifter" />` : ''}
  </div>

  <!-- 3. 上层信息层：大刊级浅色工程封面排版与数据遥测 -->
  <div class="editorial-content-layer">
    <!-- 顶部 -->
    <div class="top-meta-header">
      <div class="brand-and-gis-bar">
        <div class="brand-lockup">
          <div class="brand-badge">VOLVET</div>
          <div class="brand-title">HEAVY FLUID RIGGING</div>
        </div>
        <div class="gis-telemetry-tag">
          <div class="pulse-dot"></div>
          <span>SITE ENGINEERING SPECIFICATION</span>
        </div>
      </div>
      <div class="sub-meta-coordinates">
        <div>COORDINATES: <span>${coordinates}</span></div>
        <div>PROJECT: <span>${projectTag}</span></div>
        <div>STANDARDS: <span>OSHA 1926 & IEEE 516</span></div>
      </div>
    </div>

    <!-- 中部主标题与核心论据 -->
    <div class="hero-article-body">
      <div class="context-pill">
        <span>⚡</span> ${dict.heroBadge}
      </div>
      <h1 class="hero-h1">${title.replace(/(Zero-Crane|零吊车|Sin Grúa|Sans Grue|Sem Guindaste|Không Dùng Cần Cẩu|ไม่ใช้รถเครน|Tanpa Derek)/gi, '<em>$1</em>')}</h1>
      <p class="hero-desc">${subtitle}</p>

      <!-- 核心 KPI 仪表 -->
      <div class="telemetry-strip">
        <div class="telemetry-card">
          <div class="telemetry-val">${dict.kpi1} <span class="unit">⚡</span></div>
          <div class="telemetry-sub">${dict.kpi1Sub}</div>
        </div>
        <div class="telemetry-card">
          <div class="telemetry-val">${dict.kpi2} <span class="unit">↕</span></div>
          <div class="telemetry-sub">${dict.kpi2Sub}</div>
        </div>
        <div class="telemetry-card">
          <div class="telemetry-val">${dict.kpi3} <span class="unit">⚖</span></div>
          <div class="telemetry-sub">${dict.kpi3Sub}</div>
        </div>
      </div>
    </div>

    <!-- 底部状态栏与工程图例 -->
    <div class="bottom-dispatch-bar">
      <div class="legend-specs">
        <div>LOGISTICS: <span>${dict.mapLegend}</span></div>
        <div>CREW: <span>2-PERSON STANDARD</span></div>
        <div>POWER: <span>24V DC RECHARGEABLE</span></div>
      </div>
      <div class="indicator-box">
        <div class="dot-green"></div>
        <span>${dict.statusTag}</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 处理单篇文章的封面大图生成与回写
 */
export async function processArticleFlowCover(articlePath, options = {}) {
  const fullPath = path.resolve(articlePath);
  const rawContent = await fs.readFile(fullPath, 'utf8');
  const lang = detectArticleLanguage(fullPath, rawContent);
  const highlights = extractArticleHighlights(rawContent, fullPath, lang);
  const flowConfig = buildGoogleFlowPrompt(highlights);

  console.log(`\n============================================================`);
  console.log(`🎨 [${path.basename(fullPath)}] 高定浅色系工程封面大图生成引擎启动`);
  console.log(`🌐 侦测语言: ${lang.toUpperCase()}`);
  console.log(`🏗️ 背景元素: ${highlights.contextType.toUpperCase()} (${highlights.projectTag})`);
  console.log(`📌 核心标题: ${highlights.title}`);
  console.log(`📍 坐标定位: ${highlights.coordinates}`);
  console.log(`============================================================`);

  const outputDir = path.resolve(projectRoot, 'geo-drafts/articles/images', highlights.slug);
  await fs.mkdir(outputDir, { recursive: true });

  // 1. 导出 Google Flow MCP 调用规格与 Prompt JSON
  const flowPayloadPath = path.join(outputDir, 'google-flow-cover-spec.json');
  const flowPayload = {
    article: path.relative(projectRoot, fullPath),
    slug: highlights.slug,
    locale: lang,
    title: highlights.title,
    theme: 'nordic-light-industrial',
    context_type: highlights.contextType,
    coordinates: highlights.coordinates,
    project_tag: highlights.projectTag,
    specific_context: highlights.specificContext,
    google_flow_mcp: {
      tool: 'flow_generate_image',
      server: 'google-flow',
      parameters: {
        prompt: flowConfig.prompt,
        reference_images: flowConfig.reference_images,
        model: flowConfig.model,
        ratio: flowConfig.ratio,
        auto_confirm: flowConfig.auto_confirm,
        output_folder: outputDir
      }
    },
    generated_at: new Date().toISOString()
  };

  await fs.writeFile(flowPayloadPath, JSON.stringify(flowPayload, null, 2), 'utf8');
  console.log(`✓ 已生成 Google Flow MCP 调用契约: ${path.relative(projectRoot, flowPayloadPath)}`);

  if (options.dryRun) {
    console.log(`\n📋 [DRY-RUN] Google Flow 提示词预览:`);
    console.log(`------------------------------------------------------------`);
    console.log(flowConfig.prompt);
    console.log(`------------------------------------------------------------`);
    console.log(`🔗 注入参考图: ${flowConfig.reference_images[0]}`);
    return flowPayload;
  }

  // 2. 渲染高定浅色系工程封面大图 (HTML + Playwright 截图)
  const coverHtmlPath = path.join(outputDir, 'cover-deck.html');
  const coverHtml = await renderSwissCoverHtml(highlights);
  await fs.writeFile(coverHtmlPath, coverHtml, 'utf8');

  let playwrightModule = null;
  try {
    playwrightModule = await import('playwright');
  } catch {
    try {
      const altPath = '/Users/peterpc/.gemini/config/skills/guizang-social-card-skill/node_modules/playwright/index.mjs';
      playwrightModule = await import(altPath);
    } catch {
      const astroPlaywright = path.resolve(projectRoot, 'maquin-astro-theme/node_modules/playwright/index.mjs');
      playwrightModule = await import(astroPlaywright);
    }
  }

  const { chromium } = playwrightModule;
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });

  await page.goto(`file://${coverHtmlPath}`, { waitUntil: 'load' });
  await page.waitForTimeout(500); // 确保字体与 SVG 细节绘制完成

  const finalCoverPngPath = path.join(outputDir, 'cover-flow-hero-16x9.png');
  await page.screenshot({ path: finalCoverPngPath, type: 'png' });
  await browser.close();

  const stat = await fs.stat(finalCoverPngPath);
  console.log(`✓ 已导出高定浅色系封面大图 -> ${path.basename(finalCoverPngPath)} (${Math.round(stat.size / 1024)} KB)`);

  // 3. 同步至 Astro 静态站点公开目录
  const publicDir = path.resolve(projectRoot, 'maquin-astro-theme/public/images', highlights.slug);
  await fs.mkdir(publicDir, { recursive: true });
  await fs.copyFile(finalCoverPngPath, path.join(publicDir, 'cover-flow-hero-16x9.png'));
  console.log(`✓ 已同步至前端公共目录: public/images/${highlights.slug}/cover-flow-hero-16x9.png`);

  // 4. 回写 Markdown 正文与 Frontmatter
  if (options.insertMarkdown) {
    let updatedContent = rawContent;
    const coverUrl = `/images/${highlights.slug}/cover-flow-hero-16x9.png`;

    // 4.1 更新或插入 Frontmatter coverImage
    if (/^---\s*\n([\s\S]*?)\n---\s*\n/.test(updatedContent)) {
      if (/coverImage:\s*[^\n]+/i.test(updatedContent)) {
        updatedContent = updatedContent.replace(/coverImage:\s*[^\n]+/i, `coverImage: "${coverUrl}"`);
      } else {
        updatedContent = updatedContent.replace(/^---\s*\n/, `---\ncoverImage: "${coverUrl}"\n`);
      }
    } else {
      updatedContent = `---\ncoverImage: "${coverUrl}"\n---\n\n` + updatedContent;
    }

    // 4.2 清除已有封面图（避免重复插入）
    updatedContent = updatedContent.replace(/\n!\[[^\]]*\]\(\/images\/[^\)]*cover-flow-hero-16x9\.png\)\n\*[^*]+\*\n/g, '\n');

    // 4.3 在 H1 之后或 Key Takeaways 前插入封面大图
    const captionText = highlights.dict.figureCaption(highlights.slug);
    const h1Regex = /(^#\s+[^\n]+\n\n)/m;
    if (h1Regex.test(updatedContent)) {
      updatedContent = updatedContent.replace(h1Regex, `$1${captionText}\n`);
    } else {
      updatedContent = captionText + '\n\n' + updatedContent;
    }

    await fs.writeFile(fullPath, updatedContent, 'utf8');
    console.log(`✓ 已将浅色系封面大图及对应 [${lang.toUpperCase()}] 语言图注回写至: ${path.relative(projectRoot, fullPath)}`);
  }

  return flowPayload;
}

// 主入口
async function main() {
  const args = process.argv.slice(2);
  let targetArticle = null;
  let runAll = false;
  let topic = null;
  let insertMarkdown = false;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--article' && args[i + 1]) {
      targetArticle = args[++i];
    } else if (a.startsWith('--article=')) {
      targetArticle = a.slice(10);
    } else if (a === '--topic' && args[i + 1]) {
      topic = args[++i];
    } else if (a.startsWith('--topic=')) {
      topic = a.slice(8);
    } else if (a === '--all') {
      runAll = true;
    } else if (a === '--insert-markdown') {
      insertMarkdown = true;
    } else if (a === '--dry-run') {
      dryRun = true;
    }
  }

  const options = { insertMarkdown, dryRun };

  if (targetArticle) {
    await processArticleFlowCover(targetArticle, options);
  } else if (runAll || topic) {
    const articlesDir = path.resolve(projectRoot, 'geo-drafts/articles');
    const files = await fs.readdir(articlesDir);
    let mdFiles = files.filter(f => f.endsWith('.md')).sort();
    if (topic) {
      mdFiles = mdFiles.filter(f => f.startsWith(topic));
    }

    console.log(`🚀 正在为 ${mdFiles.length} 篇出海文章批量生成高定浅色系工程封面大图...`);
    for (const f of mdFiles) {
      await processArticleFlowCover(path.join(articlesDir, f), options);
    }
  } else {
    console.log(`用法:`);
    console.log(`  node scripts/generate_flow_cover.mjs --article <path> [--insert-markdown] [--dry-run]`);
    console.log(`  node scripts/generate_flow_cover.mjs --topic <slug> [--insert-markdown]`);
    console.log(`  node scripts/generate_flow_cover.mjs --all [--insert-markdown]`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`❌ 执行失败:`, err);
  process.exit(1);
});
