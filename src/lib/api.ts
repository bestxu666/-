import { overviewData } from '@/data/overview';
import type { OverviewData } from './types';

/**
 * 数据访问层 —— 预留与后端交互的统一接口。
 *
 * 前端组件应统一调用本模块暴露的函数获取数据，
 * 而不是直接 import 静态数据，从而把「数据来源」与「视图渲染」解耦。
 *
 * 当前版本直接返回本地静态数据（src/data/overview.ts），
 * 后端就绪后只需将函数实现替换为真实请求（见下方注释），
 * 数据契约（OverviewData 类型）保持不变，前端组件零改动。
 */
export async function fetchOverview(): Promise<OverviewData> {
  // 后端就绪后启用以下实现：
  // const res = await fetch('/api/overview', { cache: 'no-store' });
  // if (!res.ok) {
  //   throw new Error(`加载总览数据失败：${res.status}`);
  // }
  // return (await res.json()) as OverviewData;

  return overviewData;
}