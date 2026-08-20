'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { key: 'overview', label: '系统总览' },
  { key: 'decision', label: '智能决策中心' },
  { key: 'equipment', label: '机械装备与工效' },
  { key: 'methods', label: '标准工法库' },
  { key: 'support', label: '支护体系与优选库' },
  { key: 'scheme', label: '方案报告与决策台账' },
];

const SYSTEM_NAME = '钻爆法隧道全工序机械化施工智能配置系统';

function formatTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}

function BrandLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[30px] w-[30px] shrink-0"
      aria-hidden
    >
      <path
        d="M4 18.5A9 9 0 0 1 20 18.5"
        fill="none"
        stroke="#062c27"
        strokeWidth="1.7"
      />
      <path
        d="M2 21h20M6.5 18.5v-3M17.5 18.5v-3M12 18.5V9"
        fill="none"
        stroke="#062c27"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TopBar() {
  const [clock, setClock] = useState('--:--:--');
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const update = () => setClock(formatTime(new Date()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-line bg-panel/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1600px] items-center gap-6 px-6">
        {/* 品牌区 */}
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-cy shadow-sm">
            <BrandLogo />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-semibold text-ink">
              {SYSTEM_NAME}
            </div>
            <div className="hidden truncate text-[10.5px] tracking-wide text-ink-3 xl:block">
              DRILL-BLAST TUNNEL FULL-PROCESS MECHANIZED CONSTRUCTION
            </div>
          </div>
        </div>

        {/* 导航 */}
        <nav className="flex h-full flex-1 items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={
                  'relative flex h-full shrink-0 items-center px-3 text-[13.5px] transition-colors ' +
                  (isActive
                    ? 'font-semibold text-brand'
                    : 'text-ink-2 hover:text-ink')
                }
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-brand" />
                )}
              </button>
            );
          })}
        </nav>

        {/* 运行状态 + 时钟 */}
        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-1.5 text-[12px] text-ink-2 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            配置系统运行正常
          </div>
          <div className="hidden text-right text-[12.5px] tabular-nums text-ink-3 sm:block">
            {clock}
          </div>
        </div>
      </div>
    </header>
  );
}