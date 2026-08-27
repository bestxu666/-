"use client";

import { DataTable, type DataColumn } from "./data-table";
import type { EquipmentItem } from "@/lib/types";

const STAGE_TONE: Record<string, string> = {
  "开挖与出渣运输": "tag tag-teal",
  "超前支护": "tag tag-blue",
  "初期支护": "tag tag-amber",
  "二次衬砌": "tag tag-green",
  "超前地质探测": "tag tag-red",
  "防排水施工": "tag tag-purple",
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
        <span className={STAGE_TONE[r.stage] ?? "tag tag-teal"}>
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
          <span
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
            style={{ background: "rgba(247,185,85,.12)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f7b955" strokeWidth="2" aria-hidden>
              <path d="M9 3h6v4h4v6h-4v4H9v-4H5V7h4V3z" />
              <path d="M9 17v4M15 17v4M5 21h14" />
            </svg>
          </span>
          <h3 className="m-0 text-[15px] font-semibold tracking-wide text-ink">{title}</h3>
          <span className="tag tag-teal ml-2">
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
