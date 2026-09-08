"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataColumn } from "./data-table";
import { Field, Modal, Toast, useBriefToast } from "./modal";
import type { EquipmentItem } from "@/lib/types";
import { createEquipment, deleteEquipment } from "@/lib/api";

const STAGE_TONE: Record<string, string> = {
  "开挖与出渣运输": "tag tag-teal",
  "超前支护": "tag tag-blue",
  "初期支护": "tag tag-amber",
  "二次衬砌": "tag tag-green",
  "超前地质探测": "tag tag-red",
  "防排水施工": "tag tag-purple",
};
const STAGES = Object.keys(STAGE_TONE);

interface EquipmentTableProps {
  title: string;
  data: EquipmentItem[];
}

export function EquipmentTable({ title, data }: EquipmentTableProps) {
  const { msg, show } = useBriefToast();
  const [list, setList] = useState<EquipmentItem[]>(data);
  const [kw, setKw] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    model: "",
    num: 1,
    unit: "台",
    pos: "",
    stage: STAGES[0],
  });

  const filtered = useMemo(() => {
    const q = kw.trim().toLowerCase();
    if (!q) return list;
    return list.filter((e) =>
      `${e.name} ${e.model} ${e.pos} ${e.stage}`.toLowerCase().includes(q),
    );
  }, [list, kw]);

  async function deleteItem(id: number) {
    try {
      await deleteEquipment(id);
      setList((prev) => prev.filter((e) => e.id !== id));
      show("已删除装备台账");
    } catch (e) {
      show((e as Error).message || "删除失败");
    }
  }

  async function save() {
    if (!form.name.trim()) {
      show("请输入装备名称");
      return;
    }
    try {
      const created = await createEquipment({
        name: form.name.trim(),
        model: form.model.trim(),
        num: Number(form.num) || 1,
        unit: form.unit.trim() || "台",
        pos: form.pos.trim(),
        stage: form.stage,
      });
      setList((prev) => [...prev, { ...created, custom: true }]);
      setOpen(false);
      setForm({ name: "", model: "", num: 1, unit: "台", pos: "", stage: STAGES[0] });
      show("已登记新装备");
    } catch (e) {
      show((e as Error).message || "登记失败");
    }
  }

  const columns: DataColumn<EquipmentItem>[] = [
    { key: "id", title: "序号", className: "tabular-nums", render: (r) => r.id },
    {
      key: "name",
      title: "装备名称",
      className: "whitespace-nowrap font-semibold text-white",
      render: (r) =>
        r.custom ? (
          <span className="whitespace-nowrap">
            {r.name}
            <span className="tag tag-teal" style={{ marginLeft: 4 }}>
              新增
            </span>
          </span>
        ) : (
          r.name
        ),
    },
    {
      key: "model",
      title: "规格型号",
      className: "whitespace-nowrap",
      render: (r) => <span className="tag tag-gray">{r.model}</span>,
    },
    {
      key: "num",
      title: "配置数量",
      className: "tabular-nums whitespace-nowrap",
      render: (r) => <b style={{ color: "#00d2be" }}>{r.num}</b>,
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
    {
      key: "ops",
      title: "操作",
      className: "whitespace-nowrap",
      render: (r) =>
        r.custom ? (
          <button className="btn btn-sm btn-danger" onClick={() => deleteItem(r.id)}>
            删除
          </button>
        ) : (
          <span style={{ color: "#567092" }}>标准</span>
        ),
    },
  ];

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid rgba(56, 189, 248, 0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
          {title} ({list.length} 种)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            className="search-input"
            placeholder="搜索设备名称/型号/用途..."
            value={kw}
            onChange={(e) => setKw(e.target.value)}
          />
          <button className="btn btn-sm btn-primary" onClick={() => setOpen(true)}>
            + 登记装备
          </button>
        </div>
      </div>
      <DataTable<EquipmentItem>
        columns={columns}
        data={filtered}
        rowKey={(r) => String(r.id)}
        emptyText="暂无装备数据"
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="登记核心施工机械装备"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>
              取消
            </button>
            <button className="btn btn-primary" onClick={save}>
              确认登记
            </button>
          </>
        }
      >
        <div className="form-grid">
          <Field label="装备名称">
            <input
              type="text"
              value={form.name}
              placeholder="如 凿岩台车"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="规格型号">
            <input
              type="text"
              value={form.model}
              placeholder="如 三臂全液压凿岩台车"
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />
          </Field>
          <Field label="配置数量">
            <input
              type="number"
              min={1}
              value={form.num}
              onChange={(e) => setForm({ ...form, num: Number(e.target.value) })}
            />
          </Field>
          <Field label="单位">
            <input
              type="text"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </Field>
          <Field label="作业部位 / 主要用途" span>
            <input
              type="text"
              value={form.pos}
              placeholder="如 洞内出渣与洞渣装车"
              onChange={(e) => setForm({ ...form, pos: e.target.value })}
            />
          </Field>
          <Field label="所属施工阶段" span>
            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Modal>

      <Toast msg={msg} />
    </div>
  );
}