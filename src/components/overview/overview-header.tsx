import { Activity } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  badges: string[];
}

export function OverviewHeader({ title, subtitle, badges }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2 text-[12px] text-ink-3">
          <Activity className="h-3.5 w-3.5 text-brand" />
          <span className="tracking-wide">智能配置决策引擎 · 已接入 4 类核心算法</span>
        </div>
        <h1 className="text-[20px] font-semibold leading-tight text-ink md:text-[22px]">
          {title}
        </h1>
        {subtitle ? <p className="mt-0.5 text-[12.5px] text-ink-2">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-[12px] text-ink-2"
          >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}