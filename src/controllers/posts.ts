import { insertPostSchema, posts } from "@/src/db/schema";
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

export async function createPost(c: Context) {
  return createRecord(c, insertPostSchema, posts);
}

export async function getPosts(c: Context) {
  return getAllRecords(c, posts);
}

export async function getPost(c: Context) {
  return getRecordBySlug(c, posts);
}

export async function updatePost(c: Context) {
  // Id required for update
  const UpdateSchema = createInsertSchema(posts, {
    id: z.number(),
    title: z.string().optional(),
  });

  return updateRecord(c, UpdateSchema, posts);
}

export async function deletePost(c: Context) {
  return deleteRecord(c, posts);
}
