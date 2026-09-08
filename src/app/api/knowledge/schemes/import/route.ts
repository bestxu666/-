import { NextResponse } from "next/server";
import { importSupportSchemes } from "@/server/knowledge";
import type { SupportScheme } from "@/lib/types";

/** POST /api/knowledge/schemes/import —— 批量导入支护方案 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Array<
      Omit<SupportScheme, "no" | "custom">
    >;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "数据格式应为数组" }, { status: 400 });
    }
    const count = await importSupportSchemes(body);
    return NextResponse.json({ success: true, count });
  } catch (e) {
    return NextResponse.json(
      { error: "支护方案批量导入失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}