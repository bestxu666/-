'use client';

import { useState } from 'react';

import type { OverviewData, TunnelSegment, TunnelViewSummary } from '@/lib/types';

type ViewMode = 'main' | 'pilot';

interface Props {
  tunnel: OverviewData['tunnel'];
}

interface DetailRow {
  label: string;
  value: string;
}

function buildDetails(seg: TunnelSegment): DetailRow[] {
  return [
    { label: '衬砌类型', value: seg.type },
    { label: '里程范围', value: `${seg.start} ~ ${seg.end}` },
    { label: '围岩特征', value: seg.rock },
    { label: '推荐工法', value: seg.method },
    { label: '钢拱架', value: seg.steel },
    { label: '喷混凝土', value: seg.shot },
    { label: '系统锚杆', value: seg.anchor },
  ];
}

function SummaryBlock({ summary }: { summary: TunnelViewSummary }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-line bg-card px-3 py-2">
        <div className="text-[11px] text-ink-3">开挖工法分布</div>
        <div className="mt-0.5 text-[15px] font-semibold text-ink">
          {summary.methodPct}
          <span className="ml-1 text-[12px] font-normal text-brand">
            {summary.methodName}
          </span>
        </div>
        <div className="text-[10.5px] text-ink-3">{summary.methodSub}</div>
      </div>
      <div className="rounded-lg border border-line bg-card px-3 py-2">
        <div className="text-[11px] text-ink-3">超前支护 / 预加固段落</div>
        <div className="mt-0.5 text-[15px] font-semibold text-warn">
          {summary.advLen}
          <span className="ml-1 text-[12px] font-normal text-ink-3">
            m ({summary.advPct})
          </span>
        </div>
        <div className="text-[10.5px] text-ink-3">Φ42 小导管注浆 / 双层小导管</div>
      </div>
    </div>
  );
}

export function LongitudinalStrip({ tunnel }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedId, setSelectedId] = useState<number>(18);

  const view = tunnel[viewMode];
  const summary = tunnel.summaries[viewMode];
  const selected = view.segments.find((s) => s.id === selectedId) ?? view.segments[0];

  const switchView = (mode: ViewMode) => {
    setViewMode(mode);
    setSelectedId(mode === 'main' ? 18 : 14);
  };

  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 backdrop-blur-sm">
      {/* 标题 + 切换 */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[13.5px] font-semibold text-ink">{view.title}</span>
        <div className="flex items-center gap-1 rounded-lg border border-line bg-muted p-0.5">
          {(['main', 'pilot'] as const).map((mode) => {
            const label = mode === 'main' ? '主洞' : '平行导洞';
            const isActive = mode === viewMode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => switchView(mode)}
                className={
                  'rounded-md px-3 py-1 text-[12px] transition-colors ' +
                  (isActive
                    ? 'bg-brand text-brand-foreground'
                    : 'text-ink-2 hover:text-ink')
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 图例 */}
      <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {tunnel.legend.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 text-[10.5px] text-ink-2"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      {/* 色带 */}
      <div className="flex h-[26px] w-full overflow-hidden rounded-md border border-line">
        {view.segments.map((seg) => {
          const widthPct = (seg.len / view.totalLen) * 100;
          const isSelected = seg.id === selectedId;
          return (
            <button
              key={seg.id}
              type="button"
              title={`${seg.type} · ${seg.start}~${seg.end} · ${seg.rock}`}
              onClick={() => setSelectedId(seg.id)}
              className={
                'h-full transition-[filter] ' +
                (isSelected
                  ? 'brightness-125 ring-2 ring-inset ring-white/80'
                  : 'hover:brightness-110')
              }
              style={{ width: `${widthPct}%`, backgroundColor: seg.color }}
            />
          );
        })}
      </div>

      {/* 选段明细 */}
      <div className="mt-3 rounded-lg border border-line bg-card p-3">
        <div className="mb-2 text-[11px] font-medium text-ink-3">
          分段配置明细
          <span className="ml-2 text-ink-2">{selected.type}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
          {buildDetails(selected).map((row) => (
            <div key={row.label} className="text-[11px]">
              <span className="text-ink-3">{row.label}：</span>
              <span className="text-ink-2">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 汇总 */}
      <div className="mt-3">
        <SummaryBlock summary={summary} />
      </div>
    </div>
  );
}