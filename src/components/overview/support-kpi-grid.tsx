import { Clock, Layers, LayoutGrid, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { SupportKpi } from '@/lib/types';

const TONE_MAP: Record<
  SupportKpi['tone'],
  { text: string; bar: string; color: string; icon: LucideIcon }
> = {
  brand: { text: 'text-brand', bar: 'bg-brand', color: '#2dd4bf', icon: Layers },
  info: { text: 'text-info', bar: 'bg-info', color: '#5aa2f8', icon: Clock },
  warn: { text: 'text-warn', bar: 'bg-warn', color: '#f7b955', icon: Shield },
  violet: { text: 'text-violet', bar: 'bg-violet', color: '#a78bfa', icon: LayoutGrid },
};

function KpiCard({ kpi }: { kpi: SupportKpi }) {
  const tone = TONE_MAP[kpi.tone];
  const Icon = tone.icon;
  return (
    <div className="relative rounded-lg border border-line bg-card px-3 py-2.5">
      <span className={'absolute inset-y-2 left-0 w-[3px] rounded-r ' + tone.bar} />
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-card-2">
          <Icon className="h-3.5 w-3.5" style={{ color: tone.color }} />
        </span>
        <span className="text-[11.5px] text-ink-3">{kpi.label}</span>
      </div>
      <div className="mt-1.5 pl-1">
        <span className={'text-[20px] font-semibold leading-none tabular-nums ' + tone.text}>
          {kpi.value}
        </span>
        {kpi.suffix && (
          <span className="ml-1 text-[12px] text-ink-2">{kpi.suffix}</span>
        )}
      </div>
      <div className="mt-1.5 pl-1 text-[10.5px] leading-snug text-ink-3">{kpi.delta}</div>
    </div>
  );
}

interface Props {
  supportKpis: SupportKpi[];
}

export function SupportKpiGrid({ supportKpis }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-panel/60 p-4 backdrop-blur-sm sm:grid-cols-2 xl:grid-cols-4">
      {supportKpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}