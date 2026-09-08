import { pgTable, serial, timestamp, varchar, integer, numeric, boolean, index, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const schemeHistory = pgTable("scheme_history", {
	id: serial("id").primaryKey(),
	time: varchar("time", { length: 40 }).notNull(),
	face: varchar("face", { length: 200 }).notNull(),
	startMile: varchar("start_mile", { length: 40 }).notNull(),
	endMile: varchar("end_mile", { length: 40 }).notNull(),
	advance: varchar("advance", { length: 20 }).notNull(),
	rock: varchar("rock", { length: 20 }).notNull(),
	method: varchar("method", { length: 60 }).notNull(),
	type: varchar("type", { length: 20 }).notNull(),
	score: numeric("score", { precision: 6, scale: 2 }).notNull(),
	detail: text("detail").notNull(),
	custom: boolean("custom").default(false).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
	index("scheme_history_time_idx").on(table.time),
	index("scheme_history_face_idx").on(table.face),
]);

export const equipment = pgTable("equipment", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	model: varchar("model", { length: 120 }).notNull(),
	num: integer("num").default(1).notNull(),
	unit: varchar("unit", { length: 20 }).default("台").notNull(),
	pos: text("pos").notNull(),
	stage: varchar("stage", { length: 60 }).notNull(),
	isCustom: boolean("is_custom").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
	index("equipment_stage_idx").on(table.stage),
]);

export const knowledgeMapping = pgTable("knowledge_mapping", {
	id: serial("id").primaryKey(),
	no: integer("no").notNull(),
	code: varchar("code", { length: 40 }).notNull(),
	hard: varchar("hard", { length: 80 }).notNull(),
	intact: varchar("intact", { length: 60 }).notNull(),
	water: varchar("water", { length: 60 }).notNull(),
	depth: varchar("depth", { length: 60 }).notNull(),
	stress: varchar("stress", { length: 60 }).notNull(),
	rock: varchar("rock", { length: 20 }).notNull(),
	scheme: varchar("scheme", { length: 120 }).notNull(),
	isCustom: boolean("is_custom").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
	index("knowledge_mapping_rock_idx").on(table.rock),
]);

export const supportScheme = pgTable("support_scheme", {
	id: serial("id").primaryKey(),
	no: integer("no").notNull(),
	rock: varchar("rock", { length: 20 }).notNull(),
	type: varchar("type", { length: 40 }).notNull(),
	depth: varchar("depth", { length: 60 }).notNull(),
	advType: varchar("adv_type", { length: 120 }).notNull(),
	advRing: varchar("adv_ring", { length: 40 }).notNull(),
	advLen: varchar("adv_len", { length: 40 }).notNull(),
	advScope: varchar("adv_scope", { length: 60 }).notNull(),
	anchor: varchar("anchor", { length: 120 }).notNull(),
	steel: varchar("steel", { length: 120 }).notNull(),
	shot: varchar("shot", { length: 120 }).notNull(),
	conc: varchar("conc", { length: 40 }).notNull(),
	thick: varchar("thick", { length: 40 }).notNull(),
	mode: varchar("mode", { length: 60 }).notNull(),
	advRate: varchar("adv_rate", { length: 40 }).notNull(),
	benchLen: varchar("bench_len", { length: 40 }).notNull(),
	isCustom: boolean("is_custom").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
	index("support_scheme_rock_idx").on(table.rock),
	index("support_scheme_mode_idx").on(table.mode),
]);
