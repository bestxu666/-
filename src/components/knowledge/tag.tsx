import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TagTone =
  | 'gray'
  | 'blue'
  | 'teal'
  | 'amber'
  | 'red'
  | 'green'
  | 'violet';

const TONE_CLASS: Record<TagTone, string> = {
  gray: 'bg-white/[0.06] text-ink-2',
  blue: 'bg-info-soft text-info',
  teal: 'bg-brand-soft text-brand',
  amber: 'bg-warn-soft text-warn',
  red: 'bg-danger-soft text-danger',
  green: 'bg-ok-soft text-ok',
  violet: 'bg-violet-soft text-violet',
};

interface TagProps {
  tone?: TagTone;
  children: ReactNode;
  className?: string;
}

export function Tag({ tone = 'gray', children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-[11.5px] font-medium',
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
