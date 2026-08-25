'use client';

import type { EquipmentItem } from '@/lib/types';
import { DataTable, type DataColumn } from './data-table';
import { Tag } from './tag';

const COLUMNS: DataColumn<EquipmentItem>[] = [
  {
    key: 'id',
    title: '序号',
    render: (row) => <b className="text-ink">{row.id}</b>,
    className: 'w-14 text-center',
    headerClassName: 'text-center',
  },
  {
    key: 'name',
    title: '装备名称',
    render: (row) => <b className="text-ink">{row.name}</b>,
  },
  {
    key: 'model',
    title: '规格型号',
    render: (row) => <Tag tone="gray">{row.model}</Tag>,
  },
  {
    key: 'num',
    title: '配置数量',
    render: (row) => (
      <b className="text-brand tabular-nums">{row.num}</b>
    ),
    className: 'text-center',
    headerClassName: 'text-center',
  },
  {
    key: 'unit',
    title: '单位',
    className: 'text-center',
    headerClassName: 'text-center',
  },
  { key: 'pos', title: '作业工序 / 主要功能' },
  {
    key: 'stage',
    title: '所属施工阶段',
    render: (row) => <Tag tone="blue">{row.stage}</Tag>,
    className: 'whitespace-nowrap',
  },
];

export function EquipmentTable({ data }: { data: EquipmentItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel/40">
      <DataTable columns={COLUMNS} data={data} rowKey={(r) => r.id} />
    </div>
  );
}
