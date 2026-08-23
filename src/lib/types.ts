/**
 * 系统总览板块的领域类型定义。
 * 该类型同时作为「前端组件数据契约」与「后端接口返回体」，
 * 后续接入真实后端时保持此结构不变，前端无需改动。
 */

/** 隧道纵断面单个衬砌分段 */
export interface TunnelSegment {
  id: number;
  /** 起始桩号 */
  start: string;
  /** 终止桩号 */
  end: string;
  /** 衬砌类型，如 S4a / S5d / SMa */
  type: string;
  /** 分段长度 (m) */
  len: number;
  /** 围岩描述 */
  rock: string;
  /** 钢拱架配置 */
  steel: string;
  /** 喷射混凝土配置 */
  shot: string;
  /** 系统锚杆配置 */
  anchor: string;
  /** 推荐开挖工法 */
  method: string;
  /** 色带颜色 */
  color: string;
}

/** 成效指标看板单条 KPI */
export interface AchievementMetric {
  label: string;
  value: string;
  suffix?: string;
  unit?: string;
  sub: string;
  /** 主数值颜色：brand / ok / info / warn */
  tone: 'brand' | 'ok' | 'info' | 'warn';
}

/** 示范工程卡片信息 */
export interface ProjectInfo {
  name: string;
  badge: string;
  sub: string;
  tags: string[];
  chainage: string;
  length: string;
  progress: number;
  excavated: string;
  remaining: string;
}

/** 工法与支护统计 KPI */
export interface SupportKpi {
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  tone: 'brand' | 'info' | 'warn' | 'violet';
}

/** 纵断面图例项 */
export interface LegendItem {
  color: string;
  label: string;
}

/** 柱状图数据 */
export interface BarSeries {
  labels: string[];
  data: number[];
  colors: string[];
}

/** 环形图数据 */
export interface PieSeries {
  labels: string[];
  data: number[];
  colors: string[];
}

/** 主洞 / 平导切换时变化的汇总指标 */
export interface TunnelViewSummary {
  methodPct: string;
  methodName: string;
  methodSub: string;
  advLen: string;
  advPct: string;
}

/* ============================================================
   智能决策中心领域类型
   ============================================================ */

/** 决策模式：联合感知（自动同步）/ 手动推演 */
export type DecisionMode = 'joint' | 'manual';

/** 围岩级别（罗马数字） */
export type RockGrade = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

/** 单个候选开挖工法 */
export interface ConstructionMethod {
  key: string;
  name: string;
  /** 适用围岩，如 "Ⅳ 级围岩" */
  rock: string;
  /** 单循环耗时 */
  cycle: string;
  /** 单循环进尺 */
  adv: string;
  /** 喷砼厚度 */
  shot: string;
  /** 月度考核指标 */
  month: string;
  /** 工法描述 */
  desc: string;
  /** 装备配套 */
  equip: string;
}

/** 工法匹配评分结果 */
export interface MethodMatch extends ConstructionMethod {
  /** 匹配度 0~100 */
  score: number;
  /** 是否为当前围岩的推荐匹配项 */
  matched: boolean;
}

/** 支护构件类型 */
export type SupportComponentType = 'steel' | 'shot' | 'anchor' | 'advance';

/** 单项支护构件设计 */
export interface SupportComponent {
  key: SupportComponentType;
  label: string;
  spec: string;
  layout: string;
  /** 可调数值（钢架间距/喷厚/锚杆长度/环距） */
  valNum: number;
  unit: string;
  basis: string;
  /** 置信度 0~1 */
  conf: number;
  color: string;
}

/** 成拱力学机理参数 */
export interface ArchMechanism {
  /** 压力拱平衡高度，如 "8.2 m" */
  height: string;
  /** 围岩成拱应力释放率，如 "65 %" */
  release: string;
  /** 最佳初支封闭时机，如 "0.7 D" */
  closeTime: string;
}

/** 分项安全裕度雷达图数据 */
export interface SafetyRadar {
  labels: string[];
  data: number[];
}

/** 初期支护安全度评估结果 */
export interface SafetyAssessment {
  /** 综合安全度 0~100 */
  score: number;
  tag: string;
  reason: string;
  radar: SafetyRadar;
}

/** 方案报告单行 */
export interface SchemeRow {
  process: string;
  spec: string;
  quantity: string;
  basis: string;
}

/** 完整施工配置方案报告 */
export interface SchemeReport {
  no: string;
  time: string;
  mile: string;
  grade: string;
  method: string;
  rows: SchemeRow[];
}

/** 施工工作面选项 */
export interface WorkfaceOption {
  value: string;
  label: string;
  /** 该工作面默认围岩级别 */
  grade: RockGrade;
}

/** 开挖里程选项 */
export interface MileageOption {
  value: string;
  label: string;
  /** 提取出的桩号，如 K3601+200 */
  mile: string;
}

/** 18 项地质力学输入参数（字符串值，直接对应表单） */
export interface GeoParams {
  hardness: string;
  integrity: string;
  thickness: string;
  water: string;
  grade: RockGrade;
  depth: number;
  section: string;
  density: number;
  sharePrimary: number;
  shareSecondary: number;
  friction: number;
  elastic: number;
  cohesion: number;
  poisson: number;
  stressV: number;
  stressH: number;
  stressL: number;
  tensile: number;
}

/** 工作面与里程元数据 */
export interface DecisionMeta {
  workfaces: WorkfaceOption[];
  mileages: MileageOption[];
}

/** 系统总览聚合数据体 */
export interface OverviewData {
  title: string;
  subtitle?: string;
  badges: string[];
  achievementTitle: string;
  achievementTag?: string;
  achievements: AchievementMetric[];
  projects: ProjectInfo[];
  tunnel: {
    main: {
      title: string;
      totalLen: number;
      segments: TunnelSegment[];
    };
    pilot: {
      title: string;
      totalLen: number;
      segments: TunnelSegment[];
    };
    legend: LegendItem[];
    summaries: {
      main: TunnelViewSummary;
      pilot: TunnelViewSummary;
    };
  };
  supportKpis: SupportKpi[];
  charts: {
    schemeLen: BarSeries;
    steelDist: PieSeries;
  };
}