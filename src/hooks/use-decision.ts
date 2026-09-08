'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_GEO_PARAMS_IV,
  DEFAULT_GEO_PARAMS_V,
} from '@/data/decision';
import {
  applySupportValue,
  assessSafety,
  designSupport,
  generateScheme,
  inferMethods,
  recommendMethodKey,
} from '@/lib/decision-engine';
import type {
  DecisionMode,
  GeoParams,
  MethodMatch,
  RockGrade,
  SchemeReport,
  SupportComponent,
} from '@/lib/types';

/** 决策流程四步 */
export type DecisionStep = 1 | 2 | 3 | 4;

export interface DecisionState {
  mode: DecisionMode;
  workface: string;
  mileage: string;
  params: GeoParams;
  step: DecisionStep;
  /** 已推理出的候选工法（Step 2 产物） */
  methods: MethodMatch[];
  selectedMethodKey: string | null;
  /** 支护设计（Step 3 产物） */
  support: SupportComponent[];
  safety: ReturnType<typeof assessSafety> | null;
  /** 方案报告（Step 4 产物） */
  scheme: SchemeReport | null;
  /** 已发生微调的支护构件 key */
  adjusted: Set<SupportComponent['key']>;
}

/**
 * 智能决策中心状态编排 Hook。
 *
 * 封装四步决策的全部状态流转：
 * 1. 修改参数/工作面 → 2. 推理工法 → 3. 支护设计与校核 → 4. 生成方案。
 *
 * 当前使用前端规则引擎（src/lib/decision-engine.ts）；
 * Python 后端就绪后，将下方对引擎的调用替换为 src/lib/api.ts 中的请求函数即可，
 * 组件层无需改动。
 */
export function useDecision() {
  const [mode, setMode] = useState<DecisionMode>('joint');
  const [workface, setWorkface] = useState('shayi_main');
  const [mileage, setMileage] = useState('K3601+200');
  const [params, setParams] = useState<GeoParams>(DEFAULT_GEO_PARAMS_IV);

  const [step, setStep] = useState<DecisionStep>(1);
  const [methods, setMethods] = useState<MethodMatch[]>([]);
  const [selectedMethodKey, setSelectedMethodKey] = useState<string | null>(null);
  const [support, setSupport] = useState<SupportComponent[]>([]);
  const [safety, setSafety] = useState<ReturnType<typeof assessSafety> | null>(null);
  const [scheme, setScheme] = useState<SchemeReport | null>(null);
  const [adjusted, setAdjusted] = useState<Set<SupportComponent['key']>>(new Set());

  /** 切换决策模式 */
  const changeMode = useCallback((m: DecisionMode) => {
    setMode(m);
  }, []);

  /** 更新单项地质参数 */
  const updateParam = useCallback(
    <K extends keyof GeoParams>(key: K, value: GeoParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  /**
   * 切换工作面：按围岩级别回填一组默认地质参数。
   * 对应原 HTML onWorkfaceChange / fetchUniformData。
   */
  const changeWorkface = useCallback((value: string, grade: RockGrade) => {
    setWorkface(value);
    setParams(grade === 'V' ? DEFAULT_GEO_PARAMS_V : DEFAULT_GEO_PARAMS_IV);
  }, []);

  /** 切换开挖里程 */
  const changeMileage = useCallback((value: string) => {
    setMileage(value);
  }, []);

  /**
   * Step 1 → Step 2：启动智能推理，计算候选工法匹配度。
   */
  const runInfer = useCallback(() => {
    const matched = inferMethods(params);
    setMethods(matched);
    setSelectedMethodKey(recommendMethodKey(params.grade));
    // 重置后续步骤产物
    setSupport([]);
    setSafety(null);
    setScheme(null);
    setAdjusted(new Set());
    setStep(2);
  }, [params]);

  /** Step 2：人工改选工法 */
  const selectMethod = useCallback((key: string) => {
    setSelectedMethodKey(key);
  }, []);

  /**
   * Step 2 → Step 3：确认推荐工法，生成初期支护设计并校核。
   */
  const confirmMethod = useCallback(() => {
    if (!selectedMethodKey) return;
    const nextSupport = designSupport(params, selectedMethodKey);
    setSupport(nextSupport);
    setSafety(assessSafety(params, nextSupport));
    setScheme(null);
    setStep(3);
  }, [params, selectedMethodKey]);

  /**
   * Step 3：微调某支护构件数值，实时重新校核安全度。
   */
  const adjustSupport = useCallback(
    (key: SupportComponent['key'], value: number) => {
      setSupport((prev) => {
        const next = prev.map((c) =>
          c.key === key ? applySupportValue(c, value) : c,
        );
        setSafety(assessSafety(params, next));
        return next;
      });
      setAdjusted((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    },
    [params],
  );

  /** Step 3：重新校核（基于当前支护参数） */
  const recheck = useCallback(() => {
    if (support.length > 0) {
      setSafety(assessSafety(params, support));
    }
  }, [params, support]);

  /**
   * Step 3 → Step 4：生成完整施工配置方案报告。
   */
  const buildScheme = useCallback(() => {
    if (!selectedMethodKey) return;
    const report = generateScheme(params, mileage, selectedMethodKey, support);
    setScheme(report);
    setStep(4);
  }, [params, mileage, selectedMethodKey, support]);

  /** 返回 Step 2 修改工法 */
  const backToMethod = useCallback(() => {
    setStep(2);
  }, []);

  /** 重置整个决策流程 */
  const reset = useCallback(() => {
    setMethods([]);
    setSelectedMethodKey(null);
    setSupport([]);
    setSafety(null);
    setScheme(null);
    setAdjusted(new Set());
    setStep(1);
  }, []);

  /** 重置参数为当前工作面默认值 */
  const resetParams = useCallback(() => {
    setParams((prev) =>
      prev.grade === 'V' ? DEFAULT_GEO_PARAMS_V : DEFAULT_GEO_PARAMS_IV,
    );
  }, []);

  const selectedMethod = useMemo(
    () => methods.find((m) => m.key === selectedMethodKey) ?? null,
    [methods, selectedMethodKey],
  );

  return {
    // state
    mode,
    workface,
    mileage,
    params,
    step,
    methods,
    selectedMethodKey,
    selectedMethod,
    support,
    safety,
    scheme,
    adjusted,
    // actions
    changeMode,
    updateParam,
    changeWorkface,
    changeMileage,
    runInfer,
    selectMethod,
    confirmMethod,
    adjustSupport,
    recheck,
    buildScheme,
    backToMethod,
    reset,
    resetParams,
  };
}
