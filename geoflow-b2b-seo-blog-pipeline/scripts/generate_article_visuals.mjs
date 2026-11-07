#!/usr/bin/env node
/**
 * generate_article_visuals.mjs
 * 
 * GEOFlow B2B 文章配图自动化生成与挂载引擎 (Guizang Swiss Industrial Style)
 * 深度融合 guizang-social-card-skill 瑞士国际主义工商业卡片排版规范与 F001-F031 物理事实治理网，
 * 为出海独立站长文自动生成 7 张全比例高清工程信息图卡片（16:9 / 3:4 / 1:1），
 * 并提供高容错、跨语种（zh / en / es / id）的 Markdown 正文 5 图与合规图注精准挂载。
 * 
 * 用法:
 *   node scripts/generate_article_visuals.mjs --article <path-to-markdown> [--insert-markdown] [--theme <safety-orange|ikb>]
 *   node scripts/generate_article_visuals.mjs --all [--insert-markdown] [--theme <safety-orange|ikb>]
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态定位工作空间根目录 (liftpolemachine-web)
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

// 多语言国际化字典表 (zh / en / es / id)
const I18N = {
  zh: {
    htmlLang: 'zh-CN',
    heroKicker: '便携式路灯升杆机工程技术解析与选型指南',
    heroTitle: '零吊车原位液压立杆工程系统',
    heroSubtitle: '85kg 分体双模组流体动力架构 · 标称 300kg 垂直试验台核定载荷 · 适配 6m 至 12m 市政与道路照明立杆',
    card1: {
      badgeCategory: 'B2B 出海重工吊装装备',
      badgeFacts: '物理事实治理网 F001-F031',
      serp: 'GEO 实体目标：12M 免吊车立杆',
      kpi1Lbl: '额定垂直载荷',
      kpi1Code: 'F002 · 垂直试验台核定',
      kpi2Lbl: '最大适配杆高',
      kpi2Code: 'F003 · 6M-12M 市政灯杆',
      kpi3Lbl: '分体总重',
      kpi3Code: 'F008 · 双模组分体包装',
      kpi4Lbl: '直流动力电池',
      kpi4Code: 'F004 · 50+ 次满电起升',
      rigTitle: '分体模块化总成',
      rigModel: '型号：VOLVET-PLP-12M',
      rigPcd: '径向长腰孔 P.C.D.: 180-260mm',
      rigSop: '双人作业 S.O.P.',
      stdLbl: '行业权威规范符合：',
      footerNote: 'VOLVET 流体动力装备 · 出厂 100% 质检校准'
    },
    card2: {
      sectionBadge: '第一章 · 机械工程架构',
      weightBadge: '核定整机总重：85KG 双模组分体 (F008)',
      kicker: '模块化流体动力机械部署方案',
      title: '双模组分体设计：符合国际职业安全双人搬运标准',
      desc: '旨在彻底替代高空重型吊车。系统拆分为两大便携单元（各 ≤45kg），两名作业人员使用标准皮卡即可搬运穿行于狭窄人行道与绿化隔离带。',
      mod1Badge: '模组 01 · 45KG',
      mod1Meta: 'F008 原子基线',
      mod1Title: '液压顶升立柱与主机总成',
      mod1Desc: '高刚性结构合金伸缩立柱，搭载 800mm 有效垂直行程液压缸与二级机械防坠自锁销，杜绝意外失压下坠风险。',
      mod1K1: '有效行程', mod1V1: '800 mm',
      mod1K2: '主机外形尺寸', mod1V2: '610 × 220 × 220 mm',
      mod1K3: '安全防护机构', mod1V3: '高强合金防坠锁销',
      mod1K4: '额定顶升载荷', mod1V4: '300 kg 垂直载荷',
      mod1Note: '✓ 彻底消除重型吊车支腿占道作业与压裂路面风险',
      mod2Badge: '模组 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: '24V DC 电气动力与控制箱',
      mod2Desc: '集成高能量密度 24V DC 充电机电动力总成、微型液压泵站与双向微调比例液压阀组。',
      mod2K1: '动力源', mod2V1: '24V DC 充电机电总成',
      mod2K2: '电箱外形尺寸', mod2V2: '500 × 300 × 250 mm',
      mod2K3: '单次充电动能', mod2V3: '> 50 次起升循环',
      mod2K4: '单次动作耗时', mod2V4: '约 20 秒',
      mod2Note: '✓ 宽温区适用：-20°C 至 +50°C 出厂测试台核定',
      footer1: '外运包装：650 × 350 × 500 MM 国际植检木箱（总重 85KG）',
      footer2: '双人协同搬运合规：严格执行两名作业人员编制'
    },
    card3: {
      sectionBadge: '第三章 · 几何与法兰力学适配',
      meta: '螺栓分布圆直径 P.C.D. 180-260MM (F015)',
      kicker: '土建基础与结构法兰容差工程',
      title: '通用底板长腰孔力学适配：兼容主流 180-260mm 基础法兰',
      desc: '精准适配市政标准 4 螺栓方形及多螺栓圆形基础笼。重载径向长腰孔将举升反力直接导入混凝土立柱地基，杜绝边缘崩裂。',
      th1: '地脚锚栓规格', th2: '出厂标配紧固套件', th3: '执行力学标准', th4: '工程适配状态',
      row1Kit: '出厂标配硬件包（各 4 套）', tagPass: '出厂直接适配',
      row5Kit: '长腰孔容纳（紧固件选配）', tagWarn: '需核验工程图纸',
      tableFooter: 'P.C.D. 范围：180mm（最小）至 260mm（最大）· 4 向 90° 放射状长腰槽对称分布',
      boxBadge: '放射状腰槽力学分析',
      boxTitle: '地脚螺栓自锚固应力分散',
      boxDesc: '在杆件 0° 至 30° 起立初段，举升反力在混凝土基座正面形成压应力，并均匀拉紧后侧地脚螺栓，避免基础剪切损坏。',
      boxMinLbl: '最小 P.C.D.', boxMaxLbl: '最大 P.C.D.',
      boxLevelLbl: '基座调平', boxLevelVal: '多点微调支腿',
      boxAudit: '采购前提供 24 小时出厂免费工程图纸审核服务',
      footer1: '法兰力学容差认证：EN 40-3 与 ASTM F1554',
      footer2: '高刚性合金锻造通用底盘'
    },
    card4: {
      sectionBadge: '第四章 · 现场施工双人 SOP',
      meta: '强制执行：两名作业人员协同作业',
      kicker: '标准化施工作业规程与临电安全防护',
      title: '标准化地面预装与电控平稳起竖三阶段工序',
      desc: '严格标定两名持证技术人员协同作业。所有灯头装配、电缆穿线与光学投射角调试均在地面完成，杜绝高空跌落。',
      step1Num: '第一阶段',
      step1Title: '基座勘验与架空临电净距排查',
      step1Desc: '复核混凝土养护标号；清除 M16-M24 螺栓残渣；按 ANSI/IES RP-8-18 确认投射朝向；排查上空符合 OSHA 1926 与 IEEE 516 临电净距。',
      step1Note: '✓ 彻底规避高空触电与电弧击穿风险',
      step2Num: '第二阶段',
      step2Title: '底板自锚固与机械安全销锁定',
      step2Desc: '两人将 45kg 举升机滑入锚栓并旋紧初拧螺母；快换接头连接 40kg 24V 控制箱；水平仪调平基座；主承载耳板穿入机械安全防坠销。',
      step2Note: '✓ 多点微调支腿与高精度水平仪调平',
      step3Num: '第三阶段',
      step3Title: '地面预接线与 24V 匀速液压起竖',
      step3Desc: '地面完成全部电气接线。操作员 A 推动 24V 伺服阀平稳起升（20秒动作）；操作员 B 侧方 45° 引导对孔；垂直自锁后锁紧法兰螺母。',
      step3Note: '✓ 90° 垂直自动双向液压自锁与机械止挡',
      footer1: '双人分工：操作员 A（液压控制）+ 操作员 B（45° 对孔引导）',
      footer2: '严格符合 OSHA 1926 与 IEEE 516 规范'
    },
    card5: {
      sectionBadge: '工程决策与可行性测算矩阵',
      meta: '16 吨随车吊 VS. VOLVET 便携式立杆机',
      kicker: '现场组织、施工安全与综合效益测算',
      title: '工况可行性决策矩阵：市政承包商为何转向便携式升杆机',
      desc: '针对常规 6m 至 12m 市政道路照明工程，彻底消除吊车进场调度、市政封路审批与高空临电触电风险。',
      th1: '施工与评估维度',
      th2: '传统 16 吨随车吊 / 汽车起重机',
      th3: 'volvet 便携式液压路灯升杆机',
      r1P: '狭窄通道通行能力',
      r1C: '需 3.5m 净路宽 + 4 处支腿受力面（易压损绿化/路缘石）',
      r1L: '可通行 1.2m 人行道、非机动车道与泥泞松软地面',
      r2P: '高压输电线路临电安全',
      r2C: 'OSHA 1926 要求保持 10-20 英尺净空；长臂摆动触电风险高',
      r2L: '始终在带电线路下方起竖；零长臂回转空中碰撞风险',
      r3P: '设备转运与市政审批',
      r3C: '需重载平板拖车运输；往往需要漫长的前期封路交警审批',
      r3L: '标准皮卡后斗装载（85kg 双模组分体；各 ≤45kg）',
      r4P: '现场作业人员编制',
      r4C: '持证起重吊车司机 + 挂钩司索工 + 2 名现场看护（共 3-4 人）',
      r4L: '严格 2 名持证机电作业人员即可独立成组作业',
      r5P: '单杆立杆安装耗时',
      r5C: '单杆耗时 1.5 至 3 小时（含打支腿、起臂与交通导流）',
      r5L: '单杆全流程 15 至 20 分钟（从卸车、调平到紧固锁母）',
      footer1: '额定载荷边界：最大 300KG 载荷与 12M 杆高',
      footer2: '15M-35M 特高杆灯仍需调度重型吊车'
    },
    card6: {
      badge: '出海 B2B 吊装工程',
      kicker: '零吊车原位路灯起竖系统',
      title: '便携式路灯升杆机：12m 免吊车安装工程架构',
      desc: '涵盖双模组分体流体动力、180-260mm 法兰 P.C.D. 适配与双人标准化 SOP 的出海权威技术指南。',
      kpi1Lbl: '核定起升载荷',
      kpi2Lbl: '最大适配高度',
      kpi3Lbl: '双模组分体包装',
      kpi4Lbl: '充电机电总成',
      footer1: '物理事实治理网 F001-F031',
      footer2: '符合 OSHA 1926 与 IEEE 516 规范'
    },
    card7: {
      badge: '12M 路灯立杆机',
      kicker: 'B2B 工程装备选型指南',
      tag1: '300KG 核定载荷',
      tag2: '12M 最大杆高',
      tag3: '85KG 双模组分体',
      footer1: '地面预装 · 零重型吊车占道',
      footer2: 'VOLVET 流体动力装备'
    },
    figures: {
      fig1: (relDir) => `\n![便携式路灯升杆机工程技术选型全景图](${relDir}/01-feature-hero-cover-16x9.png)\n*图 1：volvet 便携式路灯升杆机工程选型全景图。严格标定 300kg 垂直试验台核定载荷与 85kg 分体式双模组运输设计，彻底免除 16 吨汽车起重机依赖。*\n`,
      fig2: (relDir) => `\n![便携式路灯升杆机分体式双模组机械工程架构](${relDir}/02-two-module-architecture-16x9.png)\n*图 2：分体式双模组流体动力架构：45kg 液压主机与 40kg 24V 直流电控箱，满足两人协同搬运与国际人工搬运健康安全标准。*\n`,
      fig3: (relDir) => `\n![通用底座法兰与 P.C.D. 180-260mm 径向腰孔力学适配](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*图 3：重型通用底板径向长腰孔几何结构，广泛兼容 180mm 至 260mm 地脚螺栓分布圆直径（P.C.D.）及 M16 至 M24 锚栓，符合 ASTM F1554 标准。*\n`,
      fig4: (relDir) => `\n![地面预装与电控平稳顶升三阶段标准化双人作业 SOP](${relDir}/04-sop-field-workflow-16x9.png)\n*图 4：三阶段标准化地面作业流程规范，严格标定两名作业人员协同编制，彻底规避传统高空登高与触电危险（符合 OSHA 1926 与 IEEE 516 标准）。*\n`,
      fig5: (relDir) => `\n![工况可行性决策矩阵：16 吨汽车吊 vs volvet 便携式液压升杆机](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*图 5：工况可行性与现场准入对比：传统 16 吨随车吊对比 volvet 便携式升杆机在狭窄通道、作业人员编制及高压临电作业半径维度的综合测算。*\n`
    }
  },

  en: {
    htmlLang: 'en',
    heroKicker: 'ENGINEERING SELECTION & SPECIFICATION GUIDE',
    heroTitle: 'ZERO-CRANE LIGHT POLE ERECTION',
    heroSubtitle: 'Split Two-Module Fluid Power Architecture for Standard 6m–12m Municipal Columns (300kg Proof Load)',
    card1: {
      badgeCategory: 'B2B EXPORT RIGGING INFRASTRUCTURE',
      badgeFacts: 'FACT REGISTER F001-F031',
      serp: 'SERP TARGET: ZERO-CRANE 12M POLE ERECTION',
      kpi1Lbl: 'Rated Load',
      kpi1Code: 'F002 · PROOF TESTED',
      kpi2Lbl: 'Max Height',
      kpi2Code: 'F003 · 6M-12M SHAFTS',
      kpi3Lbl: 'Split Weight',
      kpi3Code: 'F008 · TWO MODULES',
      kpi4Lbl: 'DC Battery',
      kpi4Code: 'F004 · 50+ CYCLES',
      rigTitle: 'MODULAR RIG ASSEMBLY',
      rigModel: 'MODEL: VOLVET-PLP-12M',
      rigPcd: 'RADIAL P.C.D.: 180-260mm',
      rigSop: '2-WORKER S.O.P.',
      stdLbl: 'COMPLIANCE VERIFIED:',
      footerNote: 'VOLVET FLUID POWER ENGINEERING · FACTORY AUDITED'
    },
    card2: {
      sectionBadge: 'SECTION 1 ENGINEERING ARCHITECTURE',
      weightBadge: 'VERIFIED TOTAL WEIGHT: 85KG (F008)',
      kicker: 'MODULAR FLUID POWER MECHANICAL DEPLOYMENT',
      title: 'Split Two-Module Architecture: Manual Handling Compliance',
      desc: 'Engineered to eliminate heavy boom truck requirements. The entire system separates into two transportable units (≤45kg each), permitting two workers to mobilize via standard pickups into tight pedestrian paths.',
      mod1Badge: 'MODULE 01 · 45KG',
      mod1Meta: 'F008 BASELINE',
      mod1Title: 'Hydraulic Column & Lifter Rig',
      mod1Desc: 'High-tensile alloy structural telescoping frame equipped with vertical hydraulic lift cylinder and secondary mechanical anti-drop locking pins.',
      mod1K1: 'Effective Stroke', mod1V1: '800 mm',
      mod1K2: 'Frame Dimensions', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Safety Restraint', mod1V3: 'Alloy Lock Pin',
      mod1K4: 'Proof Rating', mod1V4: '300 kg Vertical',
      mod1Note: '✓ Neutralizes crane outrigger setup clearances & pavement crushing',
      mod2Badge: 'MODULE 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: '24V DC Electrical Control Cabinet',
      mod2Desc: 'Self-contained high-energy battery power pack, micro hydraulic motor-pump station, and dual proportional flow control valves.',
      mod2K1: 'Power Source', mod2V1: '24V DC Battery',
      mod2K2: 'Enclosure Size', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Battery Endurance', mod2V3: '> 50 Lifting Cycles',
      mod2K4: 'Full Stroke Time', mod2V4: '~ 20 Seconds',
      mod2Note: '✓ Operating temperature tested: -20°C to +50°C factory test bench',
      footer1: 'TRANSPORT PACKAGE: 650 × 350 × 500 MM ISPM-15 CRATE (85KG TOTAL)',
      footer2: 'MANUAL HANDLING SAFE: 2 TECHNICIANS REQUIRED'
    },
    card3: {
      sectionBadge: 'SECTION 3 GEOMETRIC COMPATIBILITY',
      meta: 'PITCH CIRCLE DIAMETER: 180-260MM (F015)',
      kicker: 'CIVIL FOUNDATION & STRUCTURAL FLANGE TOLERANCE',
      title: 'Universal Flange Fit: Slotted Base Plate Engineering',
      desc: 'Accommodates municipal 4-bolt and multi-bolt foundation patterns. The heavy-duty radial slotted geometry transfers compressive reaction loads directly into the footing, eliminating edge blowout.',
      th1: 'Fastener Stud', th2: 'Standard Clamping Kit', th3: 'Tensile Code', th4: 'Engineering Fit',
      row1Kit: 'Factory Hardware Pack (4 Sets)', tagPass: 'DIRECT COMPATIBLE',
      row5Kit: 'Slotted Fit (Hardware Optional)', tagWarn: 'DRAWING AUDIT REQUIRED',
      tableFooter: 'P.C.D. Range: 180mm (Min) to 260mm (Max) · Slotted Radial Axis: 4-Way 90° Symmetric Distribution',
      boxBadge: 'RADIAL SLOTTED MECHANICS',
      boxTitle: 'Self-Anchoring Force Transfer',
      boxDesc: 'During initial 0° to 30° pole tilt, the reaction force creates compressive bearing over the concrete footing while tensioning rear foundation bolts. Eliminates concrete pedestal edge spalling.',
      boxMinLbl: 'MIN P.C.D.', boxMaxLbl: 'MAX P.C.D.',
      boxLevelLbl: 'BASE LEVELING', boxLevelVal: 'Adjustable Outriggers',
      boxAudit: 'FREE 24H ENGINEERING DRAWING AUDIT AVAILABLE BEFORE PROCUREMENT',
      footer1: 'RADIAL SLOTTED TOLERANCE: EN 40-3 & ASTM F1554',
      footer2: 'PROPRIETARY BASE PLATE FORGING'
    },
    card4: {
      sectionBadge: 'SECTION 4 FIELD INSTALLATION S.O.P.',
      meta: 'MANDATORY: TWO-PERSON CERTIFIED CREW',
      kicker: 'STANDARDIZED OPERATING PROCEDURE & POWERLINE SAFETY',
      title: 'Three-Phase Ground-Level Erection Workflow',
      desc: 'Strictly mandating two certified technicians. All luminaire wiring, bracket torquing, and optical aiming occur at ground level before raising, eliminating ladder fall risks.',
      step1Num: 'PHASE 01',
      step1Title: 'Foundation & Clearance Survey',
      step1Desc: 'Verify concrete pedestal strength; clean M16-M24 anchor stud threads. Align fixture aiming axes with roadway geometry per ANSI/IES RP-8-18. Inspect vertical zone to verify OSHA 1926 Subpart CC & IEEE 516 live-line clearances.',
      step1Note: '✓ Zero aerial conductor electrocution risk',
      step2Num: 'PHASE 02',
      step2Title: 'Modular Anchor & Column Pinning',
      step2Desc: 'Two workers slide the 45kg lifter base over anchor studs and tighten retaining nuts. Connect the 40kg 24V power cabinet with quick couplers. Align lighting pole base pivot with carriage and insert primary alloy safety lock pin.',
      step2Note: '✓ Spirit level multi-point leveling outriggers',
      step3Num: 'PHASE 03',
      step3Title: 'Metered 24V Lift & Flange Lock',
      step3Desc: 'Pre-wire cables and mount solar heads at ground level. Operator 1 actuates the 24V hydraulic lever (smooth 20s vertical stroke). Operator 2 monitors from a 45° safety angle. Lock hydraulic counterbalance valve and torque base nuts to spec.',
      step3Note: '✓ 90° true vertical automatic mechanical stop',
      footer1: 'SAFETY MANDATE: ONE OPERATOR (HYDRAULICS) + ONE SPOTTER (45° ALIGNMENT)',
      footer2: 'OSHA 1926 & IEEE 516 COMPLIANT'
    },
    card5: {
      sectionBadge: 'DECISION & FEASIBILITY MATRIX',
      meta: '16-TON CRANE VS. VOLVET PORTABLE LIFTER',
      kicker: 'LOGISTICS, SAFETY & COST-BENEFIT EVALUATION',
      title: 'Jobsite Feasibility: Why Municipal Contractors Shift to Lifters',
      desc: 'Eliminate high crane mobilization charges, road closure permits, and aerial electrocution risks for standard 6m to 12m roadway illumination projects.',
      th1: 'Operational Parameter',
      th2: 'Traditional 16-Ton Boom Truck / Mobile Crane',
      th3: 'volvet Portable Hydraulic Pole Lifter',
      r1P: 'Narrow Access Maneuverability',
      r1C: 'Requires 3.5m roadway width + 4 outrigger footprints (crushes turf/curbs)',
      r1L: 'Traverses 1.2m pedestrian sidewalks, bike paths & unpaved terrain',
      r2P: 'High-Voltage Conductor Safety',
      r2C: 'OSHA 1926 Subpart CC mandates 10-20ft clearance; boom swing risk',
      r2L: 'Raises pole strictly below utility lines; zero aerial boom swing',
      r3P: 'Transport & Mobilization',
      r3C: 'Heavy equipment transport truck; municipal right-of-way permit delays',
      r3L: 'Standard utility pickup bed (85kg two-module package; ≤45kg each)',
      r4P: 'Site Crew Requirement',
      r4C: 'Certified crane operator + rigger + 2 spotters (3 to 4 personnel)',
      r4L: 'Strictly 2 trained civil technicians complete erection',
      r5P: 'Typical Cycle Duration',
      r5C: '1.5 to 3 hours per pole (outrigger setup, rigging, street permits)',
      r5L: '15 to 20 minutes total (from arrival to flange nut torquing)',
      footer1: 'RATED LOAD BOUNDARY: 300KG & 12M POLE MAXIMUM',
      footer2: 'HEAVY 15M-35M HIGH MASTS REQUIRE CRANES'
    },
    card6: {
      badge: 'SERIES: B2B RIGGING',
      kicker: 'ZERO-CRANE STREET LIGHT POLE ERECTION',
      title: 'Portable Hydraulic Pole Lifter: 12m Engineering Architecture',
      desc: 'A complete engineering guide on two-module split hydraulics, 180-260mm flange compatibility, and two-worker field SOP.',
      kpi1Lbl: 'Rated Proof Load',
      kpi2Lbl: 'Max Column Height',
      kpi3Lbl: 'Two-Module Transport',
      kpi4Lbl: 'Rechargeable Battery',
      footer1: 'FACT REGISTER F001-F031',
      footer2: 'OSHA 1926 & IEEE 516 VERIFIED'
    },
    card7: {
      badge: '12M POLE LIFTER',
      kicker: 'B2B RIGGING SELECTION GUIDE',
      tag1: '300KG RATED',
      tag2: '12M MAX HEIGHT',
      tag3: '85KG MODULAR',
      footer1: 'ZERO-CRANE GROUND ERECTION',
      footer2: 'VOLVET FLUID POWER'
    },
    figures: {
      fig1: (relDir) => `\n![Portable Light Pole Lifter: Zero-Crane Erection up to 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Figure 1: volvet portable hydraulic pole lifter engineering selection guide. Verified 300kg proof load and 85kg split transport architecture eliminating 16-ton boom truck dependency.*\n`,
      fig2: (relDir) => `\n![Portable light pole lifter two-module mechanical engineering architecture](${relDir}/02-two-module-architecture-16x9.png)\n*Figure 2: Split two-module fluid power architecture: 45kg hydraulic lifter rig and 40kg 24V power control cabinet compliant with international manual handling safety regulations.*\n`,
      fig3: (relDir) => `\n![Base flange compatibility and P.C.D. 180mm to 260mm radial slotted geometry](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Figure 3: Heavy-duty base plate radial slotted geometry accommodating 180mm to 260mm bolt circle diameters (P.C.D.) and M16 to M24 foundation anchor studs per ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Standard two-worker ground-level erection SOP workflow](${relDir}/04-sop-field-workflow-16x9.png)\n*Figure 4: Standard three-phase ground-level erection SOP strictly mandating a two-person certified crew, neutralizing overhead electrical contact risks per OSHA 1926 and IEEE 516.*\n`,
      fig5: (relDir) => `\n![Jobsite feasibility comparison: 16-ton mobile crane vs volvet portable hydraulic pole lifter](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Figure 5: Operational feasibility and jobsite access comparison: traditional 16-ton mobile crane versus volvet portable pole lifter across narrow access, crew size, and powerline clearances.*\n`
    }
  },

  es: {
    htmlLang: 'es',
    heroKicker: 'GUÍA TÉCNICA Y DE SELECCIÓN DE INGENIERÍA',
    heroTitle: 'ERECCIÓN DE POSTES SIN GRÚAS',
    heroSubtitle: 'Arquitectura de Dos Módulos para Postes de 6m a 12m (300kg de Carga Verificada)',
    card1: {
      badgeCategory: 'INFRAESTRUCTURA DE ELEVACIÓN B2B',
      badgeFacts: 'REGISTRO DE HECHOS F001-F031',
      serp: 'OBJETIVO SERP: ERECCIÓN DE 12M SIN GRÚA',
      kpi1Lbl: 'Carga Nominal',
      kpi1Code: 'F002 · ENSAYADO EN FÁBRICA',
      kpi2Lbl: 'Altura Máxima',
      kpi2Code: 'F003 · POSTES 6M-12M',
      kpi3Lbl: 'Peso Dividido',
      kpi3Code: 'F008 · DOS MÓDULOS',
      kpi4Lbl: 'Batería DC',
      kpi4Code: 'F004 · 50+ CICLOS',
      rigTitle: 'ENSAMBLE MODULAR',
      rigModel: 'MODELO: VOLVET-PLP-12M',
      rigPcd: 'P.C.D. RADIAL: 180-260mm',
      rigSop: 'S.O.P. DE DOS OPERARIOS',
      stdLbl: 'CONFORMIDAD VERIFICADA:',
      footerNote: 'INGENIERÍA HIDRÁULICA VOLVET · AUDITADO EN PLANTA'
    },
    card2: {
      sectionBadge: 'SECCIÓN 1 ARQUITECTURA MECÁNICA',
      weightBadge: 'PESO TOTAL VERIFICADO: 85KG (F008)',
      kicker: 'DESPLIEGUE MECÁNICO MODULAR DE POTENCIA FLUIDA',
      title: 'Arquitectura de Dos Módulos: Cumplimiento de Manejo Manual',
      desc: 'Diseñado para eliminar grúas pesadas. El sistema se divide en dos unidades (≤45kg cada una), permitiendo transporte en camioneta pickup por dos técnicos en aceras estrechas.',
      mod1Badge: 'MÓDULO 01 · 45KG',
      mod1Meta: 'LÍNEA BASE F008',
      mod1Title: 'Columna Hidráulica y Mecanismo Elevador',
      mod1Desc: 'Estructura telescópica de aleación de alta resistencia con cilindro hidráulico de carrera de 800mm y pasadores mecánicos anticaída.',
      mod1K1: 'Carrera Efectiva', mod1V1: '800 mm',
      mod1K2: 'Dimensiones', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Seguridad', mod1V3: 'Pasador de Bloqueo',
      mod1K4: 'Capacidad Nominal', mod1V4: '300 kg Vertical',
      mod1Note: '✓ Elimina despejes de estabilizadores de grúa y fractura de aceras',
      mod2Badge: 'MÓDULO 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: 'Gabinete Eléctrico de Control 24V DC',
      mod2Desc: 'Paquete de baterías de alta densidad energética, unidad de motobomba hidráulica micro y válvulas proporcionales.',
      mod2K1: 'Fuente de Poder', mod2V1: 'Batería 24V DC',
      mod2K2: 'Dimensiones', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Autonomía', mod2V3: '> 50 Ciclos de Izaje',
      mod2K4: 'Tiempo de Carrera', mod2V4: '~ 20 Segundos',
      mod2Note: '✓ Rango de temperatura: -20°C a +50°C en banco de pruebas',
      footer1: 'EMBALAJE DE EXPORTACIÓN: 650 × 350 × 500 MM CAJA ISPM-15 (85KG TOTAL)',
      footer2: 'MANIPULACIÓN SEGURA: 2 TÉCNICOS OBLIGATORIOS'
    },
    card3: {
      sectionBadge: 'SECCIÓN 3 COMPATIBILIDAD GEOMÉTRICA',
      meta: 'DIÁMETRO DE CÍRCULO DE PERNOS: 180-260MM (F015)',
      kicker: 'TOLERANCIA ESTRUCTURAL EN BRIDAS Y CIMENTACIÓN',
      title: 'Ajuste Universal de Brida: Placa Base Ranurada',
      desc: 'Compatible con patrones de 4 pernos y multiperno. La geometría ranurada radial transfiere las cargas de reacción directamente a la zapata.',
      th1: 'Espárrago de Anclaje', th2: 'Kit Estándar Incluido', th3: 'Norma de Tensión', th4: 'Estado de Ajuste',
      row1Kit: 'Paquete de Fábrica (4 Juegos)', tagPass: 'COMPATIBLE DIRECTO',
      row5Kit: 'Ajuste Ranurado (Herraje Opcional)', tagWarn: 'REQUIERE REVISIÓN DE PLANO',
      tableFooter: 'Rango P.C.D.: 180mm (Mín) a 260mm (Máx) · Eje Radial Ranurado Simétrico a 90°',
      boxBadge: 'MECÁNICA RANURADA RADIAL',
      boxTitle: 'Transferencia de Fuerza de Autoanclaje',
      boxDesc: 'Durante la inclinación inicial de 0° a 30°, la fuerza de reacción comprime la zapata de concreto y tensiona los pernos posteriores, previniendo desprendimientos.',
      boxMinLbl: 'MÍN P.C.D.', boxMaxLbl: 'MÁX P.C.D.',
      boxLevelLbl: 'NIVELACIÓN', boxLevelVal: 'Estabilizadores Regulables',
      boxAudit: 'REVISIÓN GRATUITA DE PLANOS DE INGENIERÍA EN 24 HORAS',
      footer1: 'TOLERANCIA RANURADA: EN 40-3 Y ASTM F1554',
      footer2: 'PLACA BASE FORJADA EXCLUSIVA'
    },
    card4: {
      sectionBadge: 'SECCIÓN 4 S.O.P. DE INSTALACIÓN EN CAMPO',
      meta: 'OBLIGATORIO: EQUIPO DE DOS OPERARIOS',
      kicker: 'PROCEDIMIENTO OPERATIVO Y SEGURIDAD ELÉCTRICA',
      title: 'Flujo de Trabajo de Erección a Nivel del Suelo en Tres Fases',
      desc: 'Exige estrictamente dos técnicos calificados. Todo el conexionado y orientación óptica se realiza en suelo, eliminando caídas de altura.',
      step1Num: 'FASE 01',
      step1Title: 'Inspección de Cimentación y Despeje',
      step1Desc: 'Verificar fraguado del concreto; limpiar roscas M16-M24; alinear ejes ópticos según ANSI/IES RP-8-18; inspeccionar espacio aéreo conforme a OSHA 1926 e IEEE 516.',
      step1Note: '✓ Cero riesgo de electrocución con cables aéreos',
      step2Num: 'FASE 02',
      step2Title: 'Anclaje Modular y Fijación de Pasador',
      step2Desc: 'Dos técnicos deslizan el elevador de 45kg sobre los pernos y ajustan tuercas. Conectar gabinete de 24V de 40kg. Nivelar burbuja e insertar pasador de seguridad de aleación.',
      step2Note: '✓ Estabilizadores con nivel de burbuja de precisión',
      step3Num: 'FASE 03',
      step3Title: 'Elevación Hidráulica 24V y Bloqueo de Brida',
      step3Desc: 'Pre-cablear en suelo. El operador 1 acciona la palanca 24V (carrera suave de 20s). El operador 2 vigila a 45°. Bloquear válvula de retención y apretar tuercas a torque.',
      step3Note: '✓ Tope mecánico automático a 90° vertical exacto',
      footer1: 'MANDATO DE SEGURIDAD: UN OPERADOR (HIDRÁULICA) + UN OBSERVADOR (45°)',
      footer2: 'CUMPLE CON NORMAS OSHA 1926 E IEEE 516'
    },
    card5: {
      sectionBadge: 'MATRIZ DE DECISIÓN Y FACTIBILIDAD',
      meta: 'CAMIÓN PLUMA 16T VS. ELEVADOR PORTÁTIL VOLVET',
      kicker: 'LOGÍSTICA, SEGURIDAD Y EVALUACIÓN COSTO-BENEFICIO',
      title: 'Factibilidad en Obra: Por Qué los Contratistas Eligen Elevadores',
      desc: 'Elimine costos de movilización de grúas, permisos de corte vial y riesgos de electrocución en proyectos estándar de 6m a 12m.',
      th1: 'Parámetro Operativo',
      th2: 'Camión Grúa / Pluma Tradicional de 16 Toneladas',
      th3: 'Elevador Hidráulico Portátil volvet',
      r1P: 'Acceso en Espacios Estrechos',
      r1C: 'Requiere vía de 3.5m + 4 estabilizadores abiertos (daña césped y aceras)',
      r1L: 'Transita por aceras peatonales de 1.2m, ciclovías y terreno sin pavimentar',
      r2P: 'Seguridad en Líneas Aéreas',
      r2C: 'OSHA 1926 exige 10-20 pies de distancia; riesgo por oscilación de pluma',
      r2L: 'Eleva el poste por debajo de las líneas; cero oscilación aérea',
      r3P: 'Transporte y Movilización',
      r3C: 'Transporte pesado; semanas de espera para permisos de corte vial',
      r3L: 'Caja de camioneta pickup estándar (paquete de 85kg en dos módulos ≤45kg)',
      r4P: 'Personal Requerido en Obra',
      r4C: 'Operador de grúa certificado + rigger + 2 señaleros (3 a 4 personas)',
      r4L: 'Estrictamente 2 técnicos capacitados completan el montaje',
      r5P: 'Duración Típica del Ciclo',
      r5C: '1.5 a 3 horas por poste (montaje de estabilizadores, permisos viales)',
      r5L: '15 a 20 minutos en total (desde llegada hasta apriete de tuercas)',
      footer1: 'LÍMITE DE CARGA NOMINAL: MÁXIMO 300KG Y POSTES DE 12M',
      footer2: 'POSTES DE GRAN ALTURA (15M-35M) REQUIEREN GRÚAS'
    },
    card6: {
      badge: 'SERIE: ELEVACIÓN B2B',
      kicker: 'ERECCIÓN DE POSTES SIN GRÚA',
      title: 'Elevador Portátil para Postes: Arquitectura de 12m',
      desc: 'Guía técnica sobre potencia hidráulica en dos módulos, compatibilidad de bridas 180-260mm y SOP para dos operarios.',
      kpi1Lbl: 'Carga Nominal',
      kpi2Lbl: 'Altura Máxima',
      kpi3Lbl: 'Transporte Modular',
      kpi4Lbl: 'Batería Recargable',
      footer1: 'REGISTRO DE HECHOS F001-F031',
      footer2: 'VERIFICADO OSHA 1926 E IEEE 516'
    },
    card7: {
      badge: 'ELEVADOR DE POSTES 12M',
      kicker: 'GUÍA DE SELECCIÓN B2B',
      tag1: '300KG NOMINAL',
      tag2: '12M ALTURA MÁX',
      tag3: '85KG MODULAR',
      footer1: 'ERECCIÓN A NIVEL DE SUELO',
      footer2: 'POTENCIA FLUIDA VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![Elevador hidráulico portátil para postes de luz: erección sin grúa hasta 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Figura 1: Guía de selección de ingeniería del elevador hidráulico portátil volvet. Capacidad nominal verificada de 300kg y arquitectura modular dividida de 85kg eliminando la necesidad de camiones pluma de 16 toneladas.*\n`,
      fig2: (relDir) => `\n![Arquitectura técnica modular dividida del elevador de postes](${relDir}/02-two-module-architecture-16x9.png)\n*Figura 2: Arquitectura de potencia fluida en dos módulos divididos: estructura hidráulica de 45kg y gabinete de control de 24V de 40kg conforme a normas internacionales de manejo manual.*\n`,
      fig3: (relDir) => `\n![Compatibilidad de brida base y geometría ranurada radial P.C.D. 180mm a 260mm](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Figura 3: Geometría ranurada radial de la placa base reforzada que admite círculos de pernos (P.C.D.) de 180mm a 260mm y pernos de anclaje M16 a M24 según norma ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Flujo de trabajo SOP de instalación en suelo para dos operarios](${relDir}/04-sop-field-workflow-16x9.png)\n*Figura 4: Procedimiento estandarizado de tres fases a nivel del suelo que exige estrictamente un equipo de dos operarios certificados, neutralizando riesgos eléctricos según OSHA 1926 e IEEE 516.*\n`,
      fig5: (relDir) => `\n![Comparación de factibilidad en obra: camión grúa de 16 toneladas vs elevador volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Figura 5: Comparativa de factibilidad operativa y acceso en obra: camión grúa tradicional de 16 toneladas frente al elevador portátil volvet en accesos estrechos, cuadrilla de trabajo y distancias de seguridad.*\n`
    }
  },

  id: {
    htmlLang: 'id',
    heroKicker: 'PANDUAN PEMILIHAN & SPESIFIKASI TEKNIK',
    heroTitle: 'PENDIRIAN TIANG LAMPU TANPA DEREK',
    heroSubtitle: 'Arsitektur Dua Modul Hidrolik untuk Tiang 6m–12m (Beban Teruji 300kg)',
    card1: {
      badgeCategory: 'INFRASTRUKTUR RIGGING B2B',
      badgeFacts: 'REGISTER FAKTA F001-F031',
      serp: 'TARGET SERP: PENDIRIAN 12M TANPA CRANE',
      kpi1Lbl: 'Beban Terukur',
      kpi1Code: 'F002 · UJI VERTICAL RIG',
      kpi2Lbl: 'Tinggi Maksimal',
      kpi2Code: 'F003 · TIANG 6M-12M',
      kpi3Lbl: 'Berat Terpisah',
      kpi3Code: 'F008 · DUA MODUL',
      kpi4Lbl: 'Baterai DC',
      kpi4Code: 'F004 · 50+ SIKLUS',
      rigTitle: 'PERAKITAN RIG MODULAR',
      rigModel: 'MODEL: VOLVET-PLP-12M',
      rigPcd: 'P.C.D. RADIAL: 180-260mm',
      rigSop: 'S.O.P. 2 PEKERJA',
      stdLbl: 'KEPATUHAN TERVERIFIKASI:',
      footerNote: 'REKAYASA FLUIDA VOLVET · AUDIT PABRIK'
    },
    card2: {
      sectionBadge: 'BAGIAN 1 ARSITEKTUR TEKNIK',
      weightBadge: 'TOTAL BERAT TERVERIFIKASI: 85KG (F008)',
      kicker: 'DISTRIBUSI DAYA MEKANIKAL HIDROLIK MODULAR',
      title: 'Arsitektur Dua Modul Terpisah: Kepatuhan Penanganan Manual',
      desc: 'Dirancang untuk meniadakan truk derek berat. Sistem terpisah menjadi dua unit (≤45kg per unit), memungkinkan dua teknisi membawanya via mobil pickup ke jalur sempit.',
      mod1Badge: 'MODUL 01 · 45KG',
      mod1Meta: 'GARIS DASAR F008',
      mod1Title: 'Tiang Hidrolik & Unit Pengangkat',
      mod1Desc: 'Rangka teleskopik baja paduan berkekuatan tinggi dengan silinder langkah efektif 800mm dan pin pengunci mekanis sekunder.',
      mod1K1: 'Langkah Efektif', mod1V1: '800 mm',
      mod1K2: 'Dimensi Rangka', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Pengaman', mod1V3: 'Pin Pengunci Baja',
      mod1K4: 'Kapasitas Uji', mod1V4: '300 kg Vertikal',
      mod1Note: '✓ Meniadakan landasan kaki derek & kerusakan permukaan trotoar',
      mod2Badge: 'MODUL 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: 'Kabinet Kontrol Daya Listrik 24V DC',
      mod2Desc: 'Paket baterai isi ulang densitas energi tinggi, stasiun pompa motor mikro, dan katup kontrol aliran proporsional ganda.',
      mod2K1: 'Sumber Daya', mod2V1: 'Baterai 24V DC',
      mod2K2: 'Ukuran Enclosure', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Ketahanan Daya', mod2V3: '> 50 Siklus Angkat',
      mod2K4: 'Waktu Langkah Penuh', mod2V4: '~ 20 Detik',
      mod2Note: '✓ Suhu operasional teruji: -20°C hingga +50°C bangku uji pabrik',
      footer1: 'KEMASAN EKSPOR: 650 × 350 × 500 MM PETI ISPM-15 (TOTAL 85KG)',
      footer2: 'PENANGANAN MANUAL AMAN: WAJIB 2 TEKNISI'
    },
    card3: {
      sectionBadge: 'BAGIAN 3 KOMPATIBILITAS GEOMETRIS',
      meta: 'DIAMETER LINGKARAN BAUT: 180-260MM (F015)',
      kicker: 'TOLERANSI FONDASI SIPIL & FLENSA STRUKTURAL',
      title: 'Kesesuaian Flensa Universal: Rekayasa Pelat Dasar Berlubang',
      desc: 'Mendukung pola fondasi 4 baut dan multi-baut perkotaan. Geometri lubang radial tugas berat mentransfer beban reaksi langsung ke fondasi beton.',
      th1: 'Baut Angkur', th2: 'Paket Hardware Standar', th3: 'Kode Tarik', th4: 'Kesesuaian Teknik',
      row1Kit: 'Paket Hardware Pabrik (4 Set)', tagPass: 'LANGSUNG COCOK',
      row5Kit: 'Lubang Pas (Hardware Opsional)', tagWarn: 'PERLU AUDIT GAMBAR',
      tableFooter: 'Rentang P.C.D.: 180mm (Min) hingga 260mm (Maks) · Distribusi Radial Simetris 4 Arah 90°',
      boxBadge: 'MEKANIKA LUBANG RADIAL',
      boxTitle: 'Transfer Gaya Penguncian Mandiri',
      boxDesc: 'Selama kemiringan awal 0° hingga 30°, gaya reaksi menciptakan tumpuan tekan pada fondasi beton sekaligus menarik baut belakang.',
      boxMinLbl: 'MIN P.C.D.', boxMaxLbl: 'MAKS P.C.D.',
      boxLevelLbl: 'PERATA DASAR', boxLevelVal: 'Outrigger Dapat Diatur',
      boxAudit: 'AUDIT GAMBAR TEKNIK GRATIS 24 JAM SEBELUM PENGADAAN',
      footer1: 'TOLERANSI LUBANG RADIAL: EN 40-3 & ASTM F1554',
      footer2: 'TEMPAAN PELAT DASAR EKSKLUSIF'
    },
    card4: {
      sectionBadge: 'BAGIAN 4 SOP INSTALASI LAPANGAN',
      meta: 'WAJIB: REGU KERJA DUA ORANG TEKNISI',
      kicker: 'PROSEDUR OPERASIONAL & KESELAMATAN LISTRIK UDARA',
      title: 'Alur Kerja Pendirian Tiga Tahap di Permukaan Tanah',
      desc: 'Secara ketat mewajibkan dua teknisi bersertifikat. Semua perakitan lampu dan pengkabelan dilakukan di tanah, meniadakan bahaya jatuh.',
      step1Num: 'FASE 01',
      step1Title: 'Survei Fondasi dan Jarak Bebas Kabel',
      step1Desc: 'Verifikasi kekuatan beton; bersihkan ulir baut M16-M24; selaraskan sudut pencahayaan ANSI/IES RP-8-18; periksa jarak bebas OSHA 1926 & IEEE 516.',
      step1Note: '✓ Bebas risiko sengatan listrik konduktor udara',
      step2Num: 'FASE 02',
      step2Title: 'Penguncian Fondasi & Pin Pengaman',
      step2Desc: 'Dua pekerja menggeser unit 45kg ke baut dan mengencangkan mur penahan. Hubungkan kabinet 40kg 24V. Ratakan waterpas dan pasang pin pengunci pengaman.',
      step2Note: '✓ Outrigger perata dengan indikator waterpas presisi',
      step3Num: 'FASE 03',
      step3Title: 'Pengangkatan Hidrolik 24V & Penguncian Flensa',
      step3Desc: 'Pengkabelan di tanah. Operator 1 menggerakkan tuas hidrolik 24V (gerakan 20s). Operator 2 memantau dari sudut 45°. Kunci katup dan kencangkan mur fondasi.',
      step3Note: '✓ Berhenti mekanis otomatis 90° tegak lurus sempurna',
      footer1: 'MANDAT KESELAMATAN: SATU OPERATOR (HIDROLIK) + SATU SPOTTER (45°)',
      footer2: 'PATUH PADA STANDAR OSHA 1926 & IEEE 516'
    },
    card5: {
      sectionBadge: 'MATRIKS KEPUTUSAN & KELAYAKAN PROYEK',
      meta: 'MOBILE CRANE 16T VS. ALAT PORTABEL VOLVET',
      kicker: 'LOGISTIK, KESELAMATAN & EVALUASI BIAYA-MANFAAT',
      title: 'Kelayakan Lapangan: Mengapa Kontraktor Beralih ke Alat Portabel',
      desc: 'Eliminasi biaya mobilisasi crane yang mahal, izin penutupan jalan, dan risiko sengatan listrik untuk tiang lampu 6m hingga 12m.',
      th1: 'Parameter Operasional',
      th2: 'Mobil Derek / Crane Tradisional 16 Ton',
      th3: 'volvet Alat Pendiri Tiang Hidrolik Portabel',
      r1P: 'Manuver di Akses Sempit',
      r1C: 'Perlu lebar jalan 3.5m + 4 jejak outrigger (merusak trotoar/rumput)',
      r1L: 'Melewati trotoar pejalan kaki 1.2m, jalur sepeda & tanah belum diaspal',
      r2P: 'Keselamatan Tegangan Tinggi',
      r2C: 'OSHA 1926 mewajibkan jarak 10-20 kaki; risiko ayunan boom crane',
      r2L: 'Mendirikan tiang di bawah kabel listrik; tanpa ayunan boom udara',
      r3P: 'Transportasi & Mobilisasi',
      r3C: 'Truk angkut alat berat; penundaan izin penutupan jalan umum',
      r3L: 'Bak mobil pickup standar (paket dua modul 85kg; ≤45kg per unit)',
      r4P: 'Kebutuhan Personel Lapangan',
      r4C: 'Operator crane bersertifikat + rigger + 2 pengawas (3-4 personel)',
      r4L: 'Cukup 2 teknisi sipil terlatih untuk menyelesaikan pemasangan',
      r5P: 'Durasi Siklus Tipikal',
      r5C: '1.5 hingga 3 jam per tiang (persiapan kaki outrigger, izin jalan)',
      r5L: '15 hingga 20 menit total (dari tiba hingga pengencangan mur)',
      footer1: 'BATAS BEBAN TERUKUR: MAKSIMAL 300KG & TIANG 12M',
      footer2: 'TIANG TINGGI (15M-35M) TETAP MEMBUTUHKAN CRANE'
    },
    card6: {
      badge: 'SERI: RIGGING B2B',
      kicker: 'PENDIRIAN TIANG TANPA DEREK',
      title: 'Alat Pendiri Tiang Portabel: Rekayasa 12m',
      desc: 'Panduan teknik lengkap tentang sistem hidrolik dua modul, kompatibilitas flensa 180-260mm, dan SOP lapangan dua pekerja.',
      kpi1Lbl: 'Beban Uji Terukur',
      kpi2Lbl: 'Tinggi Maksimal',
      kpi3Lbl: 'Transportasi Modular',
      kpi4Lbl: 'Baterai Isi Ulang',
      footer1: 'REGISTER FAKTA F001-F031',
      footer2: 'TERVERIFIKASI OSHA 1926 & IEEE 516'
    },
    card7: {
      badge: 'PENDIRI TIANG 12M',
      kicker: 'PANDUAN PEMILIHAN B2B',
      tag1: '300KG TERUKUR',
      tag2: '12M TINGGI MAKS',
      tag3: '85KG MODULAR',
      footer1: 'PENDIRIAN DI PERMUKAAN TANAH',
      footer2: 'DAYA FLUIDA VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![Alat Pendiri Tiang Lampu Portabel Hidrolik: Pendirian Tanpa Derek hingga 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Gambar 1: Panduan pemilihan teknik alat pendiri tiang hidrolik portabel volvet. Kapasitas uji terverifikasi 300kg dan arsitektur transportasi terpisah 85kg yang meniadakan kebutuhan truk derek 16 ton.*\n`,
      fig2: (relDir) => `\n![Arsitektur teknik mesin modular dua modul alat pendiri tiang](${relDir}/02-two-module-architecture-16x9.png)\n*Gambar 2: Arsitektur hidrolik dua modul terpisah: unit pengangkat 45kg dan kabinet kontrol daya 24V seberat 40kg sesuai regulasi penanganan beban manual internasional.*\n`,
      fig3: (relDir) => `\n![Kompatibilitas flensa dasar dan geometri lubang radial P.C.D. 180mm hingga 260mm](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Gambar 3: Geometri pelat dasar berlubang radial tugas berat yang mendukung diameter lingkaran baut (P.C.D.) 180mm hingga 260mm dan angkur fondasi M16 hingga M24 sesuai ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Alur kerja SOP pendirian tiang dua pekerja di permukaan tanah](${relDir}/04-sop-field-workflow-16x9.png)\n*Gambar 4: SOP tiga tahap di permukaan tanah yang secara ketat mewajibkan regu kerja dua orang teknisi, memitigasi bahaya induksi listrik udara sesuai OSHA 1926 dan IEEE 516.*\n`,
      fig5: (relDir) => `\n![Perbandingan kelayakan lapangan: truk derek 16 ton vs alat pendiri tiang volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Gambar 5: Analisis kelayakan operasional dan akses lapangan: mobile crane konvensional 16 ton dibandingkan alat pendiri tiang portabel volvet dalam hal jalur sempit, jumlah personel, dan batas keselamatan listrik.*\n`
    }
  },

  fr: {
    htmlLang: 'fr',
    heroKicker: 'GUIDE DE SÉLECTION TECHNIQUE & SPÉCIFICATIONS',
    heroTitle: 'ÉRECTION DE CANDÉLABRES SANS GRUE',
    heroSubtitle: 'Architecture de puissance fluide à deux modules pour mâts de 6 m à 12 m (Charge nominale 300 kg)',
    card1: {
      badgeCategory: 'INFRASTRUCTURE DE LEVAGE B2B',
      badgeFacts: 'REGISTRE DE FAITS F001-F031',
      serp: 'CIBLE SERP: ÉRECTION 12M SANS GRUE',
      kpi1Lbl: 'Charge nominale',
      kpi1Code: 'F002 · ÉPREUVE VERTICALE',
      kpi2Lbl: 'Hauteur max',
      kpi2Code: 'F003 · MÂTS 6M-12M',
      kpi3Lbl: 'Poids séparé',
      kpi3Code: 'F008 · DEUX MODULES',
      kpi4Lbl: 'Batterie DC',
      kpi4Code: 'F004 · 50+ CYCLES',
      rigTitle: 'ASSEMBLAGE MODULAIRE',
      rigModel: 'MODÈLE : VOLVET-PLP-12M',
      rigPcd: 'P.C.D. RADIAL : 180-260mm',
      rigSop: 'S.O.P. 2 OPÉRATEURS',
      stdLbl: 'CONFORMITÉ VÉRIFIÉE :',
      footerNote: 'INGÉNIERIE HYDRAULIQUE VOLVET · AUDITÉ EN USINE'
    },
    card2: {
      sectionBadge: 'SECTION 1 ARCHITECTURE MÉCANIQUE',
      weightBadge: 'POIDS TOTAL VÉRIFIÉ : 85 KG (F008)',
      kicker: 'DÉPLOIEMENT MÉCANIQUE MODULAIRE À FLUIDE',
      title: 'Architecture à deux modules : conformité manutention manuelle',
      desc: 'Conçu pour éliminer les camions-grues lourds. Le système se sépare en deux unités (≤45 kg chacune), permettant à deux techniciens d\'accéder aux trottoirs étroits via un pick-up standard.',
      mod1Badge: 'MODULE 01 · 45KG',
      mod1Meta: 'LIGNE DE BASE F008',
      mod1Title: 'Mât hydraulique et unité de levage',
      mod1Desc: 'Châssis télescopique en alliage haute résistance avec vérin vertical de course 800 mm et goupilles mécaniques anti-chute.',
      mod1K1: 'Course utile', mod1V1: '800 mm',
      mod1K2: 'Dimensions châssis', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Sécurité', mod1V3: 'Goupille en alliage',
      mod1K4: 'Capacité nominale', mod1V4: '300 kg vertical',
      mod1Note: '✓ Élimine l\'encombrement des stabilisateurs de grue et l\'écrasement des trottoirs',
      mod2Badge: 'MODULE 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: 'Armoire électrique de commande 24V DC',
      mod2Desc: 'Pack de batteries rechargeable haute densité, micro-groupe motopompe hydraulique et distributeurs proportionnels doubles.',
      mod2K1: 'Alimentation', mod2V1: 'Batterie 24V DC',
      mod2K2: 'Dimensions boîtier', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Autonomie', mod2V3: '> 50 cycles de levage',
      mod2K4: 'Temps de course', mod2V4: '~ 20 secondes',
      mod2Note: '✓ Plage de température : -20°C à +50°C sur banc d\'essai',
      footer1: 'EMBALLAGE EXPORT : 650 × 350 × 500 MM CAISSE ISPM-15 (85 KG TOTAL)',
      footer2: 'MANUTENTION SÉCURISÉE : 2 OPÉRATEURS OBLIGATOIRES'
    },
    card3: {
      sectionBadge: 'SECTION 3 COMPATIBILITÉ GÉOMÉTRIQUE',
      meta: 'DIAMÈTRE DE CERCLE DE PERÇAGE : 180-260 MM (F015)',
      kicker: 'TOLÉRANCE STRUCTURELLE SUR BRIDES ET FONDATION',
      title: 'Ajustement universel : platine d\'assise à lumières radiales',
      desc: 'Compatible avec les gabarits municipaux à 4 boulons ou multi-boulons. La géométrie radiale transfère directement les charges de réaction à la semelle en béton.',
      th1: 'Tige d\'ancrage', th2: 'Kit de serrage standard', th3: 'Norme de traction', th4: 'État d\'ajustement',
      row1Kit: 'Pack usine standard (4 jeux)', tagPass: 'COMPATIBLE DIRECT',
      row5Kit: 'Lumière radiale (boulonnerie en option)', tagWarn: 'AUDIT DE PLAN REQUIS',
      tableFooter: 'Plage P.C.D. : 180 mm (min) à 260 mm (max) · Disposition radiale symétrique à 90°',
      boxBadge: 'MÉCANIQUE À LUMIÈRES RADIALES',
      boxTitle: 'Transfert d\'effort auto-ancrant',
      boxDesc: 'Lors de l\'inclinaison initiale de 0° à 30°, la force de réaction crée une compression sur le massif béton tout en mettant en tension les tiges arrière.',
      boxMinLbl: 'MIN P.C.D.', boxMaxLbl: 'MAX P.C.D.',
      boxLevelLbl: 'NIVELLEMENT', boxLevelVal: 'Vérins réglables',
      boxAudit: 'AUDIT DE PLAN TECHNIQUE GRATUIT SOUS 24H AVANT COMMANDE',
      footer1: 'TOLÉRANCE BRIDE : EN 40-3 ET ASTM F1554',
      footer2: 'PLATINE FORGÉE EXCLUSIVE'
    },
    card4: {
      sectionBadge: 'SECTION 4 S.O.P. DE MISE EN ŒUVRE CHANTIER',
      meta: 'OBLIGATOIRE : ÉQUIPE DE DEUX TECHNICIENS',
      kicker: 'PROCÉDURE OPÉRATOIRE & SÉCURITÉ LIGNES ÉLECTRIQUES',
      title: 'Processus d\'érection au sol en trois phases',
      desc: 'Exige rigoureusement deux techniciens qualifiés. L\'ensemble du câblage et du réglage optique s\'effectue au sol, éliminant les risques de chute.',
      step1Num: 'PHASE 01',
      step1Title: 'Inspection fondation & dégagement électrique',
      step1Desc: 'Vérifier la résistance du béton ; nettoyer les filetages M16-M24 ; aligner les axes d\'éclairage ANSI/IES RP-8-18 ; vérifier les distances OSHA 1926 et IEEE 516.',
      step1Note: '✓ Zéro risque d\'électrocution sur lignes aériennes',
      step2Num: 'PHASE 02',
      step2Title: 'Ancrage modulaire & verrouillage d\'axe',
      step2Desc: 'Deux opérateurs glissent l\'élévateur de 45 kg sur les tiges et serrent les écrous. Raccorder le coffret 24V de 40 kg. Ajuster le niveau à bulle et insérer la goupille de sécurité.',
      step2Note: '✓ Stabilisateurs réglables avec niveau à bulle de précision',
      step3Num: 'PHASE 03',
      step3Title: 'Levage hydraulique 24V & serrage de bride',
      step3Desc: 'Pré-câblage au sol. L\'opérateur 1 actionne le levier 24V (course fluide de 20s). L\'opérateur 2 surveille à 45°. Bloquer le clapet anti-retour et serrer au couple.',
      step3Note: '✓ Butée mécanique automatique à 90° vertical parfait',
      footer1: 'CONSIGNE DE SÉCURITÉ : UN OPÉRATEUR (HYDRAULIQUE) + UN GUETTEUR (45°)',
      footer2: 'CONFORME OSHA 1926 ET IEEE 516'
    },
    card5: {
      sectionBadge: 'MATRICE DE DÉCISION ET FAISABILITÉ',
      meta: 'CAMION-GRUE 16T VS ÉLÉVATEUR VOLVET',
      kicker: 'LOGISTIQUE, SÉCURITÉ & ANALYSE COÛT-BÉNÉFICE',
      title: 'Faisabilité chantier : pourquoi les installateurs choisissent l\'élévateur',
      desc: 'Éliminez les frais de mobilisation de grue, les arrêtés de voirie et les risques d\'électrocution pour mâts d\'éclairage de 6 m à 12 m.',
      th1: 'Paramètre opérationnel',
      th2: 'Camion-grue classique de 16 tonnes',
      th3: 'Élévateur hydraulique portable volvet',
      r1P: 'Accès en voie étroite',
      r1C: 'Largeur de voirie 3.5 m requise + 4 stabilisateurs (endommage trottoirs/pelouses)',
      r1L: 'Circule sur trottoirs de 1.2 m, pistes cyclables et sols non stabilisés',
      r2P: 'Lignes électriques aériennes',
      r2C: 'OSHA 1926 impose 10-20 pieds de distance ; risque d\'arc avec la flèche',
      r2L: 'Élévation strictement sous les lignes ; zéro risque de balancement de flèche',
      r3P: 'Transport et logistique',
      r3C: 'Transport lourd ; délais d\'autorisation de voirie municipale',
      r3L: 'Benne de pick-up standard (85 kg en deux modules ≤45 kg)',
      r4P: 'Équipe requise sur site',
      r4C: 'Grutier certifié + élingueur + 2 signaleurs (3 à 4 personnes)',
      r4L: 'Strictement 2 techniciens formés pour l\'érection complète',
      r5P: 'Durée moyenne par mât',
      r5C: '1.5 à 3 heures par mât (stabilisateurs, élingage, permis)',
      r5L: '15 à 20 minutes au total (de l\'arrivée au serrage des écrous)',
      footer1: 'LIMITE DE CHARGE NOMINALE : 300 KG ET MÂTS DE 12 M MAX',
      footer2: 'LES MÂTS TRÈS HAUTS (15M-35M) NÉCESSITENT UNE GRUE'
    },
    card6: {
      badge: 'SÉRIE : LEVAGE B2B',
      kicker: 'ÉRECTION DE CANDÉLABRES SANS GRUE',
      title: 'Élévateur de mât portable : architecture 12 m',
      desc: 'Guide technique complet sur l\'hydraulique bi-module, la compatibilité de bride 180-260 mm et le SOP à deux opérateurs.',
      kpi1Lbl: 'Charge nominale',
      kpi2Lbl: 'Hauteur max mât',
      kpi3Lbl: 'Transport modulaire',
      kpi4Lbl: 'Batterie rechargeable',
      footer1: 'REGISTRE DE FAITS F001-F031',
      footer2: 'VÉRIFIÉ OSHA 1926 ET IEEE 516'
    },
    card7: {
      badge: 'ÉLÉVATEUR DE MÂT 12M',
      kicker: 'GUIDE DE SÉLECTION B2B',
      tag1: '300 KG NOMINAL',
      tag2: '12 M HAUTEUR MAX',
      tag3: '85 KG MODULAIRE',
      footer1: 'ÉRECTION AU SOL SANS GRUE',
      footer2: 'HYDRAULIQUE VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![Élévateur hydraulique portable pour candélabres : érection sans grue jusqu'à 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Figure 1 : Guide de sélection technique de l'élévateur hydraulique portable volvet. Charge d'épreuve vérifiée de 300 kg et conception modulaire de 85 kg éliminant le recours aux camions-grues de 16 tonnes.*\n`,
      fig2: (relDir) => `\n![Architecture mécanique à deux modules de l'élévateur de mât portable](${relDir}/02-two-module-architecture-16x9.png)\n*Figure 2 : Architecture à deux modules séparés : unité de levage de 45 kg et armoire de commande 24V de 40 kg conformes aux normes internationales de manutention manuelle.*\n`,
      fig3: (relDir) => `\n![Compatibilité de bride d'assise et géométrie radiale P.C.D. 180 mm à 260 mm](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Figure 3 : Platine d'assise renforcée à lumières radiales compatible avec cercles de perçage (P.C.D.) de 180 mm à 260 mm et tiges d'ancrage M16 à M24 selon ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Procédure SOP standard d'érection au sol par deux opérateurs](${relDir}/04-sop-field-workflow-16x9.png)\n*Figure 4 : Procédure standardisée en 3 phases au sol imposant une équipe de deux techniciens qualifiés, éliminant les risques électriques selon OSHA 1926 et IEEE 516.*\n`,
      fig5: (relDir) => `\n![Comparatif de faisabilité sur chantier : camion-grue 16t vs élévateur volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Figure 5 : Analyse de faisabilité opérationnelle et d'accès chantier : camion-grue conventionnel de 16 tonnes face à l'élévateur portable volvet en voie étroite et sécurité électrique.*\n`
    }
  },

  pt: {
    htmlLang: 'pt',
    heroKicker: 'GUIA TÉCNICO E DE ESPECIFICAÇÃO DE ENGENHARIA',
    heroTitle: 'INSTALAÇÃO DE POSTES SEM GUINDASTE',
    heroSubtitle: 'Arquitetura Hidráulica Bimodular para Postes de 6m a 12m (Carga Nominal 300kg)',
    card1: {
      badgeCategory: 'INFRAESTRUTURA DE IÇAMENTO B2B',
      badgeFacts: 'REGISTRO DE FATOS F001-F031',
      serp: 'ALVO SERP: INSTALAÇÃO 12M SEM GUINDASTE',
      kpi1Lbl: 'Carga Nominal',
      kpi1Code: 'F002 · TESTADO EM BANCADA',
      kpi2Lbl: 'Altura Máxima',
      kpi2Code: 'F003 · POSTES 6M-12M',
      kpi3Lbl: 'Peso Dividido',
      kpi3Code: 'F008 · DOIS MÓDULOS',
      kpi4Lbl: 'Bateria DC',
      kpi4Code: 'F004 · 50+ CICLOS',
      rigTitle: 'CONJUNTO MODULAR',
      rigModel: 'MODELO: VOLVET-PLP-12M',
      rigPcd: 'P.C.D. RADIAL: 180-260mm',
      rigSop: 'S.O.P. DE 2 OPERADORES',
      stdLbl: 'CONFORMIDADE VERIFICADA:',
      footerNote: 'ENGENHARIA HIDRÁULICA VOLVET · AUDITADO EM FÁBRICA'
    },
    card2: {
      sectionBadge: 'SEÇÃO 1 ARQUITETURA MECÂNICA',
      weightBadge: 'PESO TOTAL VERIFICADO: 85KG (F008)',
      kicker: 'DESLOCAMENTO MECÂNICO MODULAR DE POTÊNCIA FLUIDA',
      title: 'Arquitetura de Dois Módulos: Conformidade em Manuseio Manual',
      desc: 'Projetado para eliminar caminhões guindauto pesados. O sistema é dividido em duas unidades (≤45kg cada), permitindo transporte em caminhonetes por dois técnicos em calçadas estreitas.',
      mod1Badge: 'MÓDULO 01 · 45KG',
      mod1Meta: 'LINHA BASE F008',
      mod1Title: 'Coluna Hidráulica e Unidade de Içamento',
      mod1Desc: 'Estrutura telescópica em liga de alta resistência com cilindro hidráulico de curso útil de 800mm e travas mecânicas antiqueda.',
      mod1K1: 'Curso Útil', mod1V1: '800 mm',
      mod1K2: 'Dimensões Chassi', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Segurança', mod1V3: 'Pino de Trava em Liga',
      mod1K4: 'Capacidade Nominal', mod1V4: '300 kg Vertical',
      mod1Note: '✓ Elimina sapatas de guindaste e esmagamento de pavimentos',
      mod2Badge: 'MÓDULO 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: 'Gabinete Elétrico de Controle 24V DC',
      mod2Desc: 'Pacote de bateria recarregável de alta densidade energética, microestação motobomba hidráulica e válvulas direcionais proporcionais duplas.',
      mod2K1: 'Fonte de Energia', mod2V1: 'Bateria 24V DC',
      mod2K2: 'Dimensões Gabinete', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Autonomia', mod2V3: '> 50 Ciclos de Elevação',
      mod2K4: 'Tempo de Curso', mod2V4: '~ 20 Segundos',
      mod2Note: '✓ Faixa de temperatura operacional: -20°C a +50°C em bancada de testes',
      footer1: 'EMBALAGEM DE EXPORTAÇÃO: 650 × 350 × 500 MM CAIXA ISPM-15 (85KG TOTAL)',
      footer2: 'MANUSEIO SEGURO: 2 TÉCNICOS OBRIGATÓRIOS'
    },
    card3: {
      sectionBadge: 'SEÇÃO 3 COMPATIBILIDADE GEOMÉTRICA',
      meta: 'DIÂMETRO DO CÍRCULO DE PARAFUSOS: 180-260MM (F015)',
      kicker: 'TOLERÂNCIA ESTRUTURAL DE FLANGES E FUNDAÇÃO',
      title: 'Ajuste Universal de Flange: Placa Base com Rasgos Radiais',
      desc: 'Compatível com padrões municipais de 4 chumbadores ou multifuros circulares. A geometria radial transfere as forças de reação diretamente para a sapata de concreto.',
      th1: 'Chumbador de Ancoragem', th2: 'Kit Padrão de Fixação', th3: 'Norma de Tração', th4: 'Status de Ajuste',
      row1Kit: 'Pacote de Fábrica (4 Conjuntos)', tagPass: 'COMPATÍVEL DIRETO',
      row5Kit: 'Ajuste Radial (Fixadores Opcionais)', tagWarn: 'REQUER ANÁLISE DE PROJETO',
      tableFooter: 'Faixa P.C.D.: 180mm (Mín) a 260mm (Máx) · Distribuição Radial Simétrica em 4 Vias a 90°',
      boxBadge: 'MECÂNICA COM RASGOS RADIAIS',
      boxTitle: 'Transferência de Força por Autoancoragem',
      boxDesc: 'Durante a inclinação inicial de 0° a 30°, a força de reação comprime a sapata de concreto enquanto traciona os chumbadores traseiros, evitando quebras marginais.',
      boxMinLbl: 'MÍN P.C.D.', boxMaxLbl: 'MÁX P.C.D.',
      boxLevelLbl: 'NIVELAMENTO', boxLevelVal: 'Sapatas Ajustáveis',
      boxAudit: 'ANÁLISE GRATUITA DE DESENHOS TÉCNICOS EM ATÉ 24 HORAS',
      footer1: 'TOLERÂNCIA DE FLANGE: EN 40-3 E ASTM F1554',
      footer2: 'PLACA BASE FORJADA EXCLUSIVA'
    },
    card4: {
      sectionBadge: 'SEÇÃO 4 S.O.P. DE INSTALAÇÃO EM CAMPO',
      meta: 'OBRIGATÓRIO: EQUIPE DE DOIS TÉCNICOS',
      kicker: 'PROCEDIMENTO OPERACIONAL E SEGURANÇA ELÉTRICA',
      title: 'Fluxo de Trabalho de Instalação no Nível do Solo em Três Fases',
      desc: 'Exige rigorosamente dois técnicos qualificados. Toda a fiação e regulagem óptica ocorrem no solo, eliminando riscos de queda de escadas.',
      step1Num: 'FASE 01',
      step1Title: 'Inspeção de Fundação e Rede Aérea',
      step1Desc: 'Verificar cura do concreto; limpar roscas M16-M24; alinhar eixos ópticos conforme ANSI/IES RP-8-18; inspecionar espaço aéreo conforme OSHA 1926 e IEEE 516.',
      step1Note: '✓ Risco zero de choque com cabos elétricos aéreos',
      step2Num: 'FASE 02',
      step2Title: 'Ancoragem Modular e Pino de Trava',
      step2Desc: 'Dois técnicos encaixam a unidade de 45kg nos chumbadores e apertam as porcas. Conectar gabinete de 24V de 40kg. Nivelar na bolha e inserir pino de liga.',
      step2Note: '✓ Sapatas com nível de bolha de alta precisão',
      step3Num: 'FASE 03',
      step3Title: 'Içamento Hidráulico 24V e Fixação',
      step3Desc: 'Pré-cabeamento no solo. Operador 1 aciona a alavanca 24V (curso suave de 20s). Operador 2 monitora a 45°. Bloquear válvula de retenção e aplicar torque nas porcas.',
      step3Note: '✓ Batente mecânico automático a 90° vertical exato',
      footer1: 'REGRA DE SEGURANÇA: UM OPERADOR (HIDRÁULICA) + UM OBSERVADOR (45°)',
      footer2: 'CONFORME NORMAS OSHA 1926 E IEEE 516'
    },
    card5: {
      sectionBadge: 'MATRIZ DE DECISÃO E VIABILIDADE',
      meta: 'CAMINHÃO MUNCK 16T VS ELEVADOR VOLVET',
      kicker: 'LOGÍSTICA, SEGURANÇA E AVALIAÇÃO CUSTO-BENEFÍCIO',
      title: 'Viabilidade em Obra: Por Que Empreiteiros Migram para Elevadores',
      desc: 'Elimine custos de mobilização de guindastes pesados, licenças de interdição de tráfego e riscos elétricos em postes de 6m a 12m.',
      th1: 'Parâmetro Operacional',
      th2: 'Caminhão Munck / Guindaste de 16 Toneladas',
      th3: 'Elevador Hidráulico Portátil volvet',
      r1P: 'Acesso em Vias Estreitas',
      r1C: 'Requer pista de 3.5m + 4 sapatas abertas (danifica calçadas e gramados)',
      r1L: 'Transita em calçadas de 1.2m, ciclovias e terreno não pavimentado',
      r2P: 'Segurança Próximo a Linhas Aéreas',
      r2C: 'OSHA 1926 exige 10-20 pés de distância; risco de oscilação da lança',
      r2L: 'Iça o poste abaixo das redes elétricas; sem oscilação aérea de lança',
      r3P: 'Transporte e Mobilização',
      r3C: 'Transporte pesado; semanas para liberação de trânsito municipal',
      r3L: 'Caçamba de caminhonete padrão (85kg em dois módulos ≤45kg)',
      r4P: 'Equipe de Campo Necessária',
      r4C: 'Operador certificado + rigger + 2 sinalizadores (3 a 4 pessoas)',
      r4L: 'Estritamente 2 técnicos capacitados completam a instalação',
      r5P: 'Duração Média por Poste',
      r5C: '1.5 a 3 horas por poste (sapatas, amarração e interdição)',
      r5L: '15 a 20 minutos no total (da chegada ao aperto das porcas)',
      footer1: 'LIMITE DE CARGA NOMINAL: MÁXIMO 300KG E POSTES DE 12M',
      footer2: 'POSTES DE GRANDE ALTURA (15M-35M) EXIGEM GUINDASTES'
    },
    card6: {
      badge: 'SÉRIE: IÇAMENTO B2B',
      kicker: 'INSTALAÇÃO DE POSTES SEM GUINDASTE',
      title: 'Elevador de Postes Portátil: Engenharia 12m',
      desc: 'Guia técnico completo sobre sistema hidráulico bimodular, compatibilidade de flanges 180-260mm e SOP para dois operadores.',
      kpi1Lbl: 'Carga Nominal',
      kpi2Lbl: 'Altura Máxima',
      kpi3Lbl: 'Transporte Modular',
      kpi4Lbl: 'Bateria Recarregável',
      footer1: 'REGISTRO DE FATOS F001-F031',
      footer2: 'VERIFICADO OSHA 1926 E IEEE 516'
    },
    card7: {
      badge: 'ELEVADOR DE POSTES 12M',
      kicker: 'GUIA DE SELEÇÃO B2B',
      tag1: '300KG NOMINAL',
      tag2: '12M ALTURA MÁX',
      tag3: '85KG MODULAR',
      footer1: 'INSTALAÇÃO NO NÍVEL DO SOLO',
      footer2: 'POTÊNCIA FLUIDA VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![Elevador hidráulico portátil para postes: instalação sem guindaste até 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Figura 1: Guia de seleção técnica do elevador hidráulico portátil volvet. Carga nominal verificada de 300kg e estrutura dividida de 85kg eliminando a necessidade de caminhões munck de 16 toneladas.*\n`,
      fig2: (relDir) => `\n![Arquitetura mecânica bimodular do elevador de postes portátil](${relDir}/02-two-module-architecture-16x9.png)\n*Figura 2: Arquitetura de potência fluida em dois módulos separados: estrutura hidráulica de 45kg e gabinete elétrico 24V de 40kg em conformidade com normas de manuseio manual.*\n`,
      fig3: (relDir) => `\n![Compatibilidade de flange base e geometria radial P.C.D. 180mm a 260mm](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Figura 3: Placa base reforçada com rasgos radiais compatível com círculos de furação (P.C.D.) de 180mm a 260mm e chumbadores M16 a M24 conforme norma ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Procedimento SOP padrão de instalação no solo por dois operadores](${relDir}/04-sop-field-workflow-16x9.png)\n*Figura 4: Procedimento padronizado em três fases no nível do solo exigindo estritamente dois técnicos qualificados, neutralizando riscos elétricos conforme OSHA 1926 e IEEE 516.*\n`,
      fig5: (relDir) => `\n![Comparativo de viabilidade em obra: caminhão munck 16t vs elevador volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Figura 5: Análise de viabilidade operacional e acesso em obra: caminhão munck convencional de 16 toneladas frente ao elevador portátil volvet em vias estreitas e segurança elétrica.*\n`
    }
  },

  vi: {
    htmlLang: 'vi',
    heroKicker: 'HƯỚNG DẪN KỸ THUẬT & LỰA CHỌN THIẾT BỊ',
    heroTitle: 'DỰNG CỘT ĐÈN CHIẾU SÁNG KHÔNG DÙNG CẨU',
    heroSubtitle: 'Kiến trúc thủy lực hai mô-đun cho cột đường 6m–12m (Tải trọng thử nghiệm 300kg)',
    card1: {
      badgeCategory: 'THIẾT BỊ NÂNG HẠ B2B',
      badgeFacts: 'DANH MỤC THÔNG SỐ F001-F031',
      serp: 'MỤC TIÊU SERP: DỰNG CỘT 12M KHÔNG CẦN CẨU',
      kpi1Lbl: 'Tải trọng định mức',
      kpi1Code: 'F002 · KIỂM ĐỊNH BÀN NÂNG',
      kpi2Lbl: 'Chiều cao tối đa',
      kpi2Code: 'F003 · THÂN CỘT 6M-12M',
      kpi3Lbl: 'Trọng lượng tách rời',
      kpi3Code: 'F008 · HAI MÔ-ĐUN',
      kpi4Lbl: 'Pin DC',
      kpi4Code: 'F004 · 50+ CHU KỲ',
      rigTitle: 'HỆ THỐNG MÔ-ĐUN',
      rigModel: 'MODEL: VOLVET-PLP-12M',
      rigPcd: 'P.C.D. HƯỚNG TÂM: 180-260mm',
      rigSop: 'S.O.P. 2 NHÂN CÔNG',
      stdLbl: 'TIÊU CHUẨN ĐẠT ĐƯỢC:',
      footerNote: 'KỸ THUẬT THỦY LỰC VOLVET · KIỂM ĐỊNH NHÀ MÁY'
    },
    card2: {
      sectionBadge: 'PHẦN 1 KIẾN TRÚC CƠ KHÍ',
      weightBadge: 'TỔNG TRỌNG LƯỢNG XÁC NHẬN: 85KG (F008)',
      kicker: 'TRIỂN KHAI CƠ HỌC THỦY LỰC MÔ-ĐUN HÓA',
      title: 'Kiến trúc hai mô-đun: Đáp ứng tiêu chuẩn bê vác thủ công',
      desc: 'Thiết kế loại bỏ xe cẩu cồng kềnh. Hệ thống chia thành hai kiện (mỗi kiện ≤45kg), giúp hai công nhân vận chuyển bằng xe bán tải vào vỉa hè hẹp.',
      mod1Badge: 'MÔ-ĐUN 01 · 45KG',
      mod1Meta: 'THÔNG SỐ GỐC F008',
      mod1Title: 'Trụ nâng thủy lực & Giá nâng',
      mod1Desc: 'Khung hợp kim chịu lực dạng ống lồng với xi lanh hành trình 800mm và chốt an toàn chống rơi thứ cấp.',
      mod1K1: 'Hành trình', mod1V1: '800 mm',
      mod1K2: 'Kích thước khung', mod1V2: '610 × 220 × 220 mm',
      mod1K3: 'Khóa an toàn', mod1V3: 'Chốt hợp kim',
      mod1K4: 'Tải định mức', mod1V4: '300 kg tải đứng',
      mod1Note: '✓ Triệt tiêu việc chống chân cẩu gây nứt vỡ vỉa hè',
      mod2Badge: 'MÔ-ĐUN 02 · 40KG',
      mod2Meta: 'F004 / F008',
      mod2Title: 'Tủ điều khiển điện 24V DC',
      mod2Desc: 'Bộ pin sạc mật độ năng lượng cao, cụm bơm dầu thủy lực mini và van điều hướng tỉ lệ kép.',
      mod2K1: 'Nguồn cấp', mod2V1: 'Pin 24V DC',
      mod2K2: 'Kích thước tủ', mod2V2: '500 × 300 × 250 mm',
      mod2K3: 'Dung lượng pin', mod2V3: '> 50 chu kỳ nâng',
      mod2K4: 'Thời gian nâng', mod2V4: '~ 20 giây',
      mod2Note: '✓ Nhiệt độ hoạt động kiểm nghiệm: -20°C đến +50°C',
      footer1: 'QUY CÁCH ĐÓNG GÓI: 650 × 350 × 500 MM THÙNG GỖ ISPM-15 (TỔNG 85KG)',
      footer2: 'AN TOÀN BÊ VÁC: BẮT BUỘC 2 KỸ THUẬT VIÊN'
    },
    card3: {
      sectionBadge: 'PHẦN 3 ĐỘ TƯƠNG THÍCH HÌNH HỌC',
      meta: 'ĐƯỜNG KÍNH VÒNG BULONG: 180-260MM (F015)',
      kicker: 'DUNG SAI KỸ THUẬT MẶT BÍCH & MÓNG BÊ TÔNG',
      title: 'Tương thích mặt bích đa năng: Tấm đế rãnh trượt hướng tâm',
      desc: 'Tương thích móng 4 bulong vuông và nhiều bulong tròn. Rãnh xẻ hướng tâm truyền lực nén trực tiếp vào khối móng bê tông vững chắc.',
      th1: 'Bulong neo móng', th2: 'Bộ phụ kiện tiêu chuẩn', th3: 'Tiêu chuẩn lực kéo', th4: 'Khả năng tương thích',
      row1Kit: 'Bộ phụ kiện theo máy (4 bộ)', tagPass: 'TƯƠNG THÍCH TRỰC TIẾP',
      row5Kit: 'Rãnh trượt (phụ kiện tùy chọn)', tagWarn: 'CẦN DUYỆT BẢN VẼ',
      tableFooter: 'Dải P.C.D.: 180mm (nhỏ nhất) đến 260mm (lớn nhất) · Bố trí 4 hướng đối xứng 90°',
      boxBadge: 'CƠ HỌC RÃNH HƯỚNG TÂM',
      boxTitle: 'Truyền lực tự neo giữ',
      boxDesc: 'Trong góc nâng ban đầu 0° đến 30°, phản lực tạo áp lực nén lên móng bê tông đồng thời giữ căng bulong phía sau, tránh mẻ mép bê tông.',
      boxMinLbl: 'P.C.D. TỐI THIỂU', boxMaxLbl: 'P.C.D. TỐI ĐA',
      boxLevelLbl: 'CÂN BẰNG', boxLevelVal: 'Chân cân chỉnh',
      boxAudit: 'MIỄN PHÍ KIỂM TRA BẢN VẼ KỸ THUẬT TRONG 24 GIỜ',
      footer1: 'DUNG SAI MẶT BÍCH: EN 40-3 & ASTM F1554',
      footer2: 'TẤM ĐẾ RÈN CHUYÊN DỤNG'
    },
    card4: {
      sectionBadge: 'PHẦN 4 QUY TRÌNH THI CÔNG HIỆN TRƯỜNG SOP',
      meta: 'BẮT BUỘC: ĐỘI NGŨ 2 KỸ THUẬT VIÊN',
      kicker: 'QUY TRÌNH TIÊU CHUẨN & AN TOÀN LƯỚI ĐIỆN',
      title: 'Quy trình thi công 3 giai đoạn lắp ráp dưới mặt đất',
      desc: 'Bắt buộc nghiêm ngặt hai nhân công kỹ thuật. Mọi thao tác đấu nối dây đèn và chỉnh góc chiếu đều thực hiện dưới đất, triệt tiêu nguy cơ ngã cao.',
      step1Num: 'GIAI ĐOẠN 01',
      step1Title: 'Khảo sát móng & khoảng cách an toàn điện',
      step1Desc: 'Kiểm tra độ ninh kết bê tông; làm sạch ren bulong M16-M24; chỉnh góc đèn theo ANSI/IES RP-8-18; kiểm tra khoảng cách an toàn OSHA 1926 & IEEE 516.',
      step1Note: '✓ Triệt tiêu nguy cơ phóng điện đường dây trên cao',
      step2Num: 'GIAI ĐOẠN 02',
      step2Title: 'Gá đặt tấm đế & chốt hãm an toàn',
      step2Desc: 'Hai công nhân trượt máy 45kg vào bulong và siết ê-cu. Kết nối tủ điện 24V 40kg. Cân giọt nước và lắp chốt an toàn hợp kim chống rơi.',
      step2Note: '✓ Chân cân bằng với thước nivo bọt nước chính xác',
      step3Num: 'GIAI ĐOẠN 03',
      step3Title: 'Đấu nối dây, nâng thủy lực 24V & khóa bích',
      step3Desc: 'Đấu nối dây điện dưới đất. Nhân công 1 gạt van nâng 24V (nâng êm 20s). Nhân công 2 đứng góc 45° quan sát. Khóa van và siết chặt ê-cu mặt bích.',
      step3Note: '✓ Cơ cấu chặn cơ học góc thẳng đứng 90° tuyệt đối',
      footer1: 'YÊU CẦU AN TOÀN: 1 NGƯỜI VẬN HÀNH THỦY LỰC + 1 NGƯỜI QUAN SÁT (45°)',
      footer2: 'TUÂN THỦ QUY CHUẨN OSHA 1926 VÀ IEEE 516'
    },
    card5: {
      sectionBadge: 'BẢNG MA TRẬN ĐÁNH GIÁ TÍNH KHẢ THI',
      meta: 'XE CẨU 16 TẤN VS MÁY DỰNG CỘT VOLVET',
      kicker: 'HẬU CẦN, AN TOÀN VÀ ĐÁNH GIÁ HIỆU QUẢ KINH TẾ',
      title: 'Khả thi hiện trường: Vì sao nhà thầu chuyển sang máy dựng cột',
      desc: 'Loại bỏ chi phí thuê xe cẩu đắt đỏ, thủ tục xin cấp phép cấm đường và rủi ro điện giật trên cao với cột đèn 6m đến 12m.',
      th1: 'Thông số đánh giá',
      th2: 'Xe cẩu tự hành / Xe cẩu 16 tấn truyền thống',
      th3: 'Máy dựng cột đèn thủy lực di động volvet',
      r1P: 'Lối tiếp cận chật hẹp',
      r1C: 'Yêu cầu lòng đường 3.5m + 4 chân chống xòe rộng (làm lún hỏng vỉa hè)',
      r1L: 'Vào được vỉa hè hẹp 1.2m, làn xe đạp và nền đất yếu',
      r2P: 'An toàn lưới điện cao thế',
      r2C: 'OSHA 1926 yêu cầu cách ly 10-20 feet; nguy cơ va chạm cần cẩu',
      r2L: 'Nâng thẳng đứng dưới đường dây; không quay cần trên không',
      r3P: 'Vận chuyển & điều động',
      r3C: 'Cần xe chuyên dụng; mất nhiều tuần xin giấy phép cấm đường',
      r3L: 'Để vừa thùng xe bán tải (trọng lượng 85kg tách 2 kiện ≤45kg)',
      r4P: 'Nhân lực hiện trường',
      r4C: 'Lái cẩu có chứng chỉ + thợ móc cáp + 2 người cảnh giới (3-4 người)',
      r4L: 'Chỉ cần đúng 2 kỹ thuật viên được đào tạo là hoàn thành',
      r5P: 'Thời gian lắp 1 cột',
      r5C: '1.5 đến 3 giờ mỗi cột (hạ chân cẩu, điều tiết giao thông)',
      r5L: '15 đến 20 phút trọn gói (từ khi dỡ máy đến siết xong bu lông)',
      footer1: 'GIỚI HẠN TẢI TRỌNG: TỐI ĐA 300KG VÀ CỘT CAO 12M',
      footer2: 'CỘT ĐÈN CAO ÁP LỚN (15M-35M) BẮT BUỘC PHẢI DÙNG XE CẨU'
    },
    card6: {
      badge: 'CHUỖI B2B CÔNG TRÌNH',
      kicker: 'DỰNG CỘT ĐÈN KHÔNG DÙNG CẨU',
      title: 'Máy dựng cột đèn di động: Giải pháp 12m',
      desc: 'Hướng dẫn kỹ thuật toàn diện về thủy lực hai mô-đun, tương thích mặt bích 180-260mm và quy trình SOP 2 nhân công.',
      kpi1Lbl: 'Tải trọng định mức',
      kpi2Lbl: 'Chiều cao tối đa',
      kpi3Lbl: 'Đóng gói mô-đun',
      kpi4Lbl: 'Pin sạc năng lượng',
      footer1: 'DANH MỤC THÔNG SỐ F001-F031',
      footer2: 'ĐẠT CHUẨN OSHA 1926 VÀ IEEE 516'
    },
    card7: {
      badge: 'MÁY DỰNG CỘT 12M',
      kicker: 'HƯỚNG DẪN CHỌN THIẾT BỊ B2B',
      tag1: '300KG ĐỊNH MỨC',
      tag2: '12M CHIỀU CAO TỐI ĐA',
      tag3: '85KG HAI KIỆN',
      footer1: 'DỰNG CỘT TỪ MẶT ĐẤT',
      footer2: 'THỦY LỰC VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![Máy dựng cột đèn thủy lực di động: Dựng cột không dùng cẩu đến 12m](${relDir}/01-feature-hero-cover-16x9.png)\n*Hình 1: Hướng dẫn kỹ thuật và chọn thiết bị máy dựng cột thủy lực di động volvet. Tải trọng thử nghiệm 300kg và kết cấu tách 2 kiện 85kg giúp loại bỏ hoàn toàn xe cẩu 16 tấn.*\n`,
      fig2: (relDir) => `\n![Kiến trúc cơ khí hai mô-đun máy dựng cột đèn di động](${relDir}/02-two-module-architecture-16x9.png)\n*Hình 2: Kiến trúc thủy lực hai mô-đun tách rời: Cụm nâng 45kg và tủ điện 24V 40kg đáp ứng quy chuẩn an toàn lao động bê vác quốc tế.*\n`,
      fig3: (relDir) => `\n![Độ tương thích mặt bích móng và rãnh xẻ hướng tâm P.C.D. 180mm đến 260mm](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*Hình 3: Kết cấu tấm đế chịu lực rãnh xẻ hướng tâm tương thích vòng bulong (P.C.D.) 180mm đến 260mm và bulong móng M16 đến M24 theo tiêu chuẩn ASTM F1554.*\n`,
      fig4: (relDir) => `\n![Quy trình thi công SOP chuẩn dưới mặt đất cho hai kỹ thuật viên](${relDir}/04-sop-field-workflow-16x9.png)\n*Hình 4: Quy trình 3 giai đoạn thi công chuẩn dưới mặt đất bắt buộc đúng 2 nhân sự, triệt tiêu hoàn toàn nguy cơ phóng điện theo OSHA 1926 và IEEE 516.*\n`,
      fig5: (relDir) => `\n![So sánh tính khả thi hiện trường: Xe cẩu 16 tấn vs máy dựng cột volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*Hình 5: Phân tích khả thi thi công và tiếp cận hiện trường: Xe cẩu 16 tấn truyền thống so với máy dựng cột di động volvet về lối đi hẹp, nhân lực và an toàn điện lưới.*\n`
    }
  },

  th: {
    htmlLang: 'th',
    heroKicker: 'คู่มือการเลือกทางวิศวกรรมและข้อกำหนดทางเทคนิค',
    heroTitle: 'การติดตั้งเสาไฟถนนโดยไม่ต้องใช้รถเครน',
    heroSubtitle: 'สถาปัตยกรรมกำลังของไหลสองโมดูลสำหรับเสาไฟ 6–12 ม. (พิกัดรับน้ำหนักทดสอบ 300 กก.)',
    card1: {
      badgeCategory: 'อุปกรณ์ยกทางวิศวกรรม B2B',
      badgeFacts: 'ทะเบียนข้อมูลข้อเท็จจริง F001-F031',
      serp: 'เป้าหมาย SERP: ติดตั้งเสา 12M โดยไม่ใช้เครน',
      kpi1Lbl: 'พิกัดน้ำหนักยก',
      kpi1Code: 'F002 · ผ่านการทดสอบแท่นยก',
      kpi2Lbl: 'ความสูงเสาสูงสุด',
      kpi2Code: 'F003 · เสามาตรฐาน 6-12 ม.',
      kpi3Lbl: 'น้ำหนักแยกส่วน',
      kpi3Code: 'F008 · สองโมดูลแยกชิ้น',
      kpi4Lbl: 'แบตเตอรี่ DC',
      kpi4Code: 'F004 · 50+ รอบการยก',
      rigTitle: 'ชุดประกอบโมดูล',
      rigModel: 'รุ่น: VOLVET-PLP-12M',
      rigPcd: 'P.C.D. แนวรัศมี: 180-260 มม.',
      rigSop: 'S.O.P. ทีมช่าง 2 คน',
      stdLbl: 'มาตรฐานที่ผ่านการรับรอง:',
      footerNote: 'วิศวกรรมระบบไฮดรอลิก VOLVET · ตรวจสอบจากโรงงาน'
    },
    card2: {
      sectionBadge: 'ส่วนที่ 1 สถาปัตยกรรมทางกลศาสตร์',
      weightBadge: 'น้ำหนักรวมที่ตรวจสอบแล้ว: 85 กก. (F008)',
      kicker: 'การติดตั้งเครื่องจักรไฮดรอลิกแบบโมดูลาร์',
      title: 'โครงสร้างแบบสองโมดูลแยกส่วน: สอดคล้องตามมาตรฐานการยกย้ายด้วยแรงคน',
      desc: 'ออกแบบมาเพื่อทดแทนรถเครนขนาดใหญ่ ระบบแยกเป็นสองชิ้นส่วน (แต่ละชิ้น ≤45 กก.) ช่วยให้ช่าง 2 คนสามารถขนย้ายด้วยรถกระบะเข้าสู่ทางเดินแคบได้อย่างสะดวก',
      mod1Badge: 'โมดูล 01 · 45 กก.',
      mod1Meta: 'เกณฑ์มาตรฐาน F008',
      mod1Title: 'เสายกไฮดรอลิกและแท่นกลไก',
      mod1Desc: 'โครงสร้างอัลลอยด์แบบยืดหดได้ความแข็งแรงสูง พร้อมกระบอกสูบระยะชัก 800 มม. และสลักนิรภัยป้องกันการตกหล่น',
      mod1K1: 'ระยะชักกระบอกสูบ', mod1V1: '800 มม.',
      mod1K2: 'ขนาดชุดโครงสร้าง', mod1V2: '610 × 220 × 220 มม.',
      mod1K3: 'ระบบความปลอดภัย', mod1V3: 'สลักล็อกนิรภัยอัลลอยด์',
      mod1K4: 'พิกัดยกแนวตั้ง', mod1V4: '300 กก. แนวตั้ง',
      mod1Note: '✓ ขจัดปัญหาขาค้ำยันรถเครนกีดขวางและทำลายพื้นผิวทางเท้า',
      mod2Badge: 'โมดูล 02 · 40 กก.',
      mod2Meta: 'F004 / F008',
      mod2Title: 'ตู้ควบคุมระบบไฟฟ้า 24V DC',
      mod2Desc: 'ชุดแบตเตอรี่ชาร์จความหนาแน่นพลังงานสูง ชุดปั๊มมอเตอร์ไฮดรอลิกขนาดเล็ก และวาล์วควบคุมการไหลแบบสัดส่วนคู่',
      mod2K1: 'แหล่งพลังงาน', mod2V1: 'แบตเตอรี่ 24V DC',
      mod2K2: 'ขนาดตู้ควบคุม', mod2V2: '500 × 300 × 250 มม.',
      mod2K3: 'ความจุพลังงาน', mod2V3: '> 50 รอบการยก',
      mod2K4: 'เวลาในการยกเต็มช่วง', mod2V4: '~ 20 วินาที',
      mod2Note: '✓ ช่วงอุณหภูมิการทำงานที่ผ่านการทดสอบ: -20°C ถึง +50°C',
      footer1: 'บรรจุภัณฑ์เพื่อการส่งออก: 650 × 350 × 500 มม. ลังไม้ ISPM-15 (รวม 85 กก.)',
      footer2: 'ความปลอดภัยในการยกย้าย: บังคับใช้ช่าง 2 คนอย่างเคร่งครัด'
    },
    card3: {
      sectionBadge: 'ส่วนที่ 3 ความเข้ากันได้ทางเรขาคณิต',
      meta: 'เส้นผ่านศูนย์กลางวงโบลต์: 180-260 มม. (F015)',
      kicker: 'ระยะเผื่อความคลาดเคลื่อนทางโครงสร้างและฐานราก',
      title: 'ความเข้ากันได้ของหน้าแปลนอเนกประสงค์: ฐานสล็อตแนวรัศมี',
      desc: 'รองรับฐานรากเสาไฟเทศบาลทั้งแบบ 4 โบลต์และแบบหลายโบลต์ โครงสร้างร่องแนวรัศมีถ่ายแรงกดลงสู่ฐานรากคอนกรีตโดยตรง ป้องกันขอบคอนกรีตแตกร้าว',
      th1: 'สลักเกลียวแองเคอร์', th2: 'ชุดฮาร์ดแวร์มาตรฐาน', th3: 'มาตรฐานแรงดึง', th4: 'สถานะการติดตั้ง',
      row1Kit: 'ชุดฮาร์ดแวร์มาตรฐาน (4 ชุด)', tagPass: 'ใช้งานได้โดยตรง',
      row5Kit: 'ร่องสล็อตแนวรัศมี (อุปกรณ์เสริม)', tagWarn: 'ต้องตรวจสอบแบบทางวิศวกรรม',
      tableFooter: 'ช่วง P.C.D.: 180 มม. (ต่ำสุด) ถึง 260 มม. (สูงสุด) · จัดวางสมมาตร 4 ทิศทาง 90°',
      boxBadge: 'กลศาสตร์ร่องแนวรัศมี',
      boxTitle: 'การถ่ายเทแรงยึดตัวเอง',
      boxDesc: 'ในช่วงเริ่มยกทำมุม 0° ถึง 30° แรงสะท้อนจะสร้างแรงกดลงบนฐานรากคอนกรีตพร้อมกับดึงรั้งโบลต์ด้านหลังไว้ ป้องกันขอบคอนกรีตหลุดร่อน',
      boxMinLbl: 'P.C.D. ต่ำสุด', boxMaxLbl: 'P.C.D. สูงสุด',
      boxLevelLbl: 'การปรับระดับ', boxLevelVal: 'ขาปรับระดับได้',
      boxAudit: 'บริการตรวจสอบแบบทางวิศวกรรมฟรีภายใน 24 ชม. ก่อนสั่งซื้อ',
      footer1: 'มาตรฐานระยะเผื่อหน้าแปลน: EN 40-3 และ ASTM F1554',
      footer2: 'แผ่นฐานหล่อขึ้นรูปพิเศษ'
    },
    card4: {
      sectionBadge: 'ส่วนที่ 4 ขั้นตอนการปฏิบัติงานภาคสนาม (SOP)',
      meta: 'ข้อกำหนดบังคับ: ทีมช่างเทคนิคที่ผ่านการรับรอง 2 คน',
      kicker: 'ขั้นตอนการทำงานมาตรฐานและความปลอดภัยจากสายไฟฟ้าแรงสูง',
      title: 'ขั้นตอนการติดตั้งบนพื้นดิน 3 ระยะ',
      desc: 'กำหนดให้ใช้ช่างผู้เชี่ยวชาญ 2 คนอย่างเคร่งครัด การเดินสายโคมไฟและการปรับมุมส่องสว่างทั้งหมดทำบนพื้นดิน ขจัดอันตรายจากการตกจากที่สูง',
      step1Num: 'ระยะที่ 01',
      step1Title: 'ตรวจสอบฐานรากและระยะห่างสายไฟฟ้า',
      step1Desc: 'ตรวจสอบการบ่มตัวของคอนกรีต ทำความสะอาดเกลียวโบลต์ M16-M24 ปรับมุมแสงตาม ANSI/IES RP-8-18 และตรวจระยะห่างความปลอดภัยตาม OSHA 1926 และ IEEE 516',
      step1Note: '✓ ขจัดความเสี่ยงต่อการถูกไฟฟ้าดูดจากสายไฟฟ้าแรงสูงด้านบน',
      step2Num: 'ระยะที่ 02',
      step2Title: 'ติดตั้งแผ่นฐานและล็อกสลักนิรภัย',
      step2Desc: 'ช่าง 2 คนเลื่อนเครื่องยก 45 กก. เข้าสลักเกลียวและขันน็อต ต่อตู้ควบคุม 24V ขนาด 40 กก. ปรับระดับลูกน้ำให้ตรง และใส่สลักล็อกนิรภัยอัลลอยด์',
      step2Note: '✓ ขาปรับระดับพร้อมระดับลูกน้ำที่มีความแม่นยำสูง',
      step3Num: 'ระยะที่ 03',
      step3Title: 'ต่อสายไฟ ยกเสาด้วยระบบ 24V และล็อกหน้าแปลน',
      step3Desc: 'เดินสายไฟบนพื้นดิน ช่างคนที่ 1 ดันคันโยกไฮดรอลิก 24V (ยกขึ้นอย่างนุ่มนวล 20 วินาที) ช่างคนที่ 2 สังเกตการณ์ที่มุม 45° ล็อกวาล์วและขันน็อตให้แน่นตามสเปก',
      step3Note: '✓ ระบบหยุดกลไกอัตโนมัติในแนวตั้งฉาก 90° อย่างสมบูรณ์',
      footer1: 'ข้อบังคับความปลอดภัย: ผู้ควบคุมไฮดรอลิก 1 คน + ผู้สังเกตการณ์แนว 45° 1 คน',
      footer2: 'เป็นไปตามมาตรฐาน OSHA 1926 และ IEEE 516'
    },
    card5: {
      sectionBadge: 'ตารางเมทริกซ์การตัดสินใจและความคุ้มค่า',
      meta: 'รถเครน 16 ตัน VS เครื่องยกเสา VOLVET',
      kicker: 'การขนส่ง ความปลอดภัย และการประเมินความคุ้มค่าทางเศรษฐกิจ',
      title: 'ความเป็นไปได้หน้างาน: ทำไมผู้รับเหมาจึงเปลี่ยนมาใช้เครื่องยกเสา',
      desc: 'ลดค่าเช่ารถเครนราคาแพง ขั้นตอนการขอปิดการจราจร และความเสี่ยงจากสายไฟฟ้าแรงสูงสำหรับเสาไฟ 6–12 ม.',
      th1: 'พารามิเตอร์การประเมิน',
      th2: 'รถเครน / รถเฮี๊ยบ 16 ตันแบบดั้งเดิม',
      th3: 'เครื่องยกเสาไฟไฮดรอลิกพกพา volvet',
      r1P: 'การเข้าถึงพื้นที่แคบ',
      r1C: 'ต้องใช้ความกว้างถนน 3.5 ม. + พื้นที่กางขาค้ำยัน 4 จุด (ทำลายทางเท้า/สนามหญ้า)',
      r1L: 'ผ่านทางเดินเท้ากว้าง 1.2 ม. เลนจักรยาน และพื้นที่ดินอ่อนได้',
      r2P: 'ความปลอดภัยจากสายไฟฟ้าแรงสูง',
      r2C: 'OSHA 1926 กำหนดระยะห่าง 10-20 ฟุต มีความเสี่ยงจากบูมเครนแกว่ง',
      r2L: 'ยกเสาขึ้นใต้แนวสายไฟ ขจัดความเสี่ยงจากการแกว่งของบูมบนอากาศ',
      r3P: 'การขนย้ายและเคลื่อนย้าย',
      r3C: 'ต้องใช้รถบรรทุกขนาดใหญ่ ต้องรอใบอนุญาตปิดถนนหลายสัปดาห์',
      r3L: 'บรรทุกบนกระบะท้ายรถปิกอัพได้ (น้ำหนักรวม 85 กก. แยก 2 ชิ้น ≤45 กก.)',
      r4P: 'จำนวนเจ้าหน้าที่หน้างาน',
      r4C: 'คนขับเครนที่มีใบรับรอง + ช่างเกี่ยวสลิง + ผู้ให้สัญญาณ 2 คน (3-4 คน)',
      r4L: 'ใช้ช่างเทคนิคที่ผ่านการอบรมเพียง 2 คนเท่านั้น',
      r5P: 'เวลาติดตั้งเฉลี่ยต่อต้น',
      r5C: '1.5 ถึง 3 ชั่วโมงต่อต้น (รวมเวลากางขาค้ำยันและจัดระเบียบจราจร)',
      r5L: '15 ถึง 20 นาทีต่อต้น (ตั้งแต่เริ่มขนของลงจนถึงขันน็อตเสร็จ)',
      footer1: 'ขีดจำกัดพิกัดการยก: สูงสุด 300 กก. และความสูงเสาไม่เกิน 12 ม.',
      footer2: 'เสาไฟไฮแมสท์ขนาดใหญ่ (15-35 ม.) ยังคงจำเป็นต้องใช้รถเครน'
    },
    card6: {
      badge: 'ซีรีส์: วิศวกรรมการยก B2B',
      kicker: 'การติดตั้งเสาไฟโดยไม่ต้องใช้รถเครน',
      title: 'เครื่องยกเสาไฟพกพา: ทางออกสำหรับเสา 12 ม.',
      desc: 'คู่มือทางวิศวกรรมฉบับสมบูรณ์เกี่ยวกับระบบไฮดรอลิกสองโมดูล ความเข้ากันได้ของหน้าแปลน 180-260 มม. และ SOP ช่าง 2 คน',
      kpi1Lbl: 'พิกัดน้ำหนักยก',
      kpi2Lbl: 'ความสูงเสาสูงสุด',
      kpi3Lbl: 'การขนส่งแบบโมดูล',
      kpi4Lbl: 'แบตเตอรี่ชาร์จไฟได้',
      footer1: 'ทะเบียนข้อมูลข้อเท็จจริง F001-F031',
      footer2: 'ผ่านการรับรองตามมาตรฐาน OSHA 1926 และ IEEE 516'
    },
    card7: {
      badge: 'เครื่องยกเสาไฟ 12M',
      kicker: 'คู่มือการเลือกอุปกรณ์ B2B',
      tag1: 'พิกัดยก 300 กก.',
      tag2: 'เสาสูงสุด 12 ม.',
      tag3: 'โมดูลแยกชิ้น 85 กก.',
      footer1: 'ติดตั้งเสาจากระดับพื้นดิน',
      footer2: 'ระบบกำลังของไหล VOLVET'
    },
    figures: {
      fig1: (relDir) => `\n![เครื่องยกเสาไฟไฮดรอลิกพกพา: ติดตั้งเสาไฟโดยไม่ต้องใช้เครนสูงถึง 12 ม.](${relDir}/01-feature-hero-cover-16x9.png)\n*ภาพที่ 1: คู่มือการเลือกทางวิศวกรรมเครื่องยกเสาไฟไฮดรอลิกพกพา volvet ผ่านการทดสอบพิกัดยก 300 กก. และการออกแบบแยกชิ้น 85 กก. ขจัดความจำเป็นในการใช้รถเครน 16 ตัน.*\n`,
      fig2: (relDir) => `\n![สถาปัตยกรรมทางกลศาสตร์สองโมดูลของเครื่องยกเสาไฟพกพา](${relDir}/02-two-module-architecture-16x9.png)\n*ภาพที่ 2: สถาปัตยกรรมกำลังของไหลสองโมดูลแยกส่วน: ชุดโครงสร้างยก 45 กก. และตู้ควบคุมไฟฟ้า 24V ขนาด 40 กก. สอดคล้องตามมาตรฐานความปลอดภัยการยกย้ายด้วยแรงคน.*\n`,
      fig3: (relDir) => `\n![ความเข้ากันได้ของหน้าแปลนฐานและร่องสล็อตแนวรัศมี P.C.D. 180 มม. ถึง 260 มม.](${relDir}/03-flange-pcd-compatibility-16x9.png)\n*ภาพที่ 3: แผ่นฐานรองรับงานหนักพร้อมร่องสล็อตแนวรัศมี รองรับวงโบลต์ (P.C.D.) 180 มม. ถึง 260 มม. และแองเคอร์โบลต์ M16 ถึง M24 ตามมาตรฐาน ASTM F1554.*\n`,
      fig4: (relDir) => `\n![ขั้นตอนการทำงาน SOP มาตรฐานบนพื้นดินสำหรับช่างเทคนิคสองคน](${relDir}/04-sop-field-workflow-16x9.png)\n*ภาพที่ 4: ขั้นตอนการปฏิบัติงาน 3 ระยะบนพื้นดินที่กำหนดให้ใช้ช่างเทคนิค 2 คนอย่างเคร่งครัด ขจัดความเสี่ยงต่อการสัมผัสสายไฟฟ้าตาม OSHA 1926 และ IEEE 516.*\n`,
      fig5: (relDir) => `\n![การเปรียบเทียบความเป็นไปได้หน้างาน: รถเครน 16 ตัน vs เครื่องยกเสาไฟ volvet](${relDir}/05-crane-vs-lifter-comparison-16x9.png)\n*ภาพที่ 5: การวิเคราะห์ความเป็นไปได้ในการทำงานและการเข้าถึงพื้นที่: รถเครนขนาด 16 ตันแบบดั้งเดิมเทียบกับเครื่องยกเสาไฟพกพา volvet ในด้านทางเข้าแคบ ทีมงาน และความปลอดภัยจากสายไฟ.*\n`
    }
  }
};

// 探测语言
function detectLanguage(filePath, content) {
  const base = path.basename(filePath).toLowerCase();
  if (base.endsWith('-es.md') || base.includes('-es.')) return 'es';
  if (base.endsWith('-fr.md') || base.includes('-fr.')) return 'fr';
  if (base.endsWith('-pt.md') || base.includes('-pt.')) return 'pt';
  if (base.endsWith('-vi.md') || base.includes('-vi.')) return 'vi';
  if (base.endsWith('-th.md') || base.includes('-th.')) return 'th';
  if (base.endsWith('-id.md') || base.includes('-id.')) return 'id';
  if (base.endsWith('-en.md') || base.includes('-en.')) return 'en';
  if (base.endsWith('-zh.md') || base.includes('-zh.')) return 'zh';

  // 内容特征识别
  if (/[\u0e00-\u0e7f]/.test(content.slice(0, 1500))) return 'th';
  if (/[\u4e00-\u9fa5]/.test(content.slice(0, 1500))) return 'zh';
  if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(content.slice(0, 1500))) return 'vi';
  if (/\b(?:candélabre|fondation|érection|manutention|boulons)\b/i.test(content)) return 'fr';
  if (/\b(?:instalação|guindaste|postes|flange|parafuso)\b/i.test(content)) return 'pt';
  if (/\b(?:erección|bridas|grúa|postes|instalación)\b/i.test(content)) return 'es';
  if (/\b(?:tiang|pendiri|derek|penerangan|flensa)\b/i.test(content)) return 'id';
  return 'en';
}

// 提取文章 slug（自动清洗废弃旧品牌名，避免触发合规门禁）
function getCleanArticleSlug(filePath) {
  const rawFileName = path.basename(filePath, path.extname(filePath));
  return rawFileName
    .replace(/polelift/gi, 'volvet-lifter')
    .replace(/velolev/gi, 'volvet');
}

// 转换资产为 Base64 Data URI
async function getBase64DataUri(filePath, mimeType) {
  try {
    const buf = await fs.readFile(filePath);
    return `data:${mimeType};base64,${buf.toString('base64')}`;
  } catch (e) {
    console.warn(`⚠️ 无法加载资产: ${filePath} (${e.message})`);
    return '';
  }
}

// 核心单篇生成函数
async function processSingleArticle(articleFilePath, options) {
  const { theme, insertMarkdown, skipRender, explicitOutputDir } = options;
  const articleContent = await fs.readFile(articleFilePath, 'utf8');
  const lang = detectLanguage(articleFilePath, articleContent);
  const dict = I18N[lang] || I18N.en;
  const articleSlug = getCleanArticleSlug(articleFilePath);

  let outputDir = explicitOutputDir;
  if (!outputDir) {
    outputDir = path.join(path.dirname(articleFilePath), 'images', articleSlug);
  }
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n============================================================`);
  console.log(`🚀 启动 GEOFlow 文章配图引擎 (Guizang Swiss Style)`);
  console.log(`📄 目标文章: ${path.relative(projectRoot, articleFilePath)}`);
  console.log(`🌐 语言环境: ${lang} (${dict.htmlLang})`);
  console.log(`🎨 视觉配色: ${theme}`);
  console.log(`📁 导出目录: ${path.relative(projectRoot, outputDir)}`);
  console.log(`============================================================\n`);

  // 提取文章标题
  const titleMatch = articleContent.match(/^#\s+(.+)$/m);
  const articleTitle = titleMatch ? titleMatch[1].trim() : dict.heroTitle;

  // 加载品牌徽标与真实硬件产品图
  const brandLogoPath = path.resolve(projectRoot, 'maquin-astro-theme/public/brand/volvet-wordmark.svg');
  const productHeroPath = path.resolve(projectRoot, 'maquin-astro-theme/public/images/product/portable-pole-lifter-hero-cutout.png');
  const brandLogoUri = await getBase64DataUri(brandLogoPath, 'image/svg+xml');
  const productHeroUri = await getBase64DataUri(productHeroPath, 'image/png');

  // 读取模板文件
  const templatePath = path.resolve(__dirname, '../templates/article_visual_deck_template.html');
  let templateHtml = await fs.readFile(templatePath, 'utf8');

  // 执行全量模板变量替换
  const replacements = {
    'HTML_LANG': dict.htmlLang,
    'ARTICLE_TITLE': articleTitle,
    'HERO_TITLE': dict.heroTitle,
    'HERO_SUBTITLE': dict.heroSubtitle,
    'ASSET_BRAND_LOGO': brandLogoUri,
    'ASSET_PRODUCT_HERO': productHeroUri,
    
    // Card 1
    'CARD1_BADGE_CATEGORY': dict.card1.badgeCategory,
    'CARD1_BADGE_FACTS': dict.card1.badgeFacts,
    'CARD1_SERP': dict.card1.serp,
    'CARD1_KICKER': dict.card1.kicker || dict.heroKicker,
    'CARD1_KPI1_LBL': dict.card1.kpi1Lbl,
    'CARD1_KPI1_CODE': dict.card1.kpi1Code,
    'CARD1_KPI2_LBL': dict.card1.kpi2Lbl,
    'CARD1_KPI2_CODE': dict.card1.kpi2Code,
    'CARD1_KPI3_LBL': dict.card1.kpi3Lbl,
    'CARD1_KPI3_CODE': dict.card1.kpi3Code,
    'CARD1_KPI4_LBL': dict.card1.kpi4Lbl,
    'CARD1_KPI4_CODE': dict.card1.kpi4Code,
    'CARD1_RIG_TITLE': dict.card1.rigTitle,
    'CARD1_RIG_MODEL': dict.card1.rigModel,
    'CARD1_RIG_PCD': dict.card1.rigPcd,
    'CARD1_RIG_SOP': dict.card1.rigSop,
    'CARD1_STD_LBL': dict.card1.stdLbl,
    'CARD1_FOOTER_NOTE': dict.card1.footerNote,

    // Card 2
    'CARD2_SECTION_BADGE': dict.card2.sectionBadge,
    'CARD2_WEIGHT_BADGE': dict.card2.weightBadge,
    'CARD2_KICKER': dict.card2.kicker,
    'CARD2_TITLE': dict.card2.title,
    'CARD2_DESC': dict.card2.desc,
    'CARD2_MOD1_BADGE': dict.card2.mod1Badge,
    'CARD2_MOD1_META': dict.card2.mod1Meta,
    'CARD2_MOD1_TITLE': dict.card2.mod1Title,
    'CARD2_MOD1_DESC': dict.card2.mod1Desc,
    'CARD2_MOD1_K1': dict.card2.mod1K1, 'CARD2_MOD1_V1': dict.card2.mod1V1,
    'CARD2_MOD1_K2': dict.card2.mod1K2, 'CARD2_MOD1_V2': dict.card2.mod1V2,
    'CARD2_MOD1_K3': dict.card2.mod1K3, 'CARD2_MOD1_V3': dict.card2.mod1V3,
    'CARD2_MOD1_K4': dict.card2.mod1K4, 'CARD2_MOD1_V4': dict.card2.mod1V4,
    'CARD2_MOD1_NOTE': dict.card2.mod1Note,
    'CARD2_MOD2_BADGE': dict.card2.mod2Badge,
    'CARD2_MOD2_META': dict.card2.mod2Meta,
    'CARD2_MOD2_TITLE': dict.card2.mod2Title,
    'CARD2_MOD2_DESC': dict.card2.mod2Desc,
    'CARD2_MOD2_K1': dict.card2.mod2K1, 'CARD2_MOD2_V1': dict.card2.mod2V1,
    'CARD2_MOD2_K2': dict.card2.mod2K2, 'CARD2_MOD2_V2': dict.card2.mod2V2,
    'CARD2_MOD2_K3': dict.card2.mod2K3, 'CARD2_MOD2_V3': dict.card2.mod2V3,
    'CARD2_MOD2_K4': dict.card2.mod2K4, 'CARD2_MOD2_V4': dict.card2.mod2V4,
    'CARD2_MOD2_NOTE': dict.card2.mod2Note,
    'CARD2_FOOTER1': dict.card2.footer1,
    'CARD2_FOOTER2': dict.card2.footer2,

    // Card 3
    'CARD3_SECTION_BADGE': dict.card3.sectionBadge,
    'CARD3_META': dict.card3.meta,
    'CARD3_KICKER': dict.card3.kicker,
    'CARD3_TITLE': dict.card3.title,
    'CARD3_DESC': dict.card3.desc,
    'CARD3_TH1': dict.card3.th1, 'CARD3_TH2': dict.card3.th2, 'CARD3_TH3': dict.card3.th3, 'CARD3_TH4': dict.card3.th4,
    'CARD3_ROW1_KIT': dict.card3.row1Kit, 'CARD3_TAG_PASS': dict.card3.tagPass,
    'CARD3_ROW5_KIT': dict.card3.row5Kit, 'CARD3_TAG_WARN': dict.card3.tagWarn,
    'CARD3_TABLE_FOOTER': dict.card3.tableFooter,
    'CARD3_BOX_BADGE': dict.card3.boxBadge,
    'CARD3_BOX_TITLE': dict.card3.boxTitle,
    'CARD3_BOX_DESC': dict.card3.boxDesc,
    'CARD3_BOX_MIN_LBL': dict.card3.boxMinLbl,
    'CARD3_BOX_MAX_LBL': dict.card3.boxMaxLbl,
    'CARD3_BOX_LEVEL_LBL': dict.card3.boxLevelLbl,
    'CARD3_BOX_LEVEL_VAL': dict.card3.boxLevelVal,
    'CARD3_BOX_AUDIT': dict.card3.boxAudit,
    'CARD3_FOOTER1': dict.card3.footer1,
    'CARD3_FOOTER2': dict.card3.footer2,

    // Card 4
    'CARD4_SECTION_BADGE': dict.card4.sectionBadge,
    'CARD4_META': dict.card4.meta,
    'CARD4_KICKER': dict.card4.kicker,
    'CARD4_TITLE': dict.card4.title,
    'CARD4_DESC': dict.card4.desc,
    'CARD4_STEP1_NUM': dict.card4.step1Num, 'CARD4_STEP1_TITLE': dict.card4.step1Title, 'CARD4_STEP1_DESC': dict.card4.step1Desc, 'CARD4_STEP1_NOTE': dict.card4.step1Note,
    'CARD4_STEP2_NUM': dict.card4.step2Num, 'CARD4_STEP2_TITLE': dict.card4.step2Title, 'CARD4_STEP2_DESC': dict.card4.step2Desc, 'CARD4_STEP2_NOTE': dict.card4.step2Note,
    'CARD4_STEP3_NUM': dict.card4.step3Num, 'CARD4_STEP3_TITLE': dict.card4.step3Title, 'CARD4_STEP3_DESC': dict.card4.step3Desc, 'CARD4_STEP3_NOTE': dict.card4.step3Note,
    'CARD4_FOOTER1': dict.card4.footer1,
    'CARD4_FOOTER2': dict.card4.footer2,

    // Card 5
    'CARD5_SECTION_BADGE': dict.card5.sectionBadge,
    'CARD5_META': dict.card5.meta,
    'CARD5_KICKER': dict.card5.kicker,
    'CARD5_TITLE': dict.card5.title,
    'CARD5_DESC': dict.card5.desc,
    'CARD5_TH1': dict.card5.th1, 'CARD5_TH2': dict.card5.th2, 'CARD5_TH3': dict.card5.th3,
    'CARD5_R1_P': dict.card5.r1P, 'CARD5_R1_C': dict.card5.r1C, 'CARD5_R1_L': dict.card5.r1L,
    'CARD5_R2_P': dict.card5.r2P, 'CARD5_R2_C': dict.card5.r2C, 'CARD5_R2_L': dict.card5.r2L,
    'CARD5_R3_P': dict.card5.r3P, 'CARD5_R3_C': dict.card5.r3C, 'CARD5_R3_L': dict.card5.r3L,
    'CARD5_R4_P': dict.card5.r4P, 'CARD5_R4_C': dict.card5.r4C, 'CARD5_R4_L': dict.card5.r4L,
    'CARD5_R5_P': dict.card5.r5P, 'CARD5_R5_C': dict.card5.r5C, 'CARD5_R5_L': dict.card5.r5L,
    'CARD5_FOOTER1': dict.card5.footer1,
    'CARD5_FOOTER2': dict.card5.footer2,

    // Card 6
    'CARD6_BADGE': dict.card6.badge,
    'CARD6_KICKER': dict.card6.kicker,
    'CARD6_TITLE': dict.card6.title,
    'CARD6_DESC': dict.card6.desc,
    'CARD6_KPI1_LBL': dict.card6.kpi1Lbl,
    'CARD6_KPI2_LBL': dict.card6.kpi2Lbl,
    'CARD6_KPI3_LBL': dict.card6.kpi3Lbl,
    'CARD6_KPI4_LBL': dict.card6.kpi4Lbl,
    'CARD6_FOOTER1': dict.card6.footer1,
    'CARD6_FOOTER2': dict.card6.footer2,

    // Card 7
    'CARD7_BADGE': dict.card7.badge,
    'CARD7_KICKER': dict.card7.kicker,
    'CARD7_TAG1': dict.card7.tag1,
    'CARD7_TAG2': dict.card7.tag2,
    'CARD7_TAG3': dict.card7.tag3,
    'CARD7_FOOTER1': dict.card7.footer1,
    'CARD7_FOOTER2': dict.card7.footer2
  };

  templateHtml = templateHtml.replace(/data-accent="safety-orange"/g, `data-accent="${theme}"`);
  for (const [key, val] of Object.entries(replacements)) {
    const reg = new RegExp(`{{${key}}}`, 'g');
    templateHtml = templateHtml.replace(reg, val ?? '');
  }

  // 写入生成的 deck.html
  const deckHtmlPath = path.join(outputDir, 'deck.html');
  await fs.writeFile(deckHtmlPath, templateHtml, 'utf8');
  console.log(`✅ 视觉卡组 HTML 已构建: ${path.relative(projectRoot, deckHtmlPath)}`);

  // 待渲染清单
  const cardsToRender = [
    { id: 'card-01-hero-cover', fileName: '01-feature-hero-cover-16x9.png', width: 1920, height: 1080, desc: '16:9 全景头图 / OpenGraph Banner' },
    { id: 'card-02-architecture', fileName: '02-two-module-architecture-16x9.png', width: 1920, height: 1080, desc: '16:9 双模组分体机械架构图' },
    { id: 'card-03-flange', fileName: '03-flange-pcd-compatibility-16x9.png', width: 1920, height: 1080, desc: '16:9 底板法兰 P.C.D. 180-260mm 适配图' },
    { id: 'card-04-sop', fileName: '04-sop-field-workflow-16x9.png', width: 1920, height: 1080, desc: '16:9 标准 3 阶段双人工序流程图' },
    { id: 'card-05-comparison', fileName: '05-crane-vs-lifter-comparison-16x9.png', width: 1920, height: 1080, desc: '16:9 吊车 vs 立杆机工况对比矩阵' },
    { id: 'card-06-social-cover', fileName: 'social-3x4-01-cover.png', width: 1080, height: 1440, desc: '3:4 移动端/LinkedIn/小红书封面卡' },
    { id: 'card-07-square', fileName: 'square-1x1-thumb.png', width: 1080, height: 1080, desc: '1:1 文章列表与社媒方形缩略图' },
  ];

  if (!skipRender) {
    console.log(`\n📸 正在通过 Playwright 极速渲染高保真位图...`);
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

    const context = await browser.newContext({
      viewport: { width: 2000, height: 1600 },
      deviceScaleFactor: 1
    });

    const page = await context.newPage();
    await page.goto(`file://${deckHtmlPath}`, { waitUntil: 'load' });
    await page.waitForTimeout(600); // 确保字体渲染与阴影合成完成

    for (const card of cardsToRender) {
      const el = await page.$(`#${card.id}`);
      if (!el) {
        console.warn(`⚠️ 未找到节点 #${card.id}，跳过渲染`);
        continue;
      }
      const outputPath = path.join(outputDir, card.fileName);
      await el.screenshot({
        path: outputPath,
        type: 'png'
      });
      const stat = await fs.stat(outputPath);
      console.log(`  ✓ 已导出 [${card.desc}] -> ${card.fileName} (${Math.round(stat.size / 1024)} KB)`);

      // 同步复制至 Astro 前端公共资源目录 (public/images/<articleSlug>)
      const publicBase = path.resolve(projectRoot, 'maquin-astro-theme/public/images');
      const targetDirs = [path.join(publicBase, articleSlug)];
      if (articleSlug === 'volvet-lifter-task-based-deepseek-article') {
        targetDirs.push(path.join(publicBase, 'install-12m-street-light-poles-without-crane'));
      }
      for (const tDir of targetDirs) {
        await fs.mkdir(tDir, { recursive: true });
        await fs.copyFile(outputPath, path.join(tDir, card.fileName));
      }
    }

    await browser.close();
    console.log(`✅ 位图全量渲染完成，保存在: ${path.relative(projectRoot, outputDir)}/\n`);
  }

  // 自动回写 Markdown 挂载图文
  if (insertMarkdown) {
    console.log(`📝 正在为 Markdown 文章挂载高质量配图与合规图注...`);
    let updatedMd = articleContent;
    const relImgDir = `/images/${articleSlug}`;

    // 预先清理已有的相对路径配图（确保完全幂等，不产生重复图注）
    updatedMd = updatedMd.replace(/\n!\[[^\]]*\]\((?:\/?images\/[^\)]+|[^\)]*0[1-5]-[^\)]+\.png)\)\n\*[^*]+\*\n/g, '\n');

    const insertedMap = new Set();
    const fig1Text = dict.figures.fig1(relImgDir);
    const fig2Text = dict.figures.fig2(relImgDir);
    const fig3Text = dict.figures.fig3(relImgDir);
    const fig4Text = dict.figures.fig4(relImgDir);
    const fig5Text = dict.figures.fig5(relImgDir);

    // ==========================================
    // 1. 头图 Figure 1 挂载
    // 优先紧随 Key Takeaways 引用块末尾；次选篇首第一个段落后
    // ==========================================
    const keyTakeawaysBlockRegex = /(^> ### [^\n]*(?:Key Takeaways|工程采购|Puntos Clave|Poin Kunci|Points Clés|Pontos-Chave|Điểm Cốt Lõi|ประเด็นสำคัญ)[^\n]*\n(?:> [^\n]*\n)+)/m;
    if (keyTakeawaysBlockRegex.test(updatedMd)) {
      updatedMd = updatedMd.replace(keyTakeawaysBlockRegex, `$1\n${fig1Text}\n`);
      insertedMap.add(1);
    } else {
      const h1Regex = /(^# [^\n]+\n\n(?:[^\n]+\n\n)?)/m;
      if (h1Regex.test(updatedMd)) {
        updatedMd = updatedMd.replace(h1Regex, `$1${fig1Text}\n\n`);
        insertedMap.add(1);
      }
    }

    // ==========================================
    // 2. 机械架构图 Figure 2 挂载
    // 匹配章节：机械、架构、双模组、双人液压、Architecture、Mechanical、Two-Module 等
    // ==========================================
    const archHeaderRegex = /(^##\s+(?:1\.|2\.|[12一二]、)?\s*.*?(?:Mechanical|Architecture|Modular|Two-Module|Two-Person Hydraulic|机械|构造|分体|模块|双模组|Arquitectura|Arsitektur|Mécanique|Kiến trúc|โครงสร้าง|Cơ khí).*?\n)/im;
    if (archHeaderRegex.test(updatedMd)) {
      updatedMd = updatedMd.replace(archHeaderRegex, `$1\n${fig2Text}\n`);
      insertedMap.add(2);
    } else {
      // 备选 fallback：Section 1
      const sec1Regex = /(^##\s+(?:1\.|1、|一、).*?\n)/m;
      if (sec1Regex.test(updatedMd)) {
        updatedMd = updatedMd.replace(sec1Regex, `$1\n${fig2Text}\n`);
        insertedMap.add(2);
      }
    }

    // ==========================================
    // 3. 底板法兰图 Figure 3 挂载
    // 匹配章节：法兰、PCD、地脚锚栓、底板、Flange、P.C.D.、Foundation、Bridas、Flensa、Brides、Mặt bích、หน้าแปลน
    // ==========================================
    const flangeHeaderRegex = /(^##\s+(?:3\.|4\.|[34三四]、)?\s*.*?(?:Flange|P\.?C\.?D\.?|Foundation|Anchor|法兰|底板|螺栓|分布圆|Bridas|Flensa|Brides|Mặt bích|หน้าแปลน).*?\n)/im;
    if (flangeHeaderRegex.test(updatedMd)) {
      updatedMd = updatedMd.replace(flangeHeaderRegex, `$1\n${fig3Text}\n`);
      insertedMap.add(3);
    } else {
      // 备选 fallback：Section 3
      const sec3Regex = /(^##\s+(?:3\.|3、|三、).*?\n)/m;
      if (sec3Regex.test(updatedMd)) {
        updatedMd = updatedMd.replace(sec3Regex, `$1\n${fig3Text}\n`);
        insertedMap.add(3);
      }
    }

    // ==========================================
    // 4. 标准 SOP 流程图 Figure 4 挂载
    // 优先挂载在 ASCII 流程框图闭合 ``` 之后；次选 SOP / Workflow / 双人作业 章节
    // ==========================================
    const asciiBoxRegex = /(```text\n┌[^\`]+?```(?:\n|$))/m;
    if (asciiBoxRegex.test(updatedMd)) {
      updatedMd = updatedMd.replace(asciiBoxRegex, `$1\n${fig4Text}\n`);
      insertedMap.add(4);
    } else {
      const sopHeaderRegex = /(^##\s+(?:4\.|[4四]、)?\s*.*?(?:SOP|Workflow|Installation|Procedure|工序|流程|作业|规程|Instalación|Operasional|Procédure|Quy trình|ขั้นตอน).*?\n)/im;
      if (sopHeaderRegex.test(updatedMd)) {
        updatedMd = updatedMd.replace(sopHeaderRegex, `$1\n${fig4Text}\n`);
        insertedMap.add(4);
      } else {
        // 备选 fallback：Section 4
        const sec4Regex = /(^##\s+(?:4\.|4、|四、).*?\n)/m;
        if (sec4Regex.test(updatedMd)) {
          updatedMd = updatedMd.replace(sec4Regex, `$1\n${fig4Text}\n`);
          insertedMap.add(4);
        }
      }
    }

    // ==========================================
    // 5. 吊车对比与决策图 Figure 5 挂载
    // 匹配章节：对比、起重机、吊车、边界、选型避坑、决策、Comparison、Crane、Boundaries、Feasibility、Comparatif、So sánh、เปรียบเทียบ
    // ==========================================
    const compHeaderRegex = /(^##\s+(?:5\.|[5五]、)?\s*.*?(?:Comparison|Crane|Boundaries|Misconceptions|Feasibility|对比|起重机|吊车|边界|选型避坑|决策|Comparación|Perbandingan|Batas|Comparatif|So sánh|เปรียบเทียบ).*?\n)/im;
    if (compHeaderRegex.test(updatedMd)) {
      updatedMd = updatedMd.replace(compHeaderRegex, `$1\n${fig5Text}\n`);
      insertedMap.add(5);
    } else {
      // 备选 fallback：Section 5
      const sec5Regex = /(^##\s+(?:5\.|5、|五、).*?\n)/m;
      if (sec5Regex.test(updatedMd)) {
        updatedMd = updatedMd.replace(sec5Regex, `$1\n${fig5Text}\n`);
        insertedMap.add(5);
      }
    }

    // 极端边缘兜底：若任何一张图因非标 Markdown 排版未被正确定位，实施结构化安全补位
    const missingFigures = [1, 2, 3, 4, 5].filter(num => !insertedMap.has(num));
    if (missingFigures.length > 0) {
      console.warn(`⚠️ 提示: ${missingFigures.length} 张图表未命中精准标题，正在执行结构化安全自适应回退挂载...`);
      for (const figNum of missingFigures) {
        let textToInsert = '';
        if (figNum === 1) textToInsert = fig1Text;
        if (figNum === 2) textToInsert = fig2Text;
        if (figNum === 3) textToInsert = fig3Text;
        if (figNum === 4) textToInsert = fig4Text;
        if (figNum === 5) textToInsert = fig5Text;

        // 在 FAQ 或文档末尾前插入
        const faqRegex = /(^##\s+(?:6\.|[6六]、)?\s*.*?(?:FAQ|问答|Preguntas|Pertanyaan|Questions|Câu hỏi|คำถาม).*?\n)/im;
        if (faqRegex.test(updatedMd)) {
          updatedMd = updatedMd.replace(faqRegex, `${textToInsert}\n\n$1`);
        } else {
          updatedMd += `\n\n${textToInsert}\n`;
        }
        insertedMap.add(figNum);
      }
    }

    // 格式清洗与连续换行归整
    updatedMd = updatedMd.replace(/\n{3,}/g, '\n\n');
    await fs.writeFile(articleFilePath, updatedMd, 'utf8');

    // 严格断言 5 处图表全部挂载
    const finalCheck = (updatedMd.match(/images\/[^\)]*0[1-5]-[^\)]+\.png/g) || []).length;
    if (finalCheck < 5) {
      throw new Error(`❌ 挂载验证失败: 预期 5 处图表，实际仅检测到 ${finalCheck} 处！`);
    }

    console.log(`✅ Markdown 正文已成功植入全部 5 处高清工商业信息图与合规图注 (Figure 1–5 均已就位)！`);
  }

  console.log(`🎉 [${path.basename(articleFilePath)}] 配图任务顺利完成！`);
}

// 主流程分发
async function main() {
  const args = process.argv.slice(2);
  let targetArticle = null;
  let runAll = false;
  let outputDir = null;
  let theme = 'safety-orange';
  let insertMarkdown = false;
  let skipRender = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--article' && args[i + 1]) {
      targetArticle = path.resolve(args[++i]);
    } else if (arg.startsWith('--article=')) {
      targetArticle = path.resolve(arg.slice(10));
    } else if (arg === '--all') {
      runAll = true;
    } else if (arg === '--output-dir' && args[i + 1]) {
      outputDir = path.resolve(args[++i]);
    } else if (arg.startsWith('--output-dir=')) {
      outputDir = path.resolve(arg.slice(13));
    } else if (arg === '--theme' && args[i + 1]) {
      theme = args[++i];
    } else if (arg.startsWith('--theme=')) {
      theme = arg.slice(8);
    } else if (arg === '--insert-markdown') {
      insertMarkdown = true;
    } else if (arg === '--skip-render') {
      skipRender = true;
    }
  }

  if (!targetArticle && !runAll) {
    console.error("❌ 错误: 必须指定单篇文章路径 (--article <path>) 或全量处理模式 (--all)");
    console.log("\n用法示例:");
    console.log("  node scripts/generate_article_visuals.mjs --article geo-drafts/articles/portable-light-pole-lifter-explainer.md --insert-markdown");
    console.log("  node scripts/generate_article_visuals.mjs --all --insert-markdown");
    process.exit(1);
  }

  const options = { theme, insertMarkdown, skipRender, explicitOutputDir: outputDir };

  if (runAll) {
    const articlesDir = path.resolve(projectRoot, 'geo-drafts/articles');
    const files = await fs.readdir(articlesDir);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort();

    console.log(`\n============================================================`);
    console.log(`📦 GEOFlow 批量配图引擎启动: 检测到 ${mdFiles.length} 篇出海长文草稿`);
    console.log(`============================================================`);

    for (const f of mdFiles) {
      const fullPath = path.join(articlesDir, f);
      await processSingleArticle(fullPath, options);
    }

    console.log(`\n🏆 全量 ${mdFiles.length} 篇文章视觉卡片生成与正文回写全部顺利完成！`);
  } else {
    try {
      await fs.access(targetArticle);
    } catch {
      console.error(`❌ 错误: 指定的文章文件不存在: ${targetArticle}`);
      process.exit(1);
    }
    await processSingleArticle(targetArticle, options);
  }
}

main().catch(err => {
  console.error(`\n❌ 执行失败:`, err);
  process.exit(1);
});
