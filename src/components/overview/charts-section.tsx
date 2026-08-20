'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { OverviewData } from '@/lib/types';

interface Props {
  charts: OverviewData['charts'];
}

const TOOLTIP_STYLE = {
  background: '#111f36',
  border: '1px solid rgba(120, 165, 230, 0.25)',
  borderRadius: 8,
  fontSize: 12,
  color: '#eaf1fb',
} as const;

const AXIS_TICK = { fill: '#7189a8', fontSize: 11 };

function SchemeLenChart({ charts }: Props) {
  const { schemeLen } = charts;
  const data = schemeLen.labels.map((name, i) => ({
    name,
    value: schemeLen.data[i],
    color: schemeLen.colors[i],
  }));

  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13.5px] font-semibold text-ink">
          衬砌类型里程分布（主洞）
        </span>
        <span className="text-[11px] text-ink-3">单位 m</span>
      </div>
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,165,230,.12)" vertical={false} />
            <XAxis dataKey="name" tick={AXIS_TICK} tickLine={false} axisLine={false} interval={0} />
            <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: '#a9bdd8' }}
              cursor={{ fill: 'rgba(120,165,230,.08)' }}
            />
            <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={36}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SteelDistChart({ charts }: Props) {
  const { steelDist } = charts;
  const data = steelDist.labels.map((name, i) => ({
    name,
    value: steelDist.data[i],
    color: steelDist.colors[i],
  }));

  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13.5px] font-semibold text-ink">
          型钢钢架型号分布占比（主洞）
        </span>
      </div>
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="42%"
              cy="50%"
              innerRadius={48}
              outerRadius={78}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={{ color: '#a9bdd8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 flex flex-col gap-1">
        {data.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between text-[10.5px] text-ink-2"
          >
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="tabular-nums text-ink-3">{entry.value}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartsSection({ charts }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      <SchemeLenChart charts={charts} />
      <SteelDistChart charts={charts} />
    </div>
  );
}