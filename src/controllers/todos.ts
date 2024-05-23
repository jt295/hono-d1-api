import { insertTodoSchema, todos } from "@/src/db/schema";
import { Context } from "hono";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  updateRecord,
} from "./generic";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export async function createTodo(c: Context) {
  return createRecord(c, insertTodoSchema, todos);
}

export async function getTodos(c: Context) {
  return getAllRecords(c, todos);
}

export async function updateTodo(c: Context) {
  // Id required for update, todo text optional
  const UpdateSchema = createInsertSchema(todos, {
    todo: z.string().optional(),
    id: z.number(),
  });

  return updateRecord(c, UpdateSchema, todos);
}

export async function deleteTodo(c: Context) {
  return deleteRecord(c, todos);
}
