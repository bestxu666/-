'use client';

import type { KnowledgeMapping } from '@/lib/types';
import { DataTable, type DataColumn } from './data-table';

type Tone = 'red' | 'amber' | 'teal' | 'gray';

const TONE_CLASS: Record<Tone, string> = {
  red: 'bg-red-soft text-red',
  amber: 'bg-warn-soft text-warn',
  teal: 'bg-brand-soft text-brand',
  gray: 'bg-white/5 text-ink-3',
};

function MappingTag({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-[12px] ${TONE_CLASS[tone]}`}>
      {children}
    </span>
  );
}

const COLUMNS: DataColumn<KnowledgeMapping>[] = [
  {
    key: 'no',
    title: '序号',
    render: (row) => <span className="tabular-nums">{row.no}</span>,
    className: 'w-12 text-center',
    headerClassName: 'text-center',
  },
  {
    key: 'code',
    title: '知识方案编号',
    render: (row) => <b className="text-brand">{row.code}</b>,
    className: 'whitespace-nowrap',
  },
  { key: 'hard', title: '坚硬程度' },
  { key: 'intact', title: '完整程度' },
  { key: 'water', title: '地下水量' },
  { key: 'depth', title: '埋深水平', className: 'whitespace-nowrap' },
  {
    key: 'stress',
    title: '构造应力',
    render: (row) => (
      <MappingTag tone={row.stress.includes('严重') ? 'red' : 'gray'}>
        {row.stress}
      </MappingTag>
    ),
  },
  {
    key: 'rock',
    title: '对应围岩',
    render: (row) => (
      <MappingTag tone={row.rock.includes('Ⅴ') ? 'amber' : 'teal'}>
        {row.rock}
      </MappingTag>
    ),
  },
  {
    key: 'scheme',
    title: '匹配优选工法与衬砌',
    render: (row) => <span className="text-ink">{row.scheme}</span>,
  },
];

interface MappingTableProps {
  title: string;
  tag: string;
  data: KnowledgeMapping[];
}

export function MappingTable({ title, tag, data }: MappingTableProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block h-3.5 w-2 rounded-[2px] bg-brand" />
        <h3 className="m-0 text-[15px] font-semibold tracking-wide text-ink">{title}</h3>
        <span className="ml-2 inline-flex items-center rounded-md border border-brand/25 bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
          {tag}
        </span>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-panel/40">
        <DataTable columns={COLUMNS} data={data} rowKey={(r) => r.code} />
      </div>
    </div>
  );
}
