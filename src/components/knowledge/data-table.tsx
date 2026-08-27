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
 * 通用暗色数据表格 —— 统一经验数据库各表的样式（照搬 123 的 .tbl）。
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyText = '暂无数据',
}: DataTableProps<T>) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn(col.headerClassName)}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={rowKey(row, index)}>
                {columns.map((col) => (
                  <td key={col.key} className={cn(col.className)}>
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
