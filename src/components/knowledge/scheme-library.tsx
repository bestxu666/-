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
          <span className="inline-block w-2 h-3.5 rounded-[2px] bg-[var(--brand)]" />
          <h3 className="m-0 text-[15px] font-semibold text-[var(--text)] tracking-wide">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>全部围岩方案</FilterBtn>
          <FilterBtn active={filter === "IV"} onClick={() => setFilter("IV")}>Ⅳ级围岩方案</FilterBtn>
          <FilterBtn active={filter === "V"} onClick={() => setFilter("V")}>Ⅴ级围岩方案</FilterBtn>
        </div>
      </div>

      <div className="card p-0 overflow-x-auto">
        <table className="w-full border-collapse text-[12px] min-w-[1100px]">
          <thead>
            <tr className="text-[var(--text-3)] text-left">
              <th rowSpan={2} className="px-3 py-2.5 font-semibold whitespace-nowrap border-b border-r border-[var(--line)]">方案编号</th>
              <th rowSpan={2} className="px-3 py-2.5 font-semibold whitespace-nowrap border-b border-r border-[var(--line)]">围岩级别</th>
              <th rowSpan={2} className="px-3 py-2.5 font-semibold whitespace-nowrap border-b border-r border-[var(--line)]">衬砌类型</th>
              <th rowSpan={2} className="px-3 py-2.5 font-semibold whitespace-nowrap border-b border-r border-[var(--line)]">埋深范围(m)</th>
              <th colSpan={4} className="px-3 py-2 text-center font-semibold whitespace-nowrap border-b border-r border-[var(--line)] text-[var(--brand)]">超前支护</th>
              <th colSpan={3} className="px-3 py-2 text-center font-semibold whitespace-nowrap border-b border-r border-[var(--line)] text-[var(--info)]">初期支护</th>
              <th colSpan={2} className="px-3 py-2 text-center font-semibold whitespace-nowrap border-b border-r border-[var(--line)] text-[var(--violet)]">二次衬砌</th>
              <th colSpan={3} className="px-3 py-2 text-center font-semibold whitespace-nowrap border-b border-[var(--line)] text-[var(--ok)]">开挖工法</th>
            </tr>
            <tr className="text-[var(--text-3)] text-left text-[11px]">
              <SubHead>类型规格</SubHead><SubHead>环向间距</SubHead><SubHead>单根长</SubHead><SubHead last>适用范围</SubHead>
              <SubHead>系统锚杆 (横×纵)</SubHead><SubHead>钢拱架型号/间距</SubHead><SubHead last>喷射混凝土</SubHead>
              <SubHead>混凝土标号</SubHead><SubHead last>厚度</SubHead>
              <SubHead>开挖模式</SubHead><SubHead>循环进尺</SubHead><SubHead last>台阶长度</SubHead>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.no} className="hover:bg-[rgba(45,212,191,0.05)] transition-colors">
                <Td className="text-center text-[var(--text-3)]">{s.no}</Td>
                <Td className="text-center">
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] border"
                    style={{
                      color: s.rock.startsWith("Ⅴ") ? "var(--warn)" : "var(--info)",
                      borderColor: s.rock.startsWith("Ⅴ") ? "rgba(247,185,85,0.3)" : "rgba(90,162,248,0.3)",
                    }}
                  >
                    {s.rock}
                  </span>
                </Td>
                <Td className="font-semibold text-[var(--text)]">{s.type}</Td>
                <Td className="text-center text-[var(--text-2)] tabular-nums">{s.depth}</Td>
                <TdBrand>{s.advType}</TdBrand><TdBrand>{s.advRing}</TdBrand><TdBrand>{s.advLen}</TdBrand><TdBrand last>{s.advScope}</TdBrand>
                <TdInfo>{s.anchor}</TdInfo><TdInfo>{s.steel}</TdInfo><TdInfo last>{s.shot}</TdInfo>
                <TdViolet>{s.conc}</TdViolet><TdViolet last>{s.thick}</TdViolet>
                <TdOk>{s.mode}</TdOk><TdOk>{s.advRate}</TdOk><TdOk last>{s.benchLen}</TdOk>
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
    <button
      onClick={onClick}
      className="px-3 py-1 rounded text-[12px] font-medium transition-all border"
      style={
        active
          ? { background: "linear-gradient(135deg,rgba(45,212,191,.2),rgba(90,162,248,.2))", color: "#fff", borderColor: "rgba(45,212,191,.35)" }
          : { background: "transparent", color: "var(--text-3)", borderColor: "transparent" }
      }
    >
      {children}
    </button>
  );
}

function SubHead({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <th className={`px-2 py-1.5 font-medium whitespace-nowrap border-b ${last ? "" : "border-r"} border-[var(--line)]`}>{children}</th>;
}

function Td({ children, className = "", last }: { children: React.ReactNode; className?: string; last?: boolean }) {
  return <td className={`px-3 py-2 whitespace-nowrap border-b ${last ? "" : "border-r"} border-[var(--line)] ${className}`}>{children}</td>;
}

function cellBase(last: boolean | undefined, color: string) {
  return `px-2 py-2 whitespace-nowrap border-b ${last ? "" : "border-r"} border-[var(--line)] text-center ${color} text-[11.5px]`;
}
function TdBrand({ children, last }: { children: React.ReactNode; last?: boolean }) { return <td className={cellBase(last, "text-[var(--brand)]")}>{children}</td>; }
function TdInfo({ children, last }: { children: React.ReactNode; last?: boolean }) { return <td className={cellBase(last, "text-[var(--info)]")}>{children}</td>; }
function TdViolet({ children, last }: { children: React.ReactNode; last?: boolean }) { return <td className={cellBase(last, "text-[var(--violet)]")}>{children}</td>; }
function TdOk({ children, last }: { children: React.ReactNode; last?: boolean }) { return <td className={cellBase(last, "text-[var(--ok)]")}>{children}</td>; }
