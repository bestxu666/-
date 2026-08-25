'use client';

import type { KnowledgeMapping } from '@/lib/types';
import { DataTable, type DataColumn } from './data-table';
import { Tag } from './tag';

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
      <Tag tone={row.stress.includes('严重') ? 'red' : 'gray'}>
        {row.stress}
      </Tag>
    ),
  },
  {
    key: 'rock',
    title: '对应围岩',
    render: (row) => (
      <Tag tone={row.rock.includes('Ⅴ') ? 'amber' : 'teal'}>
        {row.rock}
      </Tag>
    ),
  },
  {
    key: 'scheme',
    title: '匹配优选工法与衬砌',
    render: (row) => <span className="text-ink">{row.scheme}</span>,
  },
];

export function MappingTable({ data }: { data: KnowledgeMapping[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel/40">
      <DataTable columns={COLUMNS} data={data} rowKey={(r) => r.code} />
    </div>
  );
}
