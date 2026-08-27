import type {
  EquipmentItem,
  KnowledgeData,
  KnowledgeMapping,
  MethodCard,
  SupportScheme,
} from '@/lib/types';

/* 9 种核心施工装备台账 */
const EQUIPMENT: EquipmentItem[] = [
  { id: 1, name: '装载机', model: 'ZL50C 侧翻装载机', num: 2, unit: '台', pos: '洞内出渣与洞渣装车', stage: '开挖与出渣运输' },
  { id: 2, name: '挖掘机', model: 'CAT320D / 75型', num: 6, unit: '台', pos: '洞身开挖、找顶与核心土修整', stage: '开挖与出渣运输' },
  { id: 3, name: '自卸汽车', model: '20 方重型自卸车', num: 8, unit: '台', pos: '洞渣外运至洞外弃渣场', stage: '开挖与出渣运输' },
  { id: 4, name: '潜孔钻机', model: '全液压潜孔钻机', num: 2, unit: '台', pos: '超前管棚、小导管成孔打设', stage: '超前支护' },
  { id: 5, name: '湿喷台车', model: '混凝土湿喷机组', num: 2, unit: '台', pos: 'C25喷射混凝土机械化喷涂', stage: '初期支护' },
  { id: 6, name: '超前地质钻机', model: 'MKD-5S 型地质钻机', num: 1, unit: '台', pos: '掌子面前方超前深孔钻探', stage: '超前地质探测' },
  { id: 7, name: '拱架台车', model: '多功能钢架安装台车', num: 2, unit: '台', pos: '型钢钢架机械化定位与拼装', stage: '初期支护' },
  { id: 8, name: '二衬台车', model: '全液压自动行走衬砌台车', num: 2, unit: '台', pos: '二次衬砌全断面混凝土模筑浇筑', stage: '二次衬砌' },
  { id: 9, name: '防水板台车', model: '无钉铺设防水板作业台车', num: 2, unit: '台', pos: 'EVA/PVC防水板与土工布铺挂', stage: '防排水施工' },
];

/* 标准工法库 */
const METHODS: MethodCard[] = [
  {
    name: '全断面开挖法',
    tone: 'ok',
    geology: 'Ⅰ、Ⅱ、Ⅲ 级围岩。岩体完整坚硬、节理不发育、无不良地质，自稳能力极强。',
    section: '全断面一次开挖成型',
    advantage: '大型机械施工作业空间大、工序干扰少、循环进尺大',
    equipment: '潜孔钻机/凿岩台车 + 装载机 + 20方自卸车',
  },
  {
    name: '台阶法',
    tone: 'brand',
    geology: 'Ⅳ 级围岩。岩体较破碎、节理较发育、层状构造或中等埋深软硬互层岩体。',
    section: '分上、下两个台阶先后开挖',
    advantage: '上台阶提供钻孔与初支施作平台，及早封闭初支成环',
    equipment: '挖掘机 + 装载机 + 自卸汽车 + 拱架台车 + 湿喷台车',
  },
  {
    name: '环形开挖预留核心土法',
    tone: 'warn',
    geology: 'Ⅴ 级围岩。岩体破碎极破碎、千枚岩夹层、断层破碎带、深埋高地应力大变形段。',
    section: '先开挖拱部环形并初支，核心土支承掌子面防坍塌',
    advantage: '核心土临时支护掌子面，有效抑制围岩挤压变形',
    equipment: '潜孔钻机 + 超前地质钻机 + 湿喷台车 + 挖掘机',
  },
];

/* 地质环境特征与施工支护知识方案映射表 */
const MAPPINGS: KnowledgeMapping[] = [
  { no: 1, code: 'KB-IV-01', hard: '硬 (变质灰岩)', intact: '较破碎', water: '干燥', depth: '200~400m', stress: '轻微', rock: 'Ⅳ级', scheme: '台阶法 · S4b (I16@100cm)' },
  { no: 2, code: 'KB-IV-02', hard: '硬 (变质灰岩)', intact: '较破碎', water: '潮湿', depth: '400~600m', stress: '中等', rock: 'Ⅳ级', scheme: '台阶法 · S4a (I16@80cm)' },
  { no: 3, code: 'KB-IV-03', hard: '硬 (变质灰岩)', intact: '较破碎', water: '滴水', depth: '600~900m', stress: '较重', rock: 'Ⅳ级', scheme: '台阶法 · S4a (I16@80cm)' },
  { no: 4, code: 'KB-IV-04', hard: '硬 (变质灰岩)', intact: '破碎', water: '淋水', depth: '400~800m', stress: '较重', rock: 'Ⅳ级', scheme: '台阶法加宽 · S4jt (I18@80cm)' },
  { no: 5, code: 'KB-V-01', hard: '较软 (千枚岩)', intact: '破碎', water: '潮湿', depth: '200~400m', stress: '中等', rock: 'Ⅴ级', scheme: '预留核心土法 · S5c (I18@80cm)' },
  { no: 6, code: 'KB-V-02', hard: '较软 (千枚岩)', intact: '破碎', water: '淋水', depth: '400~600m', stress: '严重', rock: 'Ⅴ级', scheme: '预留核心土法 · S5a (I20@60cm)' },
  { no: 7, code: 'KB-V-03', hard: '较软 (千枚岩)', intact: '极破碎', water: '淋水', depth: '600~900m', stress: '很严重', rock: 'Ⅴ级', scheme: '预留核心土法 · S5a (I20@60cm最大埋深)' },
  { no: 8, code: 'KB-V-04', hard: '较软 (千枚岩)', intact: '极破碎', water: '涌水', depth: '600~900m', stress: '极严重', rock: 'Ⅴ级', scheme: '预留核心土法 · S5d (I20a双层小导管)' },
];

/* 支护体系与优选方案库 */
const SCHEMES: SupportScheme[] = [
  { no: 1, rock: 'Ⅳ级', type: 'S4a', depth: '200~600', advType: 'Φ22药卷锚杆', advRing: '40cm', advLen: '4.5m', advScope: '拱顶120°', anchor: '120×80cm (Φ22, 3.0m)', steel: 'I16 @80cm', shot: 'C25, 22cm', conc: 'C30', thick: '35cm', mode: '台阶法', advRate: '2.0m', benchLen: '3~5m' },
  { no: 2, rock: 'Ⅳ级', type: 'S4b', depth: '600~900', advType: 'Φ22药卷锚杆', advRing: '40cm', advLen: '4.5m', advScope: '拱顶120°', anchor: '120×100cm (Φ22, 3.0m)', steel: 'I16 @100cm', shot: 'C25, 22cm', conc: 'C30', thick: '35cm', mode: '台阶法', advRate: '2.0m', benchLen: '3~5m' },
  { no: 3, rock: 'Ⅳ级', type: 'S4jt', depth: '400~800', advType: 'Φ22药卷锚杆', advRing: '40cm', advLen: '4.5m', advScope: '全断面加深', anchor: '120×80cm (Φ22, 3.5m)', steel: 'I18 @80cm', shot: 'C25, 24cm', conc: 'C35', thick: '40cm', mode: '台阶法加宽', advRate: '1.8m', benchLen: '4~6m' },
  { no: 4, rock: 'Ⅴ级', type: 'S5a', depth: '400~900', advType: 'Φ42小导管注浆', advRing: '40cm', advLen: '4.5m', advScope: '拱部140°', anchor: '60×60cm (Φ25中孔, 3.5m)', steel: 'I20 @60cm', shot: 'C25, 26cm', conc: 'C35', thick: '45cm', mode: '预留核心土法', advRate: '0.8m', benchLen: '5~8m' },
  { no: 5, rock: 'Ⅴ级', type: 'S5c', depth: '200~400', advType: 'Φ42小导管注浆', advRing: '40cm', advLen: '4.0m', advScope: '拱部140°', anchor: '75×80cm (Φ25中孔, 3.5m)', steel: 'I18 @80cm', shot: 'C25, 24cm', conc: 'C35', thick: '40cm', mode: '预留核心土法', advRate: '1.0m', benchLen: '5~8m' },
  { no: 6, rock: 'Ⅴ级', type: 'S5d', depth: '600~900', advType: 'Φ42双层小导管', advRing: '40cm', advLen: '4.5m', advScope: '拱部全周加密', anchor: '60×75cm (Φ25中孔, 3.5m)', steel: 'I20a @60cm', shot: 'C25, 24cm', conc: 'C35', thick: '50cm', mode: '预留核心土法', advRate: '0.8m', benchLen: '5~8m' },
  { no: 7, rock: 'Ⅴ级', type: 'S5jt', depth: '600~900', advType: 'Φ42小导管注浆', advRing: '40cm', advLen: '4.0m', advScope: '停车带加宽段', anchor: '80×80cm (Φ25中孔, 3.5m)', steel: 'I20a @60cm', shot: 'C25, 26cm', conc: 'C35', thick: '50cm', mode: '预留核心土法', advRate: '0.8m', benchLen: '6~8m' },
];

export const knowledgeData: KnowledgeData = {
  equipmentTitle: '核心施工机械装备配置台账',
  equipment: EQUIPMENT,
  methodTitle: '标准工法库',
  methods: METHODS,
  mappingTitle: '地质环境特征与施工支护知识方案映射表',
  mappings: MAPPINGS,
  schemeTitle: '支护体系配置与优选方案库',
  schemes: SCHEMES,
};
