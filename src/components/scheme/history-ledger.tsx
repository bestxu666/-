'use client';

import { Fragment, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { HistoryRecord } from '@/lib/types';
import { Field, Modal, Toast, useBriefToast } from '@/components/knowledge/modal';
import { createSchemeHistory, deleteSchemeHistory, fetchSchemeHistory, importSchemeHistory } from '@/lib/api';

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

const ROCK_OPTS = ['Ⅳ级', 'Ⅳ级(加强)', 'Ⅴ级', 'Ⅴ级(深埋)'];
const METHOD_OPTS = ['台阶法', '预留核心土法', '全断面法', '双侧壁导坑法'];

/**
 * 历史决策台账：起止日期 + 工作面筛选，决策记录表，点击 [+] 展开单次决策全参数明细；
 * 支持新增记录与 JSON 批量导入。
 */
export function HistoryLedger({ faces, records: seed }: HistoryLedgerProps) {
  const { msg, show } = useBriefToast();
  // 本地可变台账（新增/导入/删除仅内存生效，刷新回种子，与参考行为一致）
  const [rows, setRows] = useState<HistoryRecord[]>(seed);
  const [start, setStart] = useState('2026-08-01');
  const [end, setEnd] = useState('2026-08-19');
  const faceOptions = ['全部工作面', ...faces.filter((f) => f && f !== '全部工作面')];
  const [face, setFace] = useState(faceOptions[0]);
  // 已应用的筛选条件（点击「查询」后才生效）
  const [applied, setApplied] = useState({ start, end, face });
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [form, setForm] = useState({
    time: '2026-08-20 10:00:00',
    face: faceOptions[1] ?? '',
    mile: '',
    rock: 'Ⅳ级',
    method: METHOD_OPTS[0],
    type: '',
    score: 90,
    detail: '',
  });

  const list = useMemo(() => {
    return rows.filter((r) => {
      const d = datePart(r.time);
      if (applied.start && d < applied.start) return false;
      if (applied.end && d > applied.end) return false;
      if (applied.face && applied.face !== '全部工作面' && r.face !== applied.face) {
        return false;
      }
      return true;
    });
  }, [rows, applied]);

  function applyFilter() {
    setApplied({ start, end, face });
    setExpanded(new Set());
  }

  function resetFilter() {
    const s = '2026-08-01';
    const e = '2026-08-19';
    const f = faceOptions[0];
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

  async function deleteRow(id: number) {
    try {
      await deleteSchemeHistory(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
      show('已删除决策记录');
    } catch (e) {
      show((e as Error).message || '删除失败');
    }
  }

  async function saveNew() {
    if (!form.mile.trim() || !form.type.trim()) {
      show('里程桩号与衬砌类型不能为空');
      return;
    }
    try {
      const item = await createSchemeHistory({
        time: form.time,
        face: form.face || faceOptions[1] || '',
        mile: form.mile.trim(),
        rock: form.rock,
        method: form.method,
        type: form.type.trim(),
        score: Math.max(0, Math.min(100, Number(form.score) || 0)),
        detail: form.detail.trim() || '人工录入手动推演方案（无智能推荐明细）',
      });
      setRows((prev) => [...prev, { ...item, custom: true }]);
      setOpenAdd(false);
      setForm((f) => ({ ...f, mile: '', type: '', detail: '' }));
      show('已新增决策记录');
    } catch (e) {
      show((e as Error).message || '新增失败');
    }
  }

  async function applyImport() {
    try {
      const arr = JSON.parse(importText);
      if (!Array.isArray(arr) || arr.length === 0) {
        show('请粘贴 JSON 数组');
        return;
      }
      const count = await importSchemeHistory(arr);
      const fresh = await fetchSchemeHistory();
      setRows(fresh.records);
      setOpenImport(false);
      setImportText('');
      show(`已导入 ${count} 条决策记录`);
    } catch (e) {
      show((e as Error).message || '导入失败，请检查 JSON 格式');
    }
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <button className="btn btn-sm btn-ghost" onClick={() => setOpenImport(true)}>
          导入
        </button>
        <button className="btn btn-sm btn-primary" onClick={() => setOpenAdd(true)}>
          + 新增记录
        </button>
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
              {faceOptions.map((f) => (
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
          <span className="ml-auto hidden text-[11.5px] text-ink-3 md:inline">
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
                <th className="whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-3 py-8 text-center text-ink-3">
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
                          <b className="font-semibold text-ink">
                            {h.type}
                            {h.custom && (
                              <span className="tag tag-teal" style={{ marginLeft: 4 }}>
                                新增
                              </span>
                            )}
                          </b>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <b className="font-semibold text-ok tabular-nums">{h.score}</b>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          {h.custom ? (
                            <button className="btn btn-sm btn-danger" onClick={() => deleteRow(h.id)}>
                              删除
                            </button>
                          ) : (
                            <span style={{ color: '#567092' }}>入库</span>
                          )}
                        </td>
                      </tr>
                      {open && (
                        <tr className="border-b border-line/40 bg-[rgba(45,212,191,0.04)]">
                          <td colSpan={10} className="px-3 py-3 text-left align-top text-[12px] leading-[1.7] text-ink-2">
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

      {/* 新增决策记录 */}
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        title="新增历史决策记录"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setOpenAdd(false)}>
              取消
            </button>
            <button className="btn btn-primary" onClick={saveNew}>
              确认新增
            </button>
          </>
        }
      >
        <div className="form-grid">
          <Field label="决策时间">
            <input type="text" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          </Field>
          <Field label="隧道工作面">
            <select value={form.face} onChange={(e) => setForm({ ...form, face: e.target.value })}>
              {faceOptions.filter((f) => f !== '全部工作面').map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Field>
          <Field label="开挖里程桩号">
            <input type="text" value={form.mile} placeholder="如 K3601+200" onChange={(e) => setForm({ ...form, mile: e.target.value })} />
          </Field>
          <Field label="围岩级别">
            <select value={form.rock} onChange={(e) => setForm({ ...form, rock: e.target.value })}>
              {ROCK_OPTS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="开挖工法">
            <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
              {METHOD_OPTS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="衬砌类型">
            <input type="text" value={form.type} placeholder="如 S4a" onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </Field>
          <Field label="安全度评分(0~100)">
            <input type="number" min={0} max={100} value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} />
          </Field>
          <Field label="单次决策配置明细" span>
            <textarea rows={3} value={form.detail} placeholder="超前支护、初支、装备调度等配置参数摘要" onChange={(e) => setForm({ ...form, detail: e.target.value })} />
          </Field>
        </div>
      </Modal>

      {/* 批量导入 JSON */}
      <Modal
        open={openImport}
        onClose={() => setOpenImport(false)}
        title="批量导入决策记录（JSON 数组）"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setOpenImport(false)}>
              取消
            </button>
            <button className="btn btn-primary" onClick={applyImport}>
              确认导入
            </button>
          </>
        }
      >
        <textarea
          style={{ width: '100%', minHeight: 220, fontFamily: 'monospace', fontSize: 11.5 }}
          placeholder='[{"time":"2026-08-20 09:00:00","face":"沙益1号隧道主洞掌子面","mile":"K3601+300","rock":"Ⅳ级","method":"台阶法","type":"S4a","score":91.0,"detail":"..."}]'
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: '#7189a8' }}>
          支持字段：time / face / mile / rock / method / type / score / detail
        </div>
      </Modal>

      <Toast msg={msg} />
    </section>
  );
}