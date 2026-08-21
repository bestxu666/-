'use client';

import type { SchemeReport } from '@/lib/types';

interface SchemeReportViewProps {
  scheme: SchemeReport;
  onSave: () => void;
}

export function SchemeReportView({ scheme, onSave }: SchemeReportViewProps) {
  return (
    <div>
      <div className="sec-title">Step 4 · 施工智能配置方案报告</div>
      <div className="card">
        <div className="rpt-head">
          <div>
            <div className="text-[17px] font-bold text-ink">沙益1号隧道机械化施工智能配置报告</div>
            <div className="mt-0.5 text-[11.5px] text-ink-3">
              编号: <b className="text-ink">{scheme.no}</b> · 时间: {scheme.time}
            </div>
          </div>
          <div className="text-right text-[12px] text-ink-3">
            <div>
              桩号: <b className="text-ink">{scheme.mile}</b> · 围岩:{' '}
              <b className="text-brand">{scheme.grade}</b>
            </div>
            <div>
              工法: <b className="text-ink">{scheme.method}</b>
            </div>
          </div>
        </div>

        <div className="tbl-wrap mb">
          <table className="w-full min-w-[700px] border-collapse text-[12.5px]">
            <thead>
              <tr>
                {['工序环节', '设计配置参数 / 规格', '数量 / 间距', '施工工艺与组织依据'].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap border border-line bg-white/[0.04] px-2.5 py-2 text-center text-[12px] font-semibold text-ink-2"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheme.rows.map((row, i) => (
                <tr key={i} className="transition-colors hover:bg-white/[0.03]">
                  <td className="border border-white/[0.06] px-2.5 py-2 text-center text-ink">
                    {row.process}
                  </td>
                  <td
                    className="border border-white/[0.06] px-2.5 py-2 text-center text-ink"
                    dangerouslySetInnerHTML={{ __html: row.spec }}
                  />
                  <td className="border border-white/[0.06] px-2.5 py-2 text-center text-ink">
                    {row.quantity}
                  </td>
                  <td className="border border-white/[0.06] px-2.5 py-2 text-center text-ink">
                    {row.basis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center justify-center gap-1.5 rounded-[7px] bg-gradient-to-br from-[#1fb8a4] to-[#0e8f96] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_3px_14px_rgba(45,212,191,.22)] transition-transform hover:-translate-y-px hover:shadow-[0_5px_18px_rgba(45,212,191,.35)]"
          >
            保存至方案与决策台账
          </button>
        </div>
      </div>
    </div>
  );
}
