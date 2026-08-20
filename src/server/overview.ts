import { overviewData } from '@/data/overview';
import type { OverviewData } from '@/lib/types';

/**
 * 后端服务层 —— 系统总览业务逻辑。
 *
 * 职责边界：API 路由（HTTP 层）只做请求解析与响应封装，
 * 真正的数据聚合、计算、鉴权等业务逻辑集中在 server 层。
 *
 * 当前直接读取静态种子数据；接入 Supabase / 数据库后，
 * 在此处替换为真实数据读取与聚合，返回契约（OverviewData）保持不变。
 */
export function getOverview(): OverviewData {
  return overviewData;
}