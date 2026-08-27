import type { MethodCard } from "@/lib/types";

const TONE: Record<string, { color: string }> = {
  ok: { color: "#10b981" },
  brand: { color: "#00d2be" },
  warn: { color: "#f59e0b" },
};

export function MethodLibrary({ data }: { title?: string; data: MethodCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {data.map((m) => {
        const t = TONE[m.tone] ?? TONE.brand;
        return (
          <div
            key={m.name}
            className="card"
            style={{ borderTop: `3px solid ${t.color}` }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: t.color, marginBottom: 4 }}>
              {m.name}
            </div>
            <div style={{ fontSize: "11.5px", color: "#94a9c9", marginBottom: 6 }}>
              <b>适用地质：</b>
              {m.geology}
            </div>
            <div style={{ fontSize: 11, color: "#567092", lineHeight: 1.7 }}>
              <div>开挖断面: {m.section}</div>
              <div>工法优势: {m.advantage}</div>
              <div>核心装备: {m.equipment}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
