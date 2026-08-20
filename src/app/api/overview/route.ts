import { NextResponse } from 'next/server';
import { getOverview } from '@/server/overview';

/**
 * GET /api/overview
 *
 * 系统总览数据接口（后端 HTTP 入口）。
 * 仅负责请求解析与响应封装，业务逻辑下沉到 src/server/ 服务层。
 */
export async function GET() {
  return NextResponse.json(getOverview());
}