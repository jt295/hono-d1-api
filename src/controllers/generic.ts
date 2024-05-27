import { eq } from "drizzle-orm";
import { Context } from "hono";
import { parseRequestBody, executeDbOperation, handleError } from "./helpers";
import { DBTable, posts, products } from "../db/schema";
import { createInsertSchema } from "drizzle-zod";

export async function createRecord(
  c: Context,
  schema: ReturnType<typeof createInsertSchema<DBTable>>,
  table: DBTable
) {
  try {
    const data = await parseRequestBody(c, schema);
    return executeDbOperation(c, c.var.db.insert(table).values(data));
  } catch (error) {
    return handleError(c, "Failed to create record", error);
  }
}

export async function deleteRecord(c: Context, table: DBTable) {
  const recordId = Number(c.req.param("recordId"));
  try {
    return executeDbOperation(
      c,
      c.var.db
        .delete(table)
        .where(eq(table.id, recordId))
        .returning({ deletedId: table.id })
    );
  } catch (error) {
    return handleError(c, `Deletion of record ${recordId} failed`, error);
  }
}

export async function getRecord(c: Context, table: DBTable) {
  const recordId = Number(c.req.param("recordId"));
  try {
    return executeDbOperation(
      c,
      c.var.db.select().from(table).where(eq(table.id, recordId))
    );
  } catch (error) {
    return handleError(c, "Failed to fetch record", error);
  }
}

export async function getRecordBySlug(
  c: Context,
  table: typeof posts | typeof products
) {
  const slug = c.req.param("slug");

  if (!slug) {
    return handleError(c, "Failed to fetch record", "Not a valid slug");
  }
  let title = slug.split("-").join(" ");

  try {
    return executeDbOperation(
      c,
      c.var.db.select().from(table).where(eq(table.title, title))
    );
  } catch (error) {
    return handleError(c, "Failed to fetch record", error);
  }
}

export async function getAllRecords(c: Context, table: DBTable) {
  try {
    return executeDbOperation(c, c.var.db.select().from(table).all());
  } catch (error) {
    return handleError(c, "Failed to fetch records", error);
  }
}

export async function updateRecord(
  c: Context,
  schema: ReturnType<typeof createInsertSchema<DBTable>>,
  table: DBTable
) {
  const recordId = Number(c.req.param("recordId"));
  try {
    const data = await parseRequestBody(c, schema);
    return executeDbOperation(
      c,
      c.var.db.update(table).set(data).where(eq(table.id, recordId))
    );
  } catch (error) {
    return handleError(c, "Failed to update record", error);
  }
}
