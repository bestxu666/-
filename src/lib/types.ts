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

/** 系统总览聚合数据体 */
export interface OverviewData {
  title: string;
  subtitle: string;
  badges: string[];
  achievementTitle: string;
  achievementTag: string;
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