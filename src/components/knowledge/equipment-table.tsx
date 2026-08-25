"use client";

import { DataTable, type DataColumn } from "./data-table";
import type { EquipmentItem } from "@/lib/types";

const STAGE_TONE: Record<string, string> = {
  "开挖与出渣运输": "text-brand bg-brand-soft",
  "超前支护": "text-info bg-info-soft",
  "初期支护": "text-warn bg-warn-soft",
  "二次衬砌": "text-ok bg-ok-soft",
  "超前地质探测": "text-danger bg-danger-soft",
  "防排水施工": "text-violet bg-violet-soft",
};

  const COLUMNS: DataColumn<EquipmentItem>[] = [
    {
      key: "id",
      title: "序号",
      className: "text-center tabular-nums",
      headerClassName: "text-center",
      render: (r) => r.id,
    },
    { key: "name", title: "装备名称", className: "whitespace-nowrap font-medium text-ink" },
    { key: "model", title: "规格型号", className: "whitespace-nowrap" },
    {
      key: "num",
      title: "配置数量",
      className: "text-center tabular-nums whitespace-nowrap",
      headerClassName: "text-center",
    },
    { key: "unit", title: "单位", className: "text-center whitespace-nowrap", headerClassName: "text-center" },
    { key: "pos", title: "作业工序 / 主要功能" },
    {
      key: "stage",
      title: "所属施工阶段",
      className: "text-center whitespace-nowrap",
      headerClassName: "text-center",
      render: (r) => (
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] ${STAGE_TONE[r.stage] ??
  "text-brand bg-brand-soft"}`}>
          {r.stage}
        </span>
      ),
    },
  ];

interface EquipmentTableProps {
  title: string;
  tag: string;
  data: EquipmentItem[];
}

export function EquipmentTable({ title, tag, data }: EquipmentTableProps) {
  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3.5 w-2 rounded-[2px] bg-brand" />
          <h3 className="m-0 text-[15px] font-semibold tracking-wide text-ink">{title}</h3>
          <span className="ml-2 inline-flex items-center rounded-md border border-brand/25 bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
            {tag}
          </span>
        </div>
      </div>
      <DataTable<EquipmentItem>
        columns={COLUMNS}
        data={data}
        rowKey={(r) => String(r.id)}
        emptyText="暂无装备数据"
      />
    </div>
  );
}
