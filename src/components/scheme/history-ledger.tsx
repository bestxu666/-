'use client';

import { Fragment, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { HistoryRecord } from '@/lib/types';

interface HistoryLedgerProps {
  title: string;
  subtitle: string;
  faces: string[];
  records: HistoryRecord[];
}

/** 取 "YYYY-MM-DD HH:mm:ss" 的日期部分用于范围比较 */
function datePart(time: string): string {
  return time.slice(0, 10);
}

function RockTag({ rock }: { rock: string }) {
  const isFour = rock.includes('Ⅳ');
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 text-[11px]',
        isFour ? 'bg-brand/15 text-brand' : 'bg-warn/15 text-warn',
      )}
    >
      {rock}
    </span>
  );
}

/**
 * 历史决策台账：起止日期 + 工作面筛选，决策记录表，点击 [+] 展开单次决策全参数明细。
 */
export function HistoryLedger({ title, subtitle, faces, records }: HistoryLedgerProps) {
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-19');
  const [face, setFace] = useState(faces[0] ?? '全部工作面');
  // 已应用的筛选条件（点击「查询」后才生效）
  const [applied, setApplied] = useState({ start, end, face });
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const list = useMemo(() => {
    return records.filter((r) => {
      const d = datePart(r.time);
      if (applied.start && d < applied.start) return false;
      if (applied.end && d > applied.end) return false;
      if (applied.face && applied.face !== '全部工作面' && r.face !== applied.face) {
        return false;
      }
      return true;
    });
  }, [records, applied]);

  function applyFilter() {
    setApplied({ start, end, face });
    setExpanded(new Set());
  }

  function resetFilter() {
    const s = '2026-08-01';
    const e = '2026-08-19';
    const f = faces[0] ?? '全部工作面';
    setStart(s);
    setEnd(e);
    setFace(f);
    setApplied({ start: s, end: e, face: f });
    setExpanded(new Set());
  }

  function toggle(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <span className="inline-block h-4 w-1.5 rounded-[2px] bg-info" />
            {title}
          </h2>
          <p className="ml-3.5 mt-1 text-[12.5px] text-ink-3">{subtitle}</p>
        </div>
        <span className="inline-flex items-center rounded-md border border-info/30 bg-info/10 px-2.5 py-1 text-[11.5px] font-medium text-info">
          历史决策可追溯
        </span>
      </div>

      <div className="card overflow-hidden p-0">
        {/* 筛选栏 */}
        <div
          className="flex flex-wrap items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid var(--line)', background: 'rgba(255,255,255,.02)' }}
        >
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <span>决策时间:</span>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="rounded border border-line bg-panel px-2 py-1 text-[12px] text-ink outline-none focus:border-brand"
            />
            <span>至</span>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="rounded border border-line bg-panel px-2 py-1 text-[12px] text-ink outline-none focus:border-brand"
            />
          </label>
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <span>隧道工作面:</span>
            <select
              value={face}
              onChange={(e) => setFace(e.target.value)}
              className="rounded border border-line bg-panel px-2 py-1 text-[12px] text-ink outline-none focus:border-brand"
            >
              {faces.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={applyFilter}
            className="rounded-md bg-brand px-3 py-1 text-[12px] font-medium text-[#06281f] transition-colors hover:brightness-110"
          >
            查询
          </button>
          <button
            type="button"
            onClick={resetFilter}
            className="rounded-md border border-line bg-transparent px-3 py-1 text-[12px] text-ink-2 transition-colors hover:border-brand/40 hover:text-ink"
          >
            重置
          </button>
          <span className="ml-auto text-[11.5px] text-ink-3">
            点击序号左侧 [+] 展开查看超前支护、钢架间距与机械调度明细
          </span>
        </div>

        {/* 记录表 */}
        <div className="tbl-wrap overflow-x-auto rounded-md">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-[rgba(10,19,34,0.6)]">
                <th className="w-[52px] whitespace-nowrap border-b border-line px-3 py-2.5 text-center font-semibold text-ink-2">
                  展开
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  序号
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  决策时间
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  隧道工作面
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  开挖里程
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  围岩
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  开挖工法
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  衬砌类型
                </th>
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  安全度
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-ink-3">
                    当前筛选条件下暂无决策记录
                  </td>
                </tr>
              ) : (
                list.map((h) => {
                  const open = expanded.has(h.id);
                  return (
                    <Fragment key={h.id}>
                      <tr className="border-b border-line/60 transition-colors last:border-0 hover:bg-white/[0.03]">
                        <td className="px-3 py-2.5 text-center align-middle">
                          <button
                            type="button"
                            onClick={() => toggle(h.id)}
                            className="rounded border border-line bg-transparent px-1.5 py-0.5 text-[11px] text-ink-2 transition-colors hover:border-brand/40 hover:text-brand"
                            aria-label={open ? '收起明细' : '展开明细'}
                          >
                            {open ? '[-]' : '[+]'}
                          </button>
                        </td>
                        <td className="px-3 py-2.5 align-middle text-ink-2 tabular-nums">
                          {h.id}
                        </td>
                        <td className="px-3 py-2.5 align-middle text-[11.5px] text-ink-3 tabular-nums">
                          {h.time}
                        </td>
                        <td className="px-3 py-2.5 text-left align-middle">
                          <b className="font-medium text-ink">{h.face}</b>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <b className="font-semibold text-brand tabular-nums">{h.mile}</b>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <RockTag rock={h.rock} />
                        </td>
                        <td className="px-3 py-2.5 align-middle text-ink-2">{h.method}</td>
                        <td className="px-3 py-2.5 align-middle">
                          <b className="font-semibold text-ink">{h.type}</b>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <b className="font-semibold text-ok tabular-nums">{h.score}</b>
                        </td>
                      </tr>
                      {open && (
                        <tr className="border-b border-line/40 bg-[rgba(45,212,191,0.04)]">
                          <td colSpan={9} className="px-3 py-3 text-left align-top text-[12px] leading-[1.7] text-ink-2">
                            <b className="text-brand">【单次决策完整配置参数】</b> {h.detail}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
