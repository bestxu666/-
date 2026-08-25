'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DataColumn<T> {
  key: string;
  title: ReactNode;
  /** 单元格渲染；默认渲染 row[key] */
  render?: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: DataColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  emptyText?: string;
}

/**
 * 通用暗色数据表格 —— 统一经验数据库各表的样式。
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyText = '暂无数据',
}: DataTableProps<T>) {
  return (
    <div className="tbl-wrap overflow-x-auto rounded-md">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr className="bg-[rgba(10,19,34,0.6)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'whitespace-nowrap border-b border-line px-3 py-2.5 text-left font-semibold text-ink-2',
                  col.headerClassName,
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-8 text-center text-ink-3"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                className="transition-colors hover:bg-white/[0.03]"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'border-b border-line/60 px-3 py-2.5 align-middle text-ink-2',
                      col.className,
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : ((row as Record<string, unknown>)[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
