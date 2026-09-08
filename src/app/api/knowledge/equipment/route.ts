import { NextResponse } from "next/server";
import {
  createEquipment,
  deleteEquipment,
} from "@/server/knowledge";
import type { EquipmentItem } from "@/lib/types";

/** POST /api/knowledge/equipment —— 新增装备 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<EquipmentItem, "id" | "custom">;
    const item = await createEquipment(body);
    return NextResponse.json({ success: true, item });
  } catch (e) {
    return NextResponse.json(
      { error: "装备新增失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}

/** DELETE /api/knowledge/equipment?id=xx */
export async function DELETE(req: Request) {
  try {
    const id = Number(new URL(req.url).searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "缺少 id" }, { status: 400 });
    await deleteEquipment(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "装备删除失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}