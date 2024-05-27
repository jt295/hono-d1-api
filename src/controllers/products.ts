import { insertProductSchema, products } from "@/src/db/schema";
import { Context } from "hono";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordBySlug,
  updateRecord,
} from "./generic";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export async function createProduct(c: Context) {
  return createRecord(c, insertProductSchema, products);
}

export async function getProducts(c: Context) {
  return getAllRecords(c, products);
}

export async function getProduct(c: Context) {
  return getRecordBySlug(c, products);
}

export async function updateProduct(c: Context) {
  // Id required for update
  const UpdateSchema = createInsertSchema(products, {
    id: z.number(),
    title: z.string().optional(),
  });

  return updateRecord(c, UpdateSchema, products);
}

export async function deleteProduct(c: Context) {
  return deleteRecord(c, products);
}
