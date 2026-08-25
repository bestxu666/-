import type { ReactNode } from "react";

type TagTone = "brand" | "ok" | "warn" | "danger" | "info";

const TONE_CLASS: Record<TagTone, string> = {
  brand: "text-[var(--brand)] bg-[rgba(45,212,191,0.12)] border-[rgba(45,212,191,0.28)]",
  ok: "text-[var(--ok)] bg-[rgba(61,220,151,0.12)] border-[rgba(61,220,151,0.3)]",
  warn: "text-[var(--warn)] bg-[rgba(247,185,85,0.12)] border-[rgba(247,185,85,0.3)]",
  danger: "text-[var(--danger)] bg-[rgba(248,113,113,0.12)] border-[rgba(248,113,113,0.3)]",
  info: "text-[var(--info)] bg-[rgba(90,162,248,0.12)] border-[rgba(90,162,248,0.3)]",
};

interface TagProps {
  tone?: TagTone;
  children: ReactNode;
}

export function Tag({ tone = "brand", children }: TagProps) {
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] border ${TONE_CLASS[tone]}`}>
      {children}
    </span>
  );
}
