/**
 * 智能决策中心静态种子数据。
 *
 * 对应原 HTML 中内嵌的工法库、支护库、工作面/里程等数据。
 * 后端（Python）就绪后，这些数据将由接口返回，
 * 前端组件只依赖 src/lib/types.ts 中的类型契约，无需改动。
 */
import type {
  ConstructionMethod,
  DecisionMeta,
  GeoParams,
  SupportComponent,
} from '@/lib/types';

/** 三种标准开挖工法库 */
export const CONSTRUCTION_METHODS: ConstructionMethod[] = [
  {
    key: 'full',
    name: '全断面开挖法',
    rock: 'Ⅰ、Ⅱ、Ⅲ 级围岩',
    cycle: '12.0 h',
    adv: '3.0 m',
    shot: '15 cm',
    month: '110 m/月',
    desc: '适用于岩体坚硬完整段，全断面一次爆破成型，大型机械化作业空间大、循环进尺快。',
    equip: '潜孔钻机/凿岩台车 + 装载机 + 20方自卸车 + 湿喷台车',
  },
  {
    key: 'bench',
    name: '台阶法',
    rock: 'Ⅳ 级围岩',
    cycle: '14.5 h',
    adv: '2.0 m',
    shot: '22 cm',
    month: '90 m/月',
    desc: '适用于Ⅳ级中风化变质灰岩段，上台阶先行开挖支护，下台阶跟进，兼顾进度与稳定。',
    equip: '挖掘机 + 装载机 + 20方自卸车 + 拱架台车 + 湿喷台车',
  },
  {
    key: 'core',
    name: '环形开挖预留核心土法',
    rock: 'Ⅴ 级围岩',
    cycle: '15.5 h',
    adv: '0.8 m',
    shot: '26 cm',
    month: '45 m/月',
    desc: '适用于Ⅴ级深埋大变形段，核心土支护掌子面防坍塌，配合掌子面加固(3h)。',
    equip: '潜孔钻机 + 超前地质钻机 + 75型挖机 + 湿喷台车 + 拱架台车',
  },
];

/** 工作面与开挖里程元数据 */
export const DECISION_META: DecisionMeta = {
  workfaces: [
    {
      value: 'shayi_main_iv',
      label: '沙益1号隧道 主洞正洞掌子面 (Ⅳ级围岩段 · S4a · K3601+048~K3601+848)',
      grade: 'IV',
    },
    {
      value: 'shayi_main_v',
      label: '沙益1号隧道 主洞正洞掌子面 (Ⅴ级深埋大变形段 · S5a/S5d · K3600+213~K3600+675)',
      grade: 'V',
    },
    {
      value: 'shayi_pilot_iv',
      label: '沙益1号隧道 平行导洞掌子面 (Ⅳ级围岩段 · PD4a · K3601+162~K3601+862)',
      grade: 'IV',
    },
    {
      value: 'shayi_pilot_v',
      label: '沙益1号隧道 平行导洞掌子面 (Ⅴ级围岩段 · PD5b · K3600+212~K3600+692)',
      grade: 'V',
    },
  ],
  mileages: [
    { value: 'm1', label: 'K3601+200 (Ⅳ级中风化变质灰岩 · 埋深 620m)', mile: 'K3601+200' },
    { value: 'm2', label: 'K3600+450 (Ⅴ级变质灰岩夹千枚岩 · 埋深 897.8m 最大埋深段)', mile: 'K3600+450' },
    { value: 'm3', label: 'K3599+050 (Ⅴ级双层超前小导管加强段)', mile: 'K3599+050' },
    { value: 'm4', label: 'K3601+900 (Ⅳ级紧急停车带加深段 S4jt)', mile: 'K3601+900' },
  ],
};

/** Ⅳ 级围岩默认地质参数（主洞正洞掌子面） */
export const DEFAULT_GEO_PARAMS_IV: GeoParams = {
  hardness: '硬',
  integrity: '较破碎',
  thickness: '厚层',
  water: '潮湿',
  grade: 'IV',
  depth: 620,
  section: '主洞标准断面',
  density: 2550,
  sharePrimary: 0.55,
  shareSecondary: 0.3,
  friction: 32,
  elastic: 2.85,
  cohesion: 260,
  poisson: 0.28,
  stressV: 21.5,
  stressH: 13.2,
  stressL: 12.8,
  tensile: 2.1,
};

/** Ⅴ 级围岩默认地质参数（深埋大变形段） */
export const DEFAULT_GEO_PARAMS_V: GeoParams = {
  hardness: '较软',
  integrity: '破碎',
  thickness: '薄层',
  water: '滴水',
  grade: 'V',
  depth: 897.8,
  section: '主洞标准断面',
  density: 2480,
  sharePrimary: 0.7,
  shareSecondary: 0.3,
  friction: 25,
  elastic: 1.65,
  cohesion: 140,
  poisson: 0.32,
  stressV: 31.2,
  stressH: 18.6,
  stressL: 16.4,
  tensile: 1.25,
};

/**
 * 根据围岩级别返回初期支护四构件设计。
 * 对应原 HTML runSupportDesign 中的支护库。
 */
export function buildSupportComponents(grade: GeoParams['grade']): SupportComponent[] {
  if (grade === 'V') {
    return [
      {
        key: 'steel',
        label: '型钢钢架 (表4.1-1)',
        spec: 'I20 工字钢架',
        layout: '间距 60 cm',
        valNum: 60,
        unit: 'cm',
        basis: '承担深埋大变形围岩压力',
        conf: 0.95,
        color: '#f7b955',
      },
      {
        key: 'shot',
        label: '喷射混凝土',
        spec: 'C25 喷射混凝土',
        layout: '厚度 26 cm',
        valNum: 26,
        unit: 'cm',
        basis: '分层初喷封闭与复喷包裹',
        conf: 0.94,
        color: '#3ddc97',
      },
      {
        key: 'anchor',
        label: '系统锚杆',
        spec: 'Φ25 中孔/中空锚杆',
        layout: 'L=3.5m · 间距 60×60cm',
        valNum: 3.5,
        unit: 'm',
        basis: '深部注浆锚固',
        conf: 0.92,
        color: '#5aa2f8',
      },
      {
        key: 'advance',
        label: '超前支护',
        spec: 'Φ42 小导管注浆',
        layout: 'L=4.5m · 环向间距 40cm',
        valNum: 40,
        unit: 'cm',
        basis: '拱部超前预加固防坍',
        conf: 0.93,
        color: '#a78bfa',
      },
    ];
  }

  return [
    {
      key: 'steel',
      label: '型钢钢架 (表4.1-1)',
      spec: 'I16 工字钢架',
      layout: '间距 80 cm',
      valNum: 80,
      unit: 'cm',
      basis: '与锚喷形成空间受力拱',
      conf: 0.94,
      color: '#5aa2f8',
    },
    {
      key: 'shot',
      label: '喷射混凝土',
      spec: 'C25 喷射混凝土',
      layout: '厚度 22 cm',
      valNum: 22,
      unit: 'cm',
      basis: '湿喷早强密贴封闭',
      conf: 0.95,
      color: '#3ddc97',
    },
    {
      key: 'anchor',
      label: '系统锚杆',
      spec: 'Φ22 药卷锚杆',
      layout: 'L=3.0m · 间距 120×80cm',
      valNum: 3.0,
      unit: 'm',
      basis: '悬吊与组合拱加固',
      conf: 0.91,
      color: '#2dd4bf',
    },
    {
      key: 'advance',
      label: '超前支护',
      spec: 'Φ22 药卷超前锚杆',
      layout: 'L=4.5m · 环向间距 40cm',
      valNum: 40,
      unit: 'cm',
      basis: '拱顶超前导向支护',
      conf: 0.9,
      color: '#a78bfa',
    },
  ];
}

/** 支护构件 key → 中文标签（报告排序用） */
export const SUPPORT_REPORT_ORDER = ['advance', 'steel', 'shot', 'anchor'] as const;
