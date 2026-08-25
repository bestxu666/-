import { TopBar } from '@/components/overview/top-bar';
import { MappingTable } from '@/components/knowledge/mapping-table';
import { fetchKnowledge } from '@/lib/api';

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
          {/* 地质环境特征与施工支护知识方案映射表 */}
          <div className="sec-title" style={{ margin: '0 0 8px' }}>
            {data.mappingTitle}
          </div>
          <MappingTable data={data.mappings} />
        </div>
      </main>
    </>
  );
}
