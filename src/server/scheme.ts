import { schemeHistoryData } from "@/data/scheme";
import type { HistoryRecord, SchemeHistoryData } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient, loadEnv } from "@/storage/database/supabase-client";

/**
 * 后端服务层 —— 方案报告与历史决策台账业务逻辑（Supabase 持久化）。
 *
 * - 读取：scheme_history 表（首次为空时以 src/data/scheme.ts 惰性种籽入库）
 * - 写入：新增 / 批量导入 / 删除 均落库，刷新不丢失
 */
loadEnv();

function toRecord(row: {
  id: number;
  time: string;
  face: string;
  mile: string;
  rock: string;
  method: string;
  type: string;
  score: string | number;
  detail: string;
  is_custom: boolean;
}): HistoryRecord {
  const record: HistoryRecord = {
    id: row.id,
    time: row.time,
    face: row.face,
    mile: row.mile,
    rock: row.rock,
    method: row.method,
    type: row.type,
    score: Number(row.score),
    detail: row.detail,
  };
  // 种籽行 is_custom=false → 同标准入库；用户新增行 is_custom=true → 可删除
  if (row.is_custom) record.custom = true;
  return record;
}

async function ensureSeeded(client: SupabaseClient): Promise<void> {
  const { data, error } = await client
    .from("scheme_history")
    .select("id")
    .limit(1);
  if (error) throw error;
  if (!data || data.length === 0) {
    const rows = schemeHistoryData.records.map((r) => ({
      time: r.time,
      face: r.face,
      mile: r.mile,
      rock: r.rock,
      method: r.method,
      type: r.type,
      score: String(r.score),
      detail: r.detail,
      is_custom: false,
    }));
    const { error: insertErr } = await client
      .from("scheme_history")
      .insert(rows);
    if (insertErr) throw insertErr;
  }
}

/** 查询台账列表（含统一次种子数据） */
export async function listSchemeHistory(): Promise<SchemeHistoryData> {
  const client = getSupabaseClient();
  await ensureSeeded(client);
  const { data, error } = await client
    .from("scheme_history")
    .select("*")
    .order("time", { ascending: false });
  if (error) throw error;
  const records = (data ?? []).map((r) => toRecord(r));
  return { ...schemeHistoryData, records };
}

/** 新增单条决策记录，落库返回完整记录 */
export async function createSchemeHistory(
  input: Omit<HistoryRecord, "id" | "custom">
): Promise<HistoryRecord> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("scheme_history")
    .insert({
      time: input.time,
      face: input.face,
      mile: input.mile,
      rock: input.rock,
      method: input.method,
      type: input.type,
      score: String(input.score),
      detail: input.detail,
      is_custom: true,
    })
    .select("*")
    .single();
  if (error) throw error;
  return toRecord(data);
}

/** 批量导入决策记录，返回入库条数 */
export async function importSchemeHistory(
  list: Array<Omit<HistoryRecord, "id" | "custom">>
): Promise<number> {
  const client = getSupabaseClient();
  const rows = list.map((r) => ({
    time: r.time,
    face: r.face,
    mile: r.mile,
    rock: r.rock,
    method: r.method,
    type: r.type,
    score: String(r.score),
    detail: r.detail,
    is_custom: true,
  }));
  if (rows.length === 0) return 0;
  const { error } = await client.from("scheme_history").insert(rows);
  if (error) throw error;
  return rows.length;
}

/** 删除单条决策记录 */
export async function deleteSchemeHistory(id: number): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client.from("scheme_history").delete().eq("id", id);
  if (error) throw error;
}