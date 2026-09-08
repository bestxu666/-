import { NextResponse } from "next/server";
import { getKnowledge } from "@/server/knowledge";

/** GET /api/knowledge —— 返回经验数据库全部数据 */
export async function GET() {
  try {
    const data = await getKnowledge();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "经验库读取失败", message: (e as Error).message },
      { status: 500 }
    );
  }
}