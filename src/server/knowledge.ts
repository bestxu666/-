import { knowledgeData } from "@/data/knowledge";
import type {
  EquipmentItem,
  KnowledgeData,
  KnowledgeMapping,
  SupportScheme,
} from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient, hasSupabaseCredentials, loadEnv } from "@/storage/database/supabase-client";

/**
 * 后端服务层 —— 经验数据库业务逻辑（Supabase 持久化）。
 * - 装备 / 知识映射 / 支护方案三张表落库，首次为空时以种子数据惰性种籽
 * - 标准工法（methods）为静态卡片，不落库
 * - 写操作：新增 / 批量导入 / 删除
 */
loadEnv();

/* ---------------- 行 -> 领域类型 ---------------- */

interface EqRow {
  id: number;
  name: string;
  model: string;
  num: number;
  unit: string;
  pos: string;
  stage: string;
  is_custom: boolean;
}
function toEquip(r: EqRow): EquipmentItem {
  const item: EquipmentItem = {
    id: r.id,
    name: r.name,
    model: r.model,
    num: r.num,
    unit: r.unit,
    pos: r.pos,
    stage: r.stage,
  };
  if (r.is_custom) item.custom = true;
  return item;
}

interface MapRow {
  no: number;
  code: string;
  hard: string;
  intact: string;
  water: string;
  depth: string;
  stress: string;
  rock: string;
  scheme: string;
  is_custom: boolean;
}
function toMapping(r: MapRow): KnowledgeMapping {
  const m: KnowledgeMapping = {
    no: r.no,
    code: r.code,
    hard: r.hard,
    intact: r.intact,
    water: r.water,
    depth: r.depth,
    stress: r.stress,
    rock: r.rock,
    scheme: r.scheme,
  };
  if (r.is_custom) m.custom = true;
  return m;
}

interface SchemeRow {
  no: number;
  rock: string;
  type: string;
  depth: string;
  adv_type: string;
  adv_ring: string;
  adv_len: string;
  adv_scope: string;
  anchor: string;
  steel: string;
  shot: string;
  conc: string;
  thick: string;
  mode: string;
  adv_rate: string;
  bench_len: string;
  is_custom: boolean;
}
function toScheme(r: SchemeRow): SupportScheme {
  const s: SupportScheme = {
    no: r.no,
    rock: r.rock,
    type: r.type,
    depth: r.depth,
    advType: r.adv_type,
    advRing: r.adv_ring,
    advLen: r.adv_len,
    advScope: r.adv_scope,
    anchor: r.anchor,
    steel: r.steel,
    shot: r.shot,
    conc: r.conc,
    thick: r.thick,
    mode: r.mode,
    advRate: r.adv_rate,
    benchLen: r.bench_len,
  };
  if (r.is_custom) s.custom = true;
  return s;
}

/** 支护方案：camelCase 领域对象 → snake_case 数据库行 */
function toDbScheme(r: Omit<SupportScheme, "custom"> & { no: number; is_custom: boolean }) {
  return {
    no: r.no,
    rock: r.rock,
    type: r.type,
    depth: r.depth,
    adv_type: r.advType,
    adv_ring: r.advRing,
    adv_len: r.advLen,
    adv_scope: r.advScope,
    anchor: r.anchor,
    steel: r.steel,
    shot: r.shot,
    conc: r.conc,
    thick: r.thick,
    mode: r.mode,
    adv_rate: r.advRate,
    bench_len: r.benchLen,
    is_custom: r.is_custom,
  };
}

/* ---------------- 惰性种籽 ---------------- */

async function ensureSeeded(client: SupabaseClient): Promise<void> {
  await seedIfEmpty(client, "equipment", knowledgeData.equipment);
  await seedIfEmpty(client, "knowledge_mapping", knowledgeData.mappings);
  await seedIfEmpty(client, "support_scheme", knowledgeData.schemes.map((s) => toDbScheme({ ...s, no: s.no, is_custom: false })));
}

async function seedIfEmpty(
  client: SupabaseClient,
  table: "equipment" | "knowledge_mapping" | "support_scheme",
  rows: unknown[]
): Promise<void> {
  const { data, error } = await client.from(table).select("id").limit(1);
  if (error) throw error;
  if (!data || data.length === 0) {
    const { error: insertErr } = await client
      .from(table)
      .insert(
        rows.map((r) => ({ ...(r as Record<string, unknown>), is_custom: false })) as never[],
      );
    if (insertErr) throw insertErr;
  }
}

/** 读取经验数据库全部数据（种子 + 用户新增） */
export async function getKnowledge(): Promise<KnowledgeData> {
  // 本地开发未配置数据库时仍可浏览内置经验库；写操作继续要求数据库配置。
  if (!hasSupabaseCredentials()) return structuredClone(knowledgeData);

  const client = getSupabaseClient();
  await ensureSeeded(client);

  const eq = await client
    .from("equipment")
    .select("*")
    .order("id", { ascending: true });
  if (eq.error) throw eq.error;

  const mp = await client
    .from("knowledge_mapping")
    .select("*")
    .order("no", { ascending: true });
  if (mp.error) throw mp.error;

  const sp = await client
    .from("support_scheme")
    .select("*")
    .order("no", { ascending: true });
  if (sp.error) throw sp.error;

  return {
    ...knowledgeData,
    equipment: (eq.data ?? []).map((r) => toEquip(r)),
    mappings: (mp.data ?? []).map((r) => toMapping(r)),
    schemes: (sp.data ?? []).map((r) => toScheme(r)),
  };
}

/* ---------------- 装备 ---------------- */

export async function createEquipment(
  input: Omit<EquipmentItem, "id" | "custom">
): Promise<EquipmentItem> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("equipment")
    .insert({
      name: input.name,
      model: input.model,
      num: input.num,
      unit: input.unit,
      pos: input.pos,
      stage: input.stage,
      is_custom: true,
    })
    .select("*")
    .single();
  if (error) throw error;
  return toEquip(data);
}

export async function importEquipment(
  list: Array<Omit<EquipmentItem, "id" | "custom">>
): Promise<number> {
  const client = getSupabaseClient();
  if (list.length === 0) return 0;
  const rows = list.map((r) => ({
    name: r.name,
    model: r.model,
    num: r.num ?? 1,
    unit: r.unit ?? "台",
    pos: r.pos,
    stage: r.stage,
    is_custom: true,
  }));
  const { error } = await client.from("equipment").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function deleteEquipment(id: number): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client.from("equipment").delete().eq("id", id);
  if (error) throw error;
}

/* ---------------- 知识映射 ---------------- */

export async function createMapping(
  input: Omit<KnowledgeMapping, "no" | "custom">
): Promise<KnowledgeMapping> {
  const client = getSupabaseClient();
  const { data: maxRow } = await client
    .from("knowledge_mapping")
    .select("no")
    .order("no", { ascending: false })
    .limit(1);
  const no = ((maxRow && maxRow[0]?.no) || 0) + 1;
  const { data, error } = await client
    .from("knowledge_mapping")
    .insert({
      no,
      code: input.code,
      hard: input.hard,
      intact: input.intact,
      water: input.water,
      depth: input.depth,
      stress: input.stress,
      rock: input.rock,
      scheme: input.scheme,
      is_custom: true,
    })
    .select("*")
    .single();
  if (error) throw error;
  return toMapping(data);
}

export async function importMappings(
  list: Array<Omit<KnowledgeMapping, "no" | "custom">>
): Promise<number> {
  const client = getSupabaseClient();
  if (list.length === 0) return 0;
  const { data: maxRow } = await client
    .from("knowledge_mapping")
    .select("no")
    .order("no", { ascending: false })
    .limit(1);
  let base = (maxRow && maxRow[0]?.no) || 0;
  const rows = list.map((r) => ({
    no: ++base,
    code: r.code,
    hard: r.hard,
    intact: r.intact,
    water: r.water,
    depth: r.depth,
    stress: r.stress,
    rock: r.rock,
    scheme: r.scheme,
    is_custom: true,
  }));
  const { error } = await client.from("knowledge_mapping").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function deleteMapping(code: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from("knowledge_mapping")
    .delete()
    .eq("code", code);
  if (error) throw error;
}

/* ---------------- 支护方案 ---------------- */

export async function createSupportScheme(
  input: Omit<SupportScheme, "no" | "custom">
): Promise<SupportScheme> {
  const client = getSupabaseClient();
  const { data: maxRow } = await client
    .from("support_scheme")
    .select("no")
    .order("no", { ascending: false })
    .limit(1);
  const no = ((maxRow && maxRow[0]?.no) || 0) + 1;
  const { data, error } = await client
    .from("support_scheme")
    .insert(toDbScheme({ ...input, no, is_custom: true }))
    .select("*")
    .single();
  if (error) throw error;
  return toScheme(data);
}

export async function importSupportSchemes(
  list: Array<Omit<SupportScheme, "no" | "custom">>
): Promise<number> {
  const client = getSupabaseClient();
  if (list.length === 0) return 0;
  const { data: maxRow } = await client
    .from("support_scheme")
    .select("no")
    .order("no", { ascending: false })
    .limit(1);
  let base = (maxRow && maxRow[0]?.no) || 0;
  const rows = list.map((r) => toDbScheme({ ...r, no: ++base, is_custom: true }));
  const { error } = await client.from("support_scheme").insert(rows);
  if (error) throw error;
  return rows.length;
}

export async function deleteSupportScheme(no: number): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client.from("support_scheme").delete().eq("no", no);
  if (error) throw error;
}
