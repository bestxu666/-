'use client';

import { useEffect, useState } from 'react';
import { DESIGN_LOGS, INFER_LOGS } from '@/lib/decision-adapter';

/** 当前加载阶段：method=决策工法（Step1→2），support=决策支护参数（Step2→3） */
export type DecisionLoadingKind = 'method' | 'support' | null;

const STEP_MS = 420;

/**
 * 智能决策中心「等待弹窗」。
 *
 * 参考原 HTML 的 showInferenceLoader：显示标题 + 场景 J 文案，按节奏逐条追加日志，
 * 并在持续期间保持遮罩，强烈提示推理正在后台进行。
 */
export function DecisionLoadingModal({
  kind,
}: {
  kind: DecisionLoadingKind;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setShown(0);
    if (!kind) return;
    // 先显示第一条，再按节奏追加
    const timer = setInterval(() => {
      setShown((n) => {
        const total = kind === 'method' ? INFER_LOGS.length : DESIGN_LOGS.length;
        if (n >= total) {
          clearInterval(timer);
          return n;
        }
        return n + 1;
      });
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [kind]);

  if (!kind) return null;

  const title =
    kind === 'method' ? '正在推理开挖工法' : '正在设计支护参数';
  const logs = kind === 'method' ? INFER_LOGS : DESIGN_LOGS;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-[420px] max-w-[90vw] overflow-hidden rounded-xl"
        style={{
          background: '#111f36',
          border: '1px solid rgba(45,212,191,.25)',
          boxShadow: '0 20px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(45,212,191,.08)',
        }}
      >
        {/* 头部 */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(120,165,230,.16)' }}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            {/* 品牌色旋转圆环 */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(45,212,191,.2)',
                borderTopColor: '#2dd4bf',
                animation: 'dc-spin 0.9s linear infinite',
              }}
            />
          </span>
          <h3
            className="m-0 text-[14px] font-semibold tracking-wide"
            style={{ color: '#eaf1fb' }}
          >
            {title}
          </h3>
          <span className="ml-auto text-[11px]" style={{ color: '#7189a8' }}>
            智能决策引擎
          </span>
        </div>

        {/* 日志区 */}
        <div className="px-5 py-4">
          <div
            className="min-h-[96px] max-h-[200px] overflow-y-auto rounded-lg px-3.5 py-3"
            style={{ background: 'rgba(10,19,34,.5)' }}
          >
            {logs.slice(0, shown).map((line, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-[12px] leading-relaxed"
                style={{
                  color: i === logs.length - 1 && i === shown - 1
                    ? '#2dd4bf'
                    : '#a9bdd8',
                  marginBottom: '4px',
                }}
              >
                <span
                  className="mt-[7px] inline-block h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ background: i === shown - 1 ? '#2dd4bf' : '#5aa2f8' }}
                />
                {line}
              </div>
            ))}
            {shown >= logs.length && (
              <div className="flex items-center gap-1.5 text-[12px]" style={{ color: '#3ddc97' }}>
                <span>核查完成，正在生成结果…</span>
                <span style={{ animation: 'dc-blink 1s step-end infinite' }}>▍</span>
              </div>
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <div
          className="flex items-center justify-center gap-2 px-5 pb-4 text-[11px]"
          style={{ color: '#7189a8' }}
        >
          <span
            className="inline-block h-[6px] w-[6px] rounded-full"
            style={{ background: '#2dd4bf', animation: 'dc-breathe 1.4s ease-in-out infinite' }}
          />
          正在基于当前地质参数进行智能分析，请稍候…
        </div>
      </div>

      <style>{`
        @keyframes dc-spin { to { transform: rotate(360deg); } }
        @keyframes dc-blink { 50% { opacity: 0; } }
        @keyframes dc-breathe { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}