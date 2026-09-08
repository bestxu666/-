import { NextResponse } from "next/server";
import {
  createSupportScheme,
  deleteSupportScheme,
} from "@/server/knowledge";
import type { SupportScheme } from "@/lib/types";

/** POST /api/knowledge/schemes —— 新增支护方案 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<SupportScheme, "no" | "custom">;
    const item = await createSupportScheme(body);
    return NextResponse.json({ success: true, item });
  } catch (e) {
    return NextResponse.json(
      { error: "支护方案新增失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}

/** DELETE /api/knowledge/schemes?no=xx */
export async function DELETE(req: Request) {
  try {
    const no = Number(new URL(req.url).searchParams.get("no"));
    if (!no) return NextResponse.json({ error: "缺少 no" }, { status: 400 });
    await deleteSupportScheme(no);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "支护方案删除失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}