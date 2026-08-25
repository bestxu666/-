import type { MethodCard } from '@/lib/types';
import { cn } from '@/lib/utils';

const TONE: Record<MethodCard['tone'], { border: string; text: string }> = {
  ok: { border: 'border-t-ok', text: 'text-ok' },
  brand: { border: 'border-t-brand', text: 'text-brand' },
  warn: { border: 'border-t-warn', text: 'text-warn' },
};

const ROW_LABEL: Record<string, string> = {
  section: '开挖断面',
  advantage: '工法优势',
  equipment: '核心装备',
};

export function MethodLibrary({ methods }: { methods: MethodCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {methods.map((m) => {
        const tone = TONE[m.tone];
        return (
          <div
            key={m.name}
            className={cn(
              'rounded-lg border border-t-[3px] border-line bg-panel/40 p-4 transition-transform hover:-translate-y-0.5',
              tone.border,
            )}
          >
            <div
              className={cn(
                'mb-1.5 text-[14.5px] font-bold',
                tone.text,
              )}
            >
              {m.name}
            </div>
            <div className="mb-2 text-[12px] leading-relaxed text-ink-2">
              <b className="text-ink-3">适用地质：</b>
              {m.geology}
            </div>
            <ul className="space-y-1.5 text-[12px] leading-relaxed text-ink-3">
              {([
                ['section', m.section],
                ['advantage', m.advantage],
                ['equipment', m.equipment],
              ] as const).map(([key, val]) => (
                <li key={key}>
                  <span className="text-ink-3/70">{ROW_LABEL[key]}: </span>
                  {val}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
