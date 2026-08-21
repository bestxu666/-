'use client';

import type { MethodMatch } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MethodSelectProps {
  methods: MethodMatch[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onConfirm: () => void;
  onReset: () => void;
}

export function MethodSelect({
  methods,
  selectedKey,
  onSelect,
  onConfirm,
  onReset,
}: MethodSelectProps) {
  return (
    <div className="mb">
      <div className="sec-title">
        Step 2 · 钻爆开挖工法匹配与对比选优
        <span className="sub">系统根据当前围岩等级智能高亮匹配工法</span>
      </div>

      <div className="mb grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {methods.map((m) => {
          const isSelected = m.key === selectedKey;
          const color = m.matched ? '#2dd4bf' : '#7189a8';
          return (
            <div
              key={m.key}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(m.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(m.key);
              }}
              className={cn('method-card', isSelected && 'selected')}
            >
              <div className="mc-head">
                <span className="mn">
                  {m.name}
                  {m.matched && (
                    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] font-medium text-brand">
                      当前匹配
                    </span>
                  )}
                </span>
                <span className="mc-score" style={{ color }}>
                  {m.score}% 匹配度
                </span>
              </div>
              <div className="mc-body">
                <p className="mb-2 text-[12px] leading-relaxed text-ink-2">
                  <b style={{ color: m.matched ? '#2dd4bf' : '#eaf1fb' }}>适应地质：</b>
                  {m.rock}
                  <br />
                  {m.desc}
                </p>
                <div className="mc-param">
                  <span className="l">单循环耗时</span>
                  <span className="v">{m.cycle}</span>
                </div>
                <div className="mc-param">
                  <span className="l">单循环进尺</span>
                  <span className="v">{m.adv}</span>
                </div>
                <div className="mc-param">
                  <span className="l">喷砼厚度</span>
                  <span className="v">{m.shot}</span>
                </div>
                <div className="mc-param">
                  <span className="l">月度考核指标</span>
                  <span className="v text-ok">{m.month}</span>
                </div>
                <div className="mc-param">
                  <span className="l">装备配套</span>
                  <span className="v text-[11px] font-normal text-ink-3">{m.equip}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center rounded-[7px] border border-line bg-white/5 px-4 py-2 text-[13px] font-semibold text-ink-2 transition-all hover:border-line-strong hover:bg-white/[0.09] hover:text-ink"
        >
          重新匹配
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex items-center justify-center gap-1.5 rounded-[7px] bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_3px_14px_rgba(59,130,246,.25)] transition-transform hover:-translate-y-px hover:shadow-[0_5px_18px_rgba(59,130,246,.38)]"
        >
          确认推荐工法，进入初期支护深度设计
        </button>
      </div>
    </div>
  );
}
