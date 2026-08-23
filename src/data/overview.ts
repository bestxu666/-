import type {
  OverviewData,
  TunnelSegment,
} from '@/lib/types';

/**
 * 系统总览静态数据源（源自示范工程「沙益 1 号隧道」标定数据）。
 *
 * 当前为本地静态数据，用于前端框架搭建与联调；
 * 后端就绪后，该文件仍可作为 /api/overview 接口的初始返回体，
 * 或直接由数据库 / 对象存储替换。
 */

/** 主洞纵断面衬砌分段（29 段，全长 4737m） */
const MAIN_SEGS: TunnelSegment[] = [
  { id: 1, start: 'K3598+388', end: 'K3598+391', type: 'SMa', len: 3, rock: '明洞', steel: '明洞衬砌', shot: 'C25 模筑', anchor: '—', method: '明挖法', color: '#3ddc97' },
  { id: 2, start: 'K3598+391', end: 'K3598+411', type: 'S5a', len: 20, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 3, start: 'K3598+411', end: 'K3598+423', type: 'S5c', len: 12, rock: 'Ⅴ级', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 4, start: 'K3598+423', end: 'K3598+998', type: 'S4b', len: 575, rock: 'Ⅳ级', steel: 'I16 @100cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 5, start: 'K3598+998', end: 'K3599+168', type: 'S5d', len: 170, rock: 'Ⅴ级(双层导管)', steel: 'I20a @60cm', shot: '24cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f87171' },
  { id: 6, start: 'K3599+168', end: 'K3599+348', type: 'S4a', len: 180, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 7, start: 'K3599+348', end: 'K3599+475', type: 'S4a', len: 127, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 8, start: 'K3599+475', end: 'K3599+525', type: 'S4jt', len: 50, rock: 'Ⅳ级(停车带)', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ22药卷 L=3.5m', method: '台阶法加宽', color: '#a78bfa' },
  { id: 9, start: 'K3599+525', end: 'K3599+575', type: 'S4a', len: 50, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 10, start: 'K3599+575', end: 'K3599+625', type: 'S4jt', len: 50, rock: 'Ⅳ级(停车带)', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ22药卷 L=3.5m', method: '台阶法加宽', color: '#a78bfa' },
  { id: 11, start: 'K3599+625', end: 'K3600+043', type: 'S4a', len: 418, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 12, start: 'K3600+043', end: 'K3600+213', type: 'S5a', len: 170, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 13, start: 'K3600+213', end: 'K3600+675', type: 'S5a', len: 462, rock: 'Ⅴ级(最大埋深)', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 14, start: 'K3600+675', end: 'K3600+725', type: 'S5jt', len: 50, rock: 'Ⅴ级(停车带)', steel: 'I20a @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#e11d48' },
  { id: 15, start: 'K3600+725', end: 'K3600+775', type: 'S5a', len: 50, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 16, start: 'K3600+775', end: 'K3600+825', type: 'S5jt', len: 50, rock: 'Ⅴ级(停车带)', steel: 'I20a @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#e11d48' },
  { id: 17, start: 'K3600+825', end: 'K3601+048', type: 'S5a', len: 223, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 18, start: 'K3601+048', end: 'K3601+848', type: 'S4a', len: 800, rock: 'Ⅳ级(主段)', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 19, start: 'K3601+848', end: 'K3601+878', type: 'S4a', len: 27, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 20, start: 'K3601+878', end: 'K3601+925', type: 'S4jt', len: 50, rock: 'Ⅳ级(停车带)', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ22药卷 L=3.5m', method: '台阶法加宽', color: '#a78bfa' },
  { id: 21, start: 'K3601+925', end: 'K3601+975', type: 'S4a', len: 50, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 22, start: 'K3601+975', end: 'K3602+025', type: 'S4jt', len: 50, rock: 'Ⅳ级(停车带)', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ22药卷 L=3.5m', method: '台阶法加宽', color: '#a78bfa' },
  { id: 23, start: 'K3602+025', end: 'K3602+220', type: 'S4a', len: 195, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 24, start: 'K3602+220', end: 'K3602+470', type: 'S5a', len: 250, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 25, start: 'K3602+470', end: 'K3602+780', type: 'S4a', len: 310, rock: 'Ⅳ级', steel: 'I16 @80cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 26, start: 'K3602+780', end: 'K3603+085', type: 'S4b', len: 305, rock: 'Ⅳ级', steel: 'I16 @100cm', shot: '22cm', anchor: 'Φ22药卷 L=3.0m', method: '台阶法', color: '#5aa2f8' },
  { id: 27, start: 'K3603+085', end: 'K3603+100', type: 'S5c', len: 15, rock: 'Ⅴ级', steel: 'I18 @80cm', shot: '24cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 28, start: 'K3603+100', end: 'K3603+120', type: 'S5a', len: 20, rock: 'Ⅴ级', steel: 'I20 @60cm', shot: '26cm', anchor: 'Φ25中孔 L=3.5m', method: '环形核心土法', color: '#f7b955' },
  { id: 29, start: 'K3603+120', end: 'K3603+125', type: 'SMa', len: 5, rock: '出口明洞', steel: '明洞衬砌', shot: 'C25 模筑', anchor: '—', method: '明挖法', color: '#3ddc97' },
];

/** 平行导洞纵断面衬砌分段（23 段，全长 4764m） */
const PILOT_SEGS: TunnelSegment[] = [
  { id: 1, start: 'K3598+400', end: 'K3598+405', type: 'PDMa', len: 5, rock: '平导明洞', steel: '明洞衬砌', shot: 'C25', anchor: '—', method: '明挖法', color: '#3ddc97' },
  { id: 2, start: 'K3598+405', end: 'K3598+420', type: 'PD5a', len: 15, rock: '平导Ⅴ级', steel: 'I18 @60cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 3, start: 'K3598+420', end: 'K3598+443', type: 'PD5b', len: 23, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 4, start: 'K3598+443', end: 'K3598+993', type: 'PD4a', len: 550, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 5, start: 'K3598+993', end: 'K3599+163', type: 'PD5b', len: 170, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 6, start: 'K3599+163', end: 'K3599+368', type: 'PD4a', len: 205, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 7, start: 'K3599+368', end: 'K3599+492', type: 'PD4a', len: 124, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 8, start: 'K3599+492', end: 'K3599+542', type: 'PD4j', len: 50, rock: '平导Ⅳ级加深', steel: 'I16 @80cm', shot: '18cm', anchor: 'Φ22 L=3.0m', method: '台阶加深', color: '#a78bfa' },
  { id: 9, start: 'K3599+542', end: 'K3600+082', type: 'PD4a', len: 540, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 10, start: 'K3600+082', end: 'K3600+212', type: 'PD5b', len: 130, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 11, start: 'K3600+212', end: 'K3600+692', type: 'PD5b', len: 480, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 12, start: 'K3600+692', end: 'K3600+742', type: 'PD5j', len: 50, rock: '平导Ⅴ级加深', steel: 'I20 @60cm', shot: '22cm', anchor: 'Φ25 L=3.5m', method: '环形法', color: '#e11d48' },
  { id: 13, start: 'K3600+742', end: 'K3601+162', type: 'PD5b', len: 420, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 14, start: 'K3601+162', end: 'K3601+862', type: 'PD4a', len: 700, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 15, start: 'K3601+862', end: 'K3601+892', type: 'PD4a', len: 30, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 16, start: 'K3601+892', end: 'K3601+942', type: 'PD4j', len: 50, rock: '平导Ⅳ级加深', steel: 'I16 @80cm', shot: '18cm', anchor: 'Φ22 L=3.0m', method: '台阶加深', color: '#a78bfa' },
  { id: 17, start: 'K3601+942', end: 'K3602+274', type: 'PD4a', len: 332, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 18, start: 'K3602+274', end: 'K3602+534', type: 'PD5b', len: 260, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 19, start: 'K3602+534', end: 'K3602+794', type: 'PD4a', len: 260, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 20, start: 'K3602+794', end: 'K3603+119', type: 'PD4a', len: 325, rock: '平导Ⅳ级', steel: 'I14 @100cm', shot: '15cm', anchor: 'Φ20 L=2.5m', method: '台阶法', color: '#5aa2f8' },
  { id: 21, start: 'K3603+119', end: 'K3603+144', type: 'PD5b', len: 25, rock: '平导Ⅴ级', steel: 'I18 @80cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 22, start: 'K3603+144', end: 'K3603+159', type: 'PD5a', len: 15, rock: '平导Ⅴ级', steel: 'I18 @60cm', shot: '20cm', anchor: 'Φ22 L=3.0m', method: '环形法', color: '#f7b955' },
  { id: 23, start: 'K3603+159', end: 'K3603+164', type: 'SMa', len: 5, rock: '平导出口明洞', steel: '明洞衬砌', shot: 'C25', anchor: '—', method: '明挖法', color: '#3ddc97' },
];

/** 系统总览聚合数据 */
export const overviewData: OverviewData = {
  title: '工程总览',
  badges: ['川藏公路G318线', '沙益 1 号示范工程', '开挖进度 100% (已贯通)'],

  achievementTitle: '智能配置系统成效指标看板',
  achievementTag: '累计标定 4737m 主洞 + 4764m 平导',
  achievements: [
    {
      label: '累计完成智能决策循环',
      value: '1,862',
      unit: '个循环',
      sub: '主洞 1,180 环 + 平导 682 环',
      tone: 'brand',
    },
    {
      label: '施工现场方案采纳率',
      value: '97.4',
      unit: '%',
      sub: '采纳 1,814 次 / 优化微调 48 次',
      tone: 'ok',
    },
    {
      label: '单次决策生成平均耗时',
      value: '< 3.0',
      unit: '秒',
      sub: '较传统人工计算(45min)提速 90%+',
      tone: 'info',
    },
    {
      label: '综合工效与安全效益',
      value: '进尺提升 18.5%',
      sub: '超耗降低 12.3% · 零大变形坍塌',
      tone: 'warn',
    },
  ],

  projects: [
    {
      name: '沙益 1 号隧道',
      badge: '示范工程',
      sub: '川藏G318线 · 4.74km · Ⅳ~Ⅴ级围岩',
      tags: ['主洞 4737m', '平导 4764m'],
      chainage: 'K3598+388 ~ K3603+125',
      length: '主洞 4737m / 平导 4764m',
      progress: 100,
      excavated: '4.74 km',
      remaining: '0.00 km',
    },
  ],

  tunnel: {
    main: {
      title: '主洞纵断面衬砌分布图 (4737m)',
      totalLen: 4737,
      segments: MAIN_SEGS,
    },
    pilot: {
      title: '平行导洞纵断面衬砌分布图 (4764m)',
      totalLen: 4764,
      segments: PILOT_SEGS,
    },
    legend: [
      { color: '#3ddc97', label: '明洞 (SMa)' },
      { color: '#5aa2f8', label: 'Ⅳ级普通 (S4a/S4b)' },
      { color: '#a78bfa', label: 'Ⅳ级停车带 (S4jt)' },
      { color: '#f7b955', label: 'Ⅴ级普通 (S5a/S5c)' },
      { color: '#f87171', label: 'Ⅴ级双层导管 (S5d)' },
      { color: '#e11d48', label: 'Ⅴ级停车带 (S5jt)' },
    ],
    summaries: {
      main: {
        methodPct: '68.3%',
        methodName: '台阶法',
        methodSub: '台阶法 3237m · 核心土法 1500m',
        advLen: '1500',
        advPct: '31.7%',
      },
      pilot: {
        methodPct: '68.1%',
        methodName: '台阶法',
        methodSub: '台阶法 3243m · 环形法 1518m',
        advLen: '1518',
        advPct: '31.9%',
      },
    },
  },

  supportKpis: [
    {
      label: '开挖工法分布覆盖',
      value: '68.3%',
      suffix: '台阶法',
      delta: '台阶法 3237m · 核心土法 1500m',
      tone: 'brand',
    },
    {
      label: '初期支护钢拱架配置',
      value: '4',
      suffix: '类型号规格',
      delta: 'I16/I18/I20/I20a · 间距60~100cm',
      tone: 'info',
    },
    {
      label: '喷层与系统锚杆体系',
      value: '22~26',
      suffix: 'cm',
      delta: 'C25喷砼 · Φ22药卷/Φ25中孔锚杆',
      tone: 'warn',
    },
    {
      label: '超前支护与预加固段落',
      value: '1500',
      suffix: 'm (31.7%)',
      delta: 'Φ42小导管注浆/双层小导管',
      tone: 'violet',
    },
  ],

  charts: {
    schemeLen: {
      labels: [
        'S4a (Ⅳ普)',
        'S4b (Ⅳ深)',
        'S4jt (Ⅳ停)',
        'S5a (Ⅴ普)',
        'S5c (Ⅴ浅)',
        'S5d (Ⅴ双导)',
        'S5jt (Ⅴ停)',
        'SMa (明洞)',
      ],
      data: [2157, 880, 200, 1175, 27, 170, 100, 8],
      colors: [
        '#5aa2f8',
        '#3b82f6',
        '#a78bfa',
        '#f7b955',
        '#eab308',
        '#f87171',
        '#e11d48',
        '#3ddc97',
      ],
    },
    steelDist: {
      labels: [
        'I16 钢架 (3037m · 64.1%)',
        'I18 钢架 (227m · 4.8%)',
        'I20 钢架 (1175m · 24.8%)',
        'I20a 强化钢架 (270m · 5.7%)',
        '明洞无钢架 (28m · 0.6%)',
      ],
      data: [3037, 227, 1175, 270, 28],
      colors: ['#5aa2f8', '#a78bfa', '#f7b955', '#f87171', '#3ddc97'],
    },
  },
};