import type { MethodCard } from "@/lib/types";

const TONE: Record<string, { color: string; border: string; dot: string }> = {
  ok: {
    color: "var(--ok)",
    border: "rgba(61,220,151,0.32)",
    dot: "var(--ok)",
  },
  brand: {
    color: "var(--brand)",
    border: "rgba(45,212,191,0.34)",
    dot: "var(--brand)",
  },
  warn: {
    color: "var(--warn)",
    border: "rgba(247,185,85,0.34)",
    dot: "var(--warn)",
  },
};

export function MethodLibrary({ title, data }: { title: string; data: MethodCard[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
          style={{ background: "rgba(90,162,248,.12)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5aa2f8" strokeWidth="2" aria-hidden>
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
          </svg>
        </span>
        <h3 className="m-0 text-[15px] font-semibold text-[var(--text)] tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.map((m) => {
          const t = TONE[m.tone] ?? TONE.brand;
          return (
            <div
              key={m.name}
              className="card p-4 hover:-translate-y-0.5 transition-transform"
              style={{ borderColor: t.border }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ background: t.dot, boxShadow: `0 0 8px ${t.dot}` }} />
                <h4 className="m-0 text-[15px] font-semibold" style={{ color: t.color }}>
                  {m.name}
                </h4>
              </div>
              <Row label="适用地质" value={m.geology} />
              <Row label="开挖断面" value={m.section} />
              <Row label="工法优势" value={m.advantage} />
              <Row label="核心装备" value={m.equipment} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-[12.5px] leading-relaxed mb-1.5">
      <span className="shrink-0 w-16 text-[var(--text-3)]">{label}</span>
      <span className="text-[var(--text-2)]">{value}</span>
    </div>
  );
}
