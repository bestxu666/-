import { NextResponse } from "next/server";
import {
  createMapping,
  deleteMapping,
} from "@/server/knowledge";
import type { KnowledgeMapping } from "@/lib/types";

/** POST /api/knowledge/mappings —— 新增知识规则 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<KnowledgeMapping, "no" | "custom">;
    const item = await createMapping(body);
    return NextResponse.json({ success: true, item });
  } catch (e) {
    return NextResponse.json(
      { error: "知识规则新增失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}

/** DELETE /api/knowledge/mappings?code=xx */
export async function DELETE(req: Request) {
  try {
    const code = new URL(req.url).searchParams.get("code");
    if (!code) return NextResponse.json({ error: "缺少 code" }, { status: 400 });
    await deleteMapping(code);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "知识规则删除失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}