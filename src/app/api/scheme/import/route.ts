import { NextResponse } from "next/server";
import { importSchemeHistory } from "@/server/scheme";
import type { HistoryRecord } from "@/lib/types";

/** POST /api/scheme/import —— 批量导入决策记录 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Array<
      Omit<HistoryRecord, "id" | "custom">
    >;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "数据格式应为数组" }, { status: 400 });
    }
    const count = await importSchemeHistory(body);
    return NextResponse.json({ success: true, count });
  } catch (e) {
    return NextResponse.json(
      { error: "批量导入失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}