import { overviewData } from '@/data/overview';
import type {
  DecisionMeta,
  GeoParams,
  MethodMatch,
  OverviewData,
  SafetyAssessment,
  SchemeReport,
  SupportComponent,
} from './types';

/**
 * 数据访问层 —— 预留与后端交互的统一接口。
 *
 * 前端组件应统一调用本模块暴露的函数获取数据，
 * 而不是直接 import 静态数据，从而把「数据来源」与「视图渲染」解耦。
 *
 * 数据来源说明：
 * - 总览数据：当前版本直接返回本地静态数据（src/data/overview.ts）。
 * - 决策中心：推理/校核/出方案等核心计算逻辑将由后端（Python 服务）承担。
 *   下方决策相关函数已定义统一请求契约，后端就绪后启用 fetch 实现即可，
 *   前端组件与类型契约保持不变。
 *   前端通过同一路径前缀 `/api/decision/*` 访问，由部署层将其转发到
 *   Python 后端服务，实现前后端解耦、同源访问。
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

/* ============================================================
   智能决策中心 —— 后端（Python）交互接口预留
   ============================================================ */

const DECISION_API_BASE = '/api/decision';

/**
 * 获取决策中心元数据（工作面、开挖里程下拉项等）。
 *
 * 后端就绪后：
 * const res = await fetch(`${DECISION_API_BASE}/meta`, { cache: 'no-store' });
 * return (await res.json()) as DecisionMeta;
 */
export async function fetchDecisionMeta(): Promise<DecisionMeta> {
  // 静态数据由组件直接从 @/data/decision 读取，本函数仅作为接口占位。
  // 为保持「统一从数据访问层取数」的约定，这里做动态 import 转发。
  const { DECISION_META } = await import('@/data/decision');
  return DECISION_META;
}

/** 推理请求体：18 项地质参数 */
export interface InferMethodsRequest {
  params: GeoParams;
  /** 工作面 value */
  workface?: string;
  /** 开挖里程桩号 */
  mileage?: string;
}

/**
 * Step 2：根据地质参数推理候选工法及匹配度。
 *
 * 后端就绪后：
 * const res = await fetch(`${DECISION_API_BASE}/infer-methods`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ params, workface, mileage }),
 * });
 * return (await res.json()) as { methods: MethodMatch[] };
 */
export async function inferMethods(
  _req: InferMethodsRequest,
): Promise<{ methods: MethodMatch[] }> {
  // TODO: Python 后端就绪后替换为真实请求。当前由前端规则引擎兜底。
  throw new Error('决策推理接口待后端接入，当前使用前端内置规则引擎');
}

/**
 * Step 3：根据选定工法与围岩级别生成支护设计。
 *
 * 后端就绪后：
 * const res = await fetch(`${DECISION_API_BASE}/design-support`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ params, methodKey }),
 * });
 * return (await res.json()) as { support: SupportComponent[]; safety: SafetyAssessment };
 */
export async function designSupport(_req: {
  params: GeoParams;
  methodKey: string;
}): Promise<{ support: SupportComponent[]; safety: SafetyAssessment }> {
  throw new Error('支护设计接口待后端接入，当前使用前端内置规则引擎');
}

/** 支护微调后重新校核安全度的请求体 */
export interface RecheckRequest {
  params: GeoParams;
  methodKey: string;
  support: SupportComponent[];
}

/**
 * Step 3：支护参数微调后重新校核安全度。
 *
 * 后端就绪后：
 * const res = await fetch(`${DECISION_API_BASE}/recheck-safety`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ params, methodKey, support }),
 * });
 * return (await res.json()) as SafetyAssessment;
 */
export async function recheckSafety(_req: RecheckRequest): Promise<SafetyAssessment> {
  throw new Error('安全校核接口待后端接入，当前使用前端内置规则引擎');
}

/** 生成方案报告的请求体 */
export interface GenerateSchemeRequest {
  params: GeoParams;
  mileage: string;
  methodKey: string;
  support: SupportComponent[];
}

/**
 * Step 4：生成完整施工配置方案报告。
 *
 * 后端就绪后：
 * const res = await fetch(`${DECISION_API_BASE}/generate-scheme`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ params, mileage, methodKey, support }),
 * });
 * return (await res.json()) as SchemeReport;
 */
export async function generateSchemeApi(
  _req: GenerateSchemeRequest,
): Promise<SchemeReport> {
  throw new Error('方案生成接口待后端接入，当前使用前端内置规则引擎');
}
