import { NextResponse } from 'next/server';
import { overviewData } from '@/data/overview';

/**
 * GET /api/overview
 *
 * 系统总览数据接口（后端数据源入口）。
 * 当前返回本地静态数据源；接入 Supabase / 数据库后，
 * 在此处替换数据读取逻辑即可，返回体结构（OverviewData）保持不变。
 */
export async function GET() {
  return NextResponse.json(overviewData);
}