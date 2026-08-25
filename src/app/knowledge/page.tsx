import { fetchKnowledge } from "@/lib/api";
import { EquipmentTable } from "@/components/knowledge/equipment-table";
import { MethodLibrary } from "@/components/knowledge/method-library";
import { MappingTable } from "@/components/knowledge/mapping-table";
import { SchemeLibrary } from "@/components/knowledge/scheme-library";

export const dynamic = "force-dynamic";

export default async function KnowledgePage() {
  const data = await fetchKnowledge();

  return (
    <section className="px-5 lg:px-8 py-6 space-y-5 max-w-[1600px] mx-auto">
      <EquipmentTable title={data.equipmentTitle} tag="配置台账" data={data.equipment} />
      <MethodLibrary title={data.methodTitle} data={data.methods} />
      <MappingTable title={data.mappingTitle} tag="规则映射" data={data.mappings} />
      <SchemeLibrary title={data.schemeTitle} data={data.schemes} />
    </section>
  );
}
