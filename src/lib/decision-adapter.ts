'use client';

/**
 * 智能决策中心「执行通道适配层」
 *
 * 双通道设计：
 * - mock：当前默认。走前端规则引擎（decision-engine.ts）计算，加最小延迟以模拟
 *   真实推理的等待过程，让弹窗/日志有可感知的节奏。
 * - real：预留真实算法通道。后期 Python 算法就绪后，实现 /api/decision/* 接口，
 *   并将下方 DECISION_CHANNEL 改为 'real' 即可，组件与 hook 无需改动。
 *
 * 接口契约与 src/lib/api.ts 中的占位函数保持一致。
 */

import {
  assessSafety as engineAssessSafety,
  designSupport as engineDesignSupport,
  inferMethods as engineInferMethods,
} from './decision-engine';
import {
  designSupport as apiDesignSupport,
  inferMethods as apiInferMethods,
} from './api';
import type {
  GeoParams,
  MethodMatch,
  SafetyAssessment,
  SupportComponent,
} from './types';

/** 决策执行通道：mock（前端规则引擎模拟） | real（真实后端算法） */
export type DecisionChannel = 'mock' | 'real';

/**
 * 真实算法接入时改为 'real'。
 * 需在 src/lib/api.ts 中实现 inferMethods / designSupport（走 /api/decision/*）。
 */
export const DECISION_CHANNEL: DecisionChannel = 'mock';

/** mock 通道最小等待时长（ms），让加载弹窗可感知 */
export const MOCK_METHOD_DELAY = 1700;
export const MOCK_SUPPORT_DELAY = 2000;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** 工法推理日志（mock 逐步展示） */
export const INFER_LOGS = [
  '读取当前隧道工作面地质参数…',
  '匹配围岩分级与开挖断面条件…',
  '评估 全断面 / 台阶 / 环形预留核心土 工法适用性…',
  '计算各工法匹配度，输出候选方案…',
];

/** 支护设计日志（mock 逐步展示） */
export const DESIGN_LOGS = [
  '依据选定工法生成初期支护体系…',
  '配置超前支护与系统锚杆参数…',
  '校核支护安全度与整体稳定性…',
  '生成支护参数方案…',
];

/**
 * 决策工法（Step 1 → Step 2）：
 * 返回候选工法列表。mock 走前端规则引擎 + 延迟；real 走后端接口。
 */
export async function inferMethodCandidates(
  params: GeoParams,
): Promise<MethodMatch[]> {
  if (DECISION_CHANNEL === 'real') {
    const { methods } = await apiInferMethods({ params });
    return methods;
  }
  await sleep(MOCK_METHOD_DELAY);
  return engineInferMethods(params);
}

/**
 * 决策支护参数（Step 2 → Step 3）：
 * 返回支护设计 + 安全校核结果。mock 走前端规则引擎 + 延迟；real 走后端接口。
 */
export async function designSupportCandidates(
  params: GeoParams,
  methodKey: string,
): Promise<{ support: SupportComponent[]; safety: SafetyAssessment }> {
  if (DECISION_CHANNEL === 'real') {
    const res = await apiDesignSupport({ params, methodKey });
    return { support: res.support, safety: res.safety };
  }
  await sleep(MOCK_SUPPORT_DELAY);
  const support = engineDesignSupport(params, methodKey);
  const safety = engineAssessSafety(params, support);
  return { support, safety };
}