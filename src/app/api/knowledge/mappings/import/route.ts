import { NextResponse } from "next/server";
import { importMappings } from "@/server/knowledge";
import type { KnowledgeMapping } from "@/lib/types";

/** POST /api/knowledge/mappings/import —— 批量导入知识规则 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Array<
      Omit<KnowledgeMapping, "no" | "custom">
    >;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "数据格式应为数组" }, { status: 400 });
    }
    const count = await importMappings(body);
    return NextResponse.json({ success: true, count });
  } catch (e) {
    return NextResponse.json(
      { error: "知识规则批量导入失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}