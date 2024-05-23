import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  todo: text("todo").notNull(),
  isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").default(""),
  image: text("image"),
  content: text("content").default(""),
  author: text("author"),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").default(""),
  image: text("image"),
  cost: real("cost"),
});

export const insertTodoSchema = createInsertSchema(todos);
export const insertPostSchema = createInsertSchema(posts);
export const insertProductSchema = createInsertSchema(products);

export type DBTable = typeof todos | typeof posts | typeof products;

/**
 * After updating the schema and using generate, trigger something like this:
 * wrangler d1 execute <DATABASE_NAME> --local --file=./drizzle/0000_short_lockheed.sql
 */
