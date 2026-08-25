import { schemeHistoryData } from '@/data/scheme';
import type { SchemeHistoryData } from '@/lib/types';

/**
 * 后端服务层 —— 方案报告与历史决策台账业务逻辑。
 *
 * 当前直接读取静态种子数据；接入数据库后，在此处替换为真实数据读取与聚合，
 * 返回契约（SchemeHistoryData）保持不变，页面与组件零改动。
 */
export function getSchemeHistory(): SchemeHistoryData {
  return schemeHistoryData;
}
