'use client';

import { useRef } from 'react';
import { toast } from 'sonner';
import { DecisionPlaceholder } from '@/components/decision/decision-placeholder';
import { DecisionWorkbench } from '@/components/decision/decision-workbench';
import { FlowBar } from '@/components/decision/flow-bar';
import { MethodSelect } from '@/components/decision/method-select';
import { SchemeReportView } from '@/components/decision/scheme-report';
import { SupportDesign } from '@/components/decision/support-design';
import { TopBar } from '@/components/overview/top-bar';
import { useDecision, type DecisionStep } from '@/hooks/use-decision';
import { getArchMechanism } from '@/lib/decision-engine';

export default function DecisionPage() {
  const d = useDecision();

  // 各步骤区块的滚动锚点
  const workbenchRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const schemeRef = useRef<HTMLDivElement>(null);

  const scrollTo = (el: HTMLElement | null) => {
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleJump = (s: DecisionStep) => {
    if (s === 1) scrollTo(workbenchRef.current);
    if (s === 2) scrollTo(methodRef.current);
    if (s === 3) scrollTo(supportRef.current);
    if (s === 4) scrollTo(schemeRef.current);
  };

  const mechanism = getArchMechanism(d.params.grade);

  const handleSave = () => {
    // TODO: Python 后端就绪后，调用入库接口（POST /api/decision/save-scheme）。
    toast.success('方案已保存至方案与决策台账', {
      description: `报告编号 ${d.scheme?.no ?? ''}`,
    });
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <TopBar />
      <main className="mx-auto max-w-[1600px] px-6 pb-16 pt-5">
        {/* 页面头部 */}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2.5 text-[21px] font-bold tracking-wide">
              <span
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'rgba(45,212,191,.12)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" aria-hidden>
                  <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
                </svg>
              </span>
              智能决策中心
            </h1>
            <p className="mt-0.5 text-[12.5px] text-ink-3">
              开挖工法自适应推理 · 压力拱物理先验支护设计 · 多维承载力学校核
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11.5px] font-medium text-brand">
              混合驱动决策引擎
            </span>
          </div>
        </div>

        <FlowBar
          step={d.step}
          onJump={handleJump}
          reachable={{
            method: d.methods.length > 0,
            support: d.support.length > 0,
            scheme: d.scheme !== null,
          }}
        />

        <div ref={workbenchRef} className="scroll-mt-20">
          <DecisionWorkbench
            mode={d.mode}
            workface={d.workface}
            params={d.params}
            onModeChange={d.changeMode}
            onWorkfaceChange={d.changeWorkface}
            onMileageChange={d.changeMileage}
            onParamChange={d.updateParam}
            onResetParams={d.resetParams}
            onRunInfer={() => {
              d.runInfer();
              setTimeout(() => scrollTo(methodRef.current), 80);
            }}
          />
        </div>

        {/* 决策产物区 */}
        {d.step === 1 && <DecisionPlaceholder />}

        {d.step >= 2 && (
          <div ref={methodRef} className="scroll-mt-20">
            <MethodSelect
              methods={d.methods}
              selectedKey={d.selectedMethodKey}
              onSelect={d.selectMethod}
              onConfirm={() => {
                d.confirmMethod();
                setTimeout(() => scrollTo(supportRef.current), 80);
              }}
              onReset={d.reset}
            />
          </div>
        )}

        {d.step >= 3 && (
          <div ref={supportRef} className="scroll-mt-20">
            <SupportDesign
              mechanism={mechanism}
              support={d.support}
              safety={d.safety}
              adjusted={d.adjusted}
              onAdjust={d.adjustSupport}
              onRecheck={d.recheck}
              onBack={d.backToMethod}
              onGenerate={() => {
                d.buildScheme();
                setTimeout(() => scrollTo(schemeRef.current), 80);
              }}
            />
          </div>
        )}

        {d.step >= 4 && d.scheme && (
          <div ref={schemeRef} className="scroll-mt-20">
            <SchemeReportView scheme={d.scheme} onSave={handleSave} />
          </div>
        )}
      </main>
    </div>
  );
}
