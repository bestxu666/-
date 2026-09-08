import { NextResponse } from "next/server";
import { importEquipment } from "@/server/knowledge";
import type { EquipmentItem } from "@/lib/types";

/** POST /api/knowledge/equipment/import —— 批量导入装备 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Array<
      Omit<EquipmentItem, "id" | "custom">
    >;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "数据格式应为数组" }, { status: 400 });
    }
    const count = await importEquipment(body);
    return NextResponse.json({ success: true, count });
  } catch (e) {
    return NextResponse.json(
      { error: "装备批量导入失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}