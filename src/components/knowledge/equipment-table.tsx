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
    className: "tabular-nums",
    render: (r) => r.id,
  },
  { key: "name", title: "装备名称", className: "whitespace-nowrap" },
  { key: "model", title: "规格型号", className: "whitespace-nowrap" },
  {
    key: "num",
    title: "配置数量",
    className: "tabular-nums whitespace-nowrap",
  },
  { key: "unit", title: "单位", className: "whitespace-nowrap" },
  { key: "pos", title: "作业部位 / 主要用途" },
  {
    key: "stage",
    title: "所属施工阶段",
    className: "whitespace-nowrap",
    render: (r) => (
      <span className={STAGE_TONE[r.stage] ?? "tag tag-teal"}>{r.stage}</span>
    ),
  },
];

interface EquipmentTableProps {
  title: string;
  data: EquipmentItem[];
}

export function EquipmentTable({ title, data }: EquipmentTableProps) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid rgba(56, 189, 248, 0.16)",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {title} ({data.length} 种)
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
