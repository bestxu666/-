import { fetchKnowledge } from '@/lib/api';
import { TopBar } from '@/components/overview/top-bar';
import { EquipmentTable } from '@/components/knowledge/equipment-table';
import { MethodLibrary } from '@/components/knowledge/method-library';
import { MappingTable } from '@/components/knowledge/mapping-table';
import { SchemeLibrary } from '@/components/knowledge/scheme-library';

export const dynamic = 'force-dynamic';

export default async function KnowledgePage() {
  const data = await fetchKnowledge();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <TopBar />
      <main className="mx-auto max-w-[1600px] px-6 pb-16 pt-[76px]">
        {/* 页面头部 */}
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2.5 text-[21px] font-bold tracking-wide">
              <span
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'rgba(247,185,85,.14)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f7b955" strokeWidth="2" aria-hidden>
                  <path d="M9 3h6v4h4v6h-4v4H9v-4H5V7h4V3z" />
                  <path d="M9 17v4M15 17v4M5 21h14" />
                </svg>
              </span>
              经验数据库
            </h1>
          </div>
        </div>

        <div className="space-y-5">
          <EquipmentTable title={data.equipmentTitle} tag="配置台账" data={data.equipment} />
          <MethodLibrary title={data.methodTitle} data={data.methods} />
          <MappingTable title={data.mappingTitle} tag="规则映射" data={data.mappings} />
          <SchemeLibrary title={data.schemeTitle} data={data.schemes} />
        </div>
      </main>
    </div>
  );
}
