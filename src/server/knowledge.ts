import { knowledgeData } from '@/data/knowledge';
import type { KnowledgeData } from '@/lib/types';

/**
 * 后端服务层 —— 经验数据库业务逻辑。
 *
 * 当前直接读取静态种子数据；接入数据库 / Python 知识服务后，
 * 在此处替换为真实数据读取与聚合，返回契约（KnowledgeData）保持不变。
 */
export function getKnowledge(): KnowledgeData {
  return knowledgeData;
}
