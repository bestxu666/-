import type { ReactNode } from 'react';

interface SectionTitleProps {
  icon?: ReactNode;
  title: string;
  /** 右上角附加内容（如标签/数量） */
  extra?: ReactNode;
}

/** 板块标题：图标 + 标题，与参考原型 page-head 风格一致 */
export function SectionTitle({ icon, title, extra }: SectionTitleProps) {
  return (
    <div className="mb-3 mt-6 flex items-center justify-between gap-3 first:mt-0">
      <h2 className="flex items-center gap-2.5 text-[16px] font-bold text-ink">
        {icon}
        {title}
      </h2>
      {extra}
    </div>
  );
}
