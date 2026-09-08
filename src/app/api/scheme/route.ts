import { NextResponse } from "next/server";
import {
  createSchemeHistory,
  deleteSchemeHistory,
  listSchemeHistory,
} from "@/server/scheme";
import type { HistoryRecord } from "@/lib/types";

/** GET /api/scheme —— 返回历史决策台账（工作面 + 记录列表） */
export async function GET() {
  try {
    const data = await listSchemeHistory();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "台账读取失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}

/** POST /api/scheme —— 新增单条决策记录 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Omit<HistoryRecord, "id" | "custom">;
    const record = await createSchemeHistory(body);
    return NextResponse.json({ success: true, record });
  } catch (e) {
    return NextResponse.json(
      { error: "记录新增失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}

/** DELETE /api/scheme?id=xx —— 删除单条决策记录 */
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    if (!id) {
      return NextResponse.json({ error: "缺少 id" }, { status: 400 });
    }
    await deleteSchemeHistory(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "记录删除失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}