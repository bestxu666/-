import { TopBar } from '@/components/overview/top-bar';
import { EquipmentTable } from '@/components/knowledge/equipment-table';
import { MappingTable } from '@/components/knowledge/mapping-table';
import { MethodLibrary } from '@/components/knowledge/method-library';
import { SchemeLibrary } from '@/components/knowledge/scheme-library';
import { SectionTitle } from '@/components/knowledge/section-title';
import { fetchKnowledge } from '@/lib/api';

function EquipIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-warn-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f7b955" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4h4v6h-4v4H9v-4H5V7h4V3z" />
        <path d="M9 17v4M5 21h14" />
      </svg>
    </span>
  );
}

function MethodIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-info-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5aa2f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
      </svg>
    </span>
  );
}

function SupportIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-soft">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2 5 5 .5-3.8 3.4L16.5 17 12 14.3 7.5 17l1.3-5.1L5 8.5 10 8l2-5z" />
      </svg>
    </span>
  );
}

export const metadata = {
  title: '经验数据库 · 钻爆法隧道智能配置系统',
};

export default async function KnowledgePage() {
  const data = await fetchKnowledge();

  return (
    <>
      <TopBar />
      <main className="px-4 pb-16 pt-[76px] sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2">
          {/* 1. 施工装备配置 */}
          <SectionTitle
            icon={<EquipIcon />}
            title="施工装备配置"
            extra={
              <span className="rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] text-warn">
                9 种核心装备
              </span>
            }
          />
          <div className="sec-title" style={{ margin: '0 0 8px' }}>
            {data.equipmentTitle}
          </div>
          <EquipmentTable data={data.equipment} />

          {/* 2. 标准工法库 */}
          <SectionTitle
            icon={<MethodIcon />}
            title={data.methodTitle}
            extra={
              <span className="rounded-full bg-info-soft px-2.5 py-0.5 text-[11px] text-info">
                3 类典型工法
              </span>
            }
          />
          <MethodLibrary methods={data.methods} />

          {/* 3. 地质环境映射表 */}
          <div className="sec-title" style={{ margin: '20px 0 8px' }}>
            {data.mappingTitle}
          </div>
          <MappingTable data={data.mappings} />

          {/* 4. 支护体系与优选方案库 */}
          <SectionTitle
            icon={<SupportIcon />}
            title={data.schemeTitle}
            extra={
              <span className="rounded-full bg-violet-soft px-2.5 py-0.5 text-[11px] text-violet">
                Ⅳ / Ⅴ 级围岩方案
              </span>
            }
          />
          <SchemeLibrary data={data.schemes} />
        </div>
      </main>
    </>
  );
}
