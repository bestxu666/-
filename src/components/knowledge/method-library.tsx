import type { MethodCard } from "@/lib/types";

const TONE: Record<string, { color: string; border: string; dot: string; label: string }> = {
  ok: {
    color: "var(--ok)",
    border: "rgba(61,220,151,0.32)",
    dot: "var(--ok)",
    label: "推荐 I~III 级",
  },
  brand: {
    color: "var(--brand)",
    border: "rgba(45,212,191,0.34)",
    dot: "var(--brand)",
    label: "推荐 IV 级",
  },
  warn: {
    color: "var(--warn)",
    border: "rgba(247,185,85,0.34)",
    dot: "var(--warn)",
    label: "推荐 V 级 / 大变形",
  },
};

export function MethodLibrary({ title, data }: { title: string; data: MethodCard[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-3.5 rounded-[2px] bg-[var(--brand)]" />
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
              <span
                className="inline-block px-2 py-0.5 rounded text-[11px] mb-3"
                style={{ color: t.color, background: "rgba(120,165,230,0.08)", border: `1px solid ${t.border}` }}
              >
                {t.label}
              </span>

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
