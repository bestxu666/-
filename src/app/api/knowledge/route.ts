import { NextResponse } from 'next/server';
import { getKnowledge } from '@/server/knowledge';

/**
 * GET /api/knowledge
 *
 * 经验数据库接口（后端 HTTP 入口）：装备配置 / 标准工法 / 知识映射 / 支护方案。
 * 仅负责请求解析与响应封装，业务逻辑下沉到 src/server/ 服务层。
 */
export async function GET() {
  return NextResponse.json(getKnowledge());
}
