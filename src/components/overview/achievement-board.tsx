import type { AchievementMetric } from '@/lib/types';

const TONE_TEXT: Record<AchievementMetric['tone'], string> = {
  brand: 'text-brand',
  ok: 'text-ok',
  info: 'text-info',
  warn: 'text-warn',
};

interface Props {
  achievementTitle: string;
  achievementTag: string;
  achievements: AchievementMetric[];
}

export function AchievementBoard({
  achievementTitle,
  achievementTag,
  achievements,
}: Props) {
  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-semibold text-ink">
            {achievementTitle}
          </span>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] text-brand">
            {achievementTag}
          </span>
        </div>
        <span className="text-[11px] text-ink-3">数据更新于当日监控</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {achievements.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-line bg-card px-4 py-3"
          >
            <div className="text-[12px] text-ink-3">{item.label}</div>
            <div
              className={
                'mt-1 text-[26px] font-semibold leading-none tabular-nums ' +
                TONE_TEXT[item.tone]
              }
            >
              {item.value}
              <span className="ml-1 text-[13px] font-normal text-ink-3">
                {item.unit}
              </span>
            </div>
            <div className="mt-2 text-[11.5px] text-ink-3">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}