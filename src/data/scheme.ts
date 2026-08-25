import type { SchemeHistoryData } from '@/lib/types';

/**
 * 方案报告与历史决策台账 —— 静态种子数据。
 *
 * 对应参考 HTML（assets/index.html）中的 HISTORY_DB_DATA。
 * 后续接入后端时，由 GET /api/scheme 替换数据来源，页面无需改动。
 */
export const schemeHistoryData: SchemeHistoryData = {
  title: '方案报告与历史决策台账',
  subtitle:
    '历史决策记录管理 · 支持起止日期筛选，点击序号左侧 [+] 可展开单次决策全参数详情',
  faces: [
    '全部工作面',
    '沙益1号隧道主洞正洞掌子面',
    '沙益1号隧道平导掌子面',
  ],
  records: [
    {
      id: 1,
      time: '2026-08-19 09:30:15',
      face: '沙益1号隧道主洞正洞掌子面',
      mile: 'K3601+200',
      rock: 'Ⅳ级',
      method: '台阶法',
      type: 'S4a',
      score: 91.3,
      detail:
        '超前支护: Φ22药卷锚杆 L=4.5m @40cm | 初支: I16钢架@80cm + C25喷层22cm + Φ22药卷锚杆(120×80cm) | 装备: 装载机+挖掘机+自卸汽车+湿喷台车+拱架台车',
    },
    {
      id: 2,
      time: '2026-08-16 14:15:22',
      face: '沙益1号隧道主洞正洞掌子面',
      mile: 'K3600+450',
      rock: 'Ⅴ级',
      method: '环形开挖预留核心土法',
      type: 'S5a',
      score: 85.8,
      detail:
        '超前支护: Φ42小导管 L=4.5m @40cm注浆 | 初支: I20钢架@60cm + C25喷层26cm + Φ25中孔锚杆(60×60cm) | 装备: 潜孔钻机+地质钻机+湿喷台车+挖掘机',
    },
    {
      id: 3,
      time: '2026-08-14 10:45:00',
      face: '沙益1号隧道平导掌子面',
      mile: 'K3601+500',
      rock: 'Ⅳ级',
      method: '台阶法',
      type: 'PD4a',
      score: 92.0,
      detail:
        '平导超前开挖探明地质 | 初支: I14钢架@100cm + C25喷层15cm | 出渣: 后期利用车行横洞调车回路',
    },
    {
      id: 4,
      time: '2026-08-10 16:20:18',
      face: '沙益1号隧道主洞正洞掌子面',
      mile: 'K3599+050',
      rock: 'Ⅴ级',
      method: '环形开挖预留核心土法',
      type: 'S5d',
      score: 84.2,
      detail:
        '超前支护: Φ42双层小导管注浆预加固 | 初支: I20a加强钢架@60cm + 24cm喷层 | 防大变形坍塌控制',
    },
  ],
};
