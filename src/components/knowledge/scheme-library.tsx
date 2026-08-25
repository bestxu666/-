'use client';

import { useMemo, useState } from 'react';
import type { RockFilter, SupportScheme } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tag } from './tag';

const FILTERS: { value: RockFilter; label: string }[] = [
  { value: 'all', label: '全部围岩方案' },
  { value: 'IV', label: 'Ⅳ级围岩方案' },
  { value: 'V', label: 'Ⅴ级围岩方案' },
];

function isRockMatch(rock: string, filter: RockFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'IV') return rock.includes('Ⅳ') || rock.includes('IV');
  return rock.includes('Ⅴ') || rock.includes('V');
}

export function SchemeLibrary({ data }: { data: SupportScheme[] }) {
  const [filter, setFilter] = useState<RockFilter>('all');

  const filtered = useMemo(
    () => data.filter((d) => isRockMatch(d.rock, filter)),
    [data, filter],
  );

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel/40">
      {/* 围岩筛选条 */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              'rounded-md px-3 py-1 text-[13px] font-semibold transition-colors',
              filter === f.value
                ? 'border border-brand/40 bg-gradient-to-r from-brand/20 to-info/20 text-white'
                : 'text-ink-3 hover:text-ink',
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[11.5px] text-ink-3">
          共 <b className="text-ink tabular-nums">{filtered.length}</b> 条方案
        </span>
      </div>

      {/* 表头分组：使用 DataTable 平铺全部列，并在顶部叠加分组标题 */}
      <div className="relative">
        <div className="tbl-wrap overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-[rgba(10,19,34,0.6)]">
                <th
                  rowSpan={2}
                  className="border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2"
                >
                  方案编号
                </th>
                <th
                  rowSpan={2}
                  className="border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2"
                >
                  围岩级别
                </th>
                <th
                  rowSpan={2}
                  className="border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2"
                >
                  衬砌类型
                </th>
                <th
                  rowSpan={2}
                  className="border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2"
                >
                  埋深范围(m)
                </th>
                <th
                  colSpan={4}
                  className="border-b border-line px-3 py-2 text-center font-semibold text-brand"
                >
                  超前支护
                </th>
                <th
                  colSpan={3}
                  className="border-b border-line px-3 py-2 text-center font-semibold text-info"
                >
                  初期支护
                </th>
                <th
                  colSpan={2}
                  className="border-b border-line px-3 py-2 text-center font-semibold text-violet"
                >
                  二次衬砌
                </th>
                <th
                  colSpan={3}
                  className="border-b border-line px-3 py-2 text-center font-semibold text-warn"
                >
                  开挖工法
                </th>
              </tr>
              <tr className="bg-[rgba(10,19,34,0.45)]">
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  类型规格
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  环向间距
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  单根长
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  适用范围
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  系统锚杆(横×纵)
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  钢拱架型号/间距
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  喷射混凝土
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  混凝土标号
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  厚度
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  开挖模式
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  循环进尺
                </th>
                <th className="border-b border-line px-3 py-2 text-left text-[11.5px] font-medium text-ink-3">
                  台阶长度
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={16}
                    className="px-3 py-8 text-center text-ink-3"
                  >
                    暂无匹配方案
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.no}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="border-b border-line/60 px-3 py-2.5 text-center tabular-nums text-ink-2">
                      {row.no}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5">
                      <Tag tone={row.rock.includes('Ⅴ') ? 'amber' : 'teal'}>
                        {row.rock}
                      </Tag>
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap">
                      <b className="text-brand">{row.type}</b>
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.depth}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 text-ink-2">
                      {row.advType}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.advRing}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.advLen}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 text-ink-2">
                      {row.advScope}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.anchor}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap">
                      <b className="text-ink">{row.steel}</b>
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.shot}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.conc}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 text-ink-2">
                      {row.thick}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap">
                      <b className="text-info">{row.mode}</b>
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.advRate}
                    </td>
                    <td className="border-b border-line/60 px-3 py-2.5 whitespace-nowrap text-ink-2">
                      {row.benchLen}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
