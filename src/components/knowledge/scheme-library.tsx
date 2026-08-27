"use client";

import { useState } from "react";
import type { SupportScheme } from "@/lib/types";

type Filter = "all" | "IV" | "V";

const ROCK_CHAR: Record<Filter, string> = { all: "", IV: "Ⅳ", V: "Ⅴ" };

export function SchemeLibrary({ title, data }: { title: string; data: SupportScheme[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const list =
    filter === "all" ? data : data.filter((s) => s.rock.includes(ROCK_CHAR[filter]));

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
        <div className="db-tab-bar">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>
            全部方案 ({data.length})
          </FilterBtn>
          <FilterBtn active={filter === "IV"} onClick={() => setFilter("IV")}>
            Ⅳ 级围岩方案
          </FilterBtn>
          <FilterBtn active={filter === "V"} onClick={() => setFilter("V")}>
            Ⅴ 级围岩方案
          </FilterBtn>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{title}</div>
      </div>
      <div className="tbl-wrap">
        <table className="tbl" style={{ minWidth: 1100 }}>
          <thead>
            <tr>
              <th rowSpan={2}>方案编号</th>
              <th rowSpan={2}>围岩级别</th>
              <th rowSpan={2}>衬砌类型</th>
              <th rowSpan={2}>埋深范围(m)</th>
              <th colSpan={4}>超前支护</th>
              <th colSpan={3}>初期支护</th>
              <th colSpan={2}>二次衬砌</th>
              <th colSpan={3}>开挖工法</th>
            </tr>
            <tr>
              <th>类型规格</th><th>环向间距</th><th>单根长</th><th>适用范围</th>
              <th>系统锚杆(横×纵)</th><th>钢拱架型号/间距</th><th>喷射混凝土</th>
              <th>标号</th><th>厚度</th>
              <th>开挖模式</th><th>循环进尺</th><th>台阶长度</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.no}>
                <td style={{ color: "#94a9c9" }} className="tabular-nums">{s.no}</td>
                <td>
                  <span className={`tag ${s.rock.startsWith("Ⅴ") ? "tag-amber" : "tag-teal"}`}>
                    {s.rock}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{s.type}</td>
                <td className="tabular-nums">{s.depth}</td>
                <td>{s.advType}</td><td>{s.advRing}</td><td>{s.advLen}</td><td>{s.advScope}</td>
                <td>{s.anchor}</td><td>{s.steel}</td><td>{s.shot}</td>
                <td>{s.conc}</td><td>{s.thick}</td>
                <td>{s.mode}</td><td>{s.advRate}</td><td>{s.benchLen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <span className={`db-tab-btn ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </span>
  );
}
