import { fetchOverview } from '@/lib/api';
import { AchievementBoard } from '@/components/overview/achievement-board';
import { ChartsSection } from '@/components/overview/charts-section';
import { LongitudinalStrip } from '@/components/overview/longitudinal-strip';
import { OverviewHeader } from '@/components/overview/overview-header';
import { ProjectPanel } from '@/components/overview/project-panel';
import { SupportKpiGrid } from '@/components/overview/support-kpi-grid';
import { TopBar } from '@/components/overview/top-bar';

export default async function HomePage() {
  const data = await fetchOverview();

  return (
    <>
      <TopBar />
      <main className="px-4 pb-16 pt-[76px] sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
          <OverviewHeader
            title={data.title}
            subtitle={data.subtitle}
            badges={data.badges}
          />

          <AchievementBoard
            achievementTitle={data.achievementTitle}
            achievementTag={data.achievementTag}
            achievements={data.achievements}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
            <ProjectPanel projects={data.projects} />

            <div className="flex min-w-0 flex-col gap-4">
              <LongitudinalStrip tunnel={data.tunnel} />
              <SupportKpiGrid supportKpis={data.supportKpis} />
              <ChartsSection charts={data.charts} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}