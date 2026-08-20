import type { ProjectInfo } from '@/lib/types';

function ProjectItem({ project }: { project: ProjectInfo }) {
  return (
    <div className="rounded-lg border border-line bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13px] font-semibold text-ink">
              {project.name}
            </span>
            <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] text-brand">
              {project.badge}
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-ink-3">{project.sub}</div>
        </div>
        <span className="shrink-0 text-[12px] tabular-nums text-ok">
          {project.progress}%
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-info-soft px-2 py-0.5 text-[10.5px] text-info"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <div className="text-ink-3">起讫桩号</div>
          <div className="text-ink-2 tabular-nums">{project.chainage}</div>
        </div>
        <div>
          <div className="text-ink-3">隧道里程</div>
          <div className="text-ink-2">{project.length}</div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-ink-3">开挖进度</span>
          <span className="tabular-nums text-ink-2">{project.progress}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-info to-cy"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-[10.5px] text-ink-3">
          <span>已贯通</span>
          <span>
            已掘进 {project.excavated} · 剩余 {project.remaining}
          </span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  projects: ProjectInfo[];
}

export function ProjectPanel({ projects }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[13.5px] font-semibold text-ink">示范工程配置应用</span>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] text-brand">
          G318 线
        </span>
      </div>
      <div className="space-y-2.5">
        {projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}