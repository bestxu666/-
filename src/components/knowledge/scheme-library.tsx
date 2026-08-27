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
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
            style={{ background: "rgba(167,139,250,.12)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" aria-hidden>
              <path d="M12 3l2 5 5 .5-3.8 3.4L16.5 17 12 14.3 7.5 17l1.3-5.1L5 8.5 10 8l2-5z" />
            </svg>
          </span>
          <h3 className="m-0 text-[15px] font-semibold text-ink tracking-wide">{title}</h3>
        </div>
        <div className="db-tab-bar">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>全部围岩方案</FilterBtn>
          <FilterBtn active={filter === "IV"} onClick={() => setFilter("IV")}>Ⅳ级围岩方案</FilterBtn>
          <FilterBtn active={filter === "V"} onClick={() => setFilter("V")}>Ⅴ级围岩方案</FilterBtn>
        </div>
      </div>

      <div className="card p-0 overflow-x-auto">
        <table className="tbl min-w-[1100px]">
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
              <th>系统锚杆 (横×纵)</th><th>钢拱架型号/间距</th><th>喷射混凝土</th>
              <th>混凝土标号</th><th>厚度</th>
              <th>开挖模式</th><th>循环进尺</th><th>台阶长度</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.no}>
                <td className="!text-[#94a9c9] tabular-nums">{s.no}</td>
                <td>
                  <span className={`tag ${s.rock.startsWith("Ⅴ") ? "tag-amber" : "tag-teal"}`}>
                    {s.rock}
                  </span>
                </td>
                <td className="font-semibold !text-white">{s.type}</td>
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
    <div className={`db-tab-btn ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}
