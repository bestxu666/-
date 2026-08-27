"use client";

import { useState } from "react";
import type { KnowledgeData } from "@/lib/types";
import { EquipmentTable } from "./equipment-table";
import { MethodLibrary } from "./method-library";
import { MappingTable } from "./mapping-table";
import { SchemeLibrary } from "./scheme-library";

type SubTab = "methods" | "support" | "equipment";

const TABS: { key: SubTab; label: string }[] = [
  { key: "methods", label: "标准工法库" },
  { key: "support", label: "支护体系与参数库" },
  { key: "equipment", label: "机械装备库" },
];

export function ExperienceTabs({ data }: { data: KnowledgeData }) {
  const [active, setActive] = useState<SubTab>("methods");

  return (
    <div>
      {/* 二级胶囊切换条（复用决策中心已有的 mode-capsule-switch / mc-item 样式） */}
      <div className="mode-capsule-switch mb-5">
        {TABS.map((t) => (
          <div
            key={t.key}
            className={`mc-item ${active === t.key ? "active" : ""}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {active === "methods" && (
          <>
            <MethodLibrary title={data.methodTitle} data={data.methods} />
            <MappingTable title={data.mappingTitle} tag="规则映射" data={data.mappings} />
          </>
        )}
        {active === "support" && (
          <SchemeLibrary title={data.schemeTitle} data={data.schemes} />
        )}
        {active === "equipment" && (
          <EquipmentTable title={data.equipmentTitle} tag="配置台账" data={data.equipment} />
        )}
      </div>
    </div>
  );
}
