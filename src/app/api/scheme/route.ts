import { NextResponse } from 'next/server';
import { getSchemeHistory } from '@/server/scheme';

/**
 * GET /api/scheme
 *
 * 返回历史决策台账数据（工作面筛选项 + 决策记录列表）。
 */
export async function GET() {
  return NextResponse.json(getSchemeHistory());
}
