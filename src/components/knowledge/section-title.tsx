import type { ReactNode } from "react";

interface SectionTitleProps {
  icon?: ReactNode;
  title: string;
  tag?: string;
}

/** 经验数据库板块标题（小青色方块图标 + 标题 + 可选徽章） */
export function SectionTitle({ icon, title, tag }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon ?? <span className="inline-block w-2 h-3.5 rounded-[2px] bg-[var(--brand)]" />}
      <h3 className="m-0 text-[15px] font-semibold text-[var(--text)] tracking-wide">{title}</h3>
      {tag ? (
        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-[var(--brand)] bg-[rgba(45,212,191,0.1)] border border-[rgba(45,212,191,0.25)]">
          {tag}
        </span>
      ) : null}
    </div>
  );
}
