'use client';

import type { KnowledgeMapping } from '@/lib/types';
import { DataTable, type DataColumn } from './data-table';

type Tone = 'red' | 'amber' | 'teal' | 'gray';

const TONE_CLASS: Record<Tone, string> = {
  red: 'tag tag-red',
  amber: 'tag tag-amber',
  teal: 'tag tag-teal',
  gray: 'tag tag-gray',
};

function MappingTag({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return <span className={TONE_CLASS[tone]}>{children}</span>;
}

const COLUMNS: DataColumn<KnowledgeMapping>[] = [
  {
    key: 'no',
    title: '序号',
    render: (row) => <span className="tabular-nums">{row.no}</span>,
  },
  {
    key: 'code',
    title: '知识方案编号',
    render: (row) => <b className="font-semibold">{row.code}</b>,
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
    render: (row) => <span>{row.scheme}</span>,
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
        <span className="tag tag-teal ml-2">{tag}</span>
      </div>
      <DataTable columns={COLUMNS} data={data} rowKey={(r) => r.code} />
    </div>
  );
}
