import { ZodSchema } from "zod";
import { Context } from "hono";

export async function parseRequestBody<T>(c: Context, schema: ZodSchema<T>) {
  const reqBody = await c.req.json();
  const result = schema.safeParse(reqBody);
  if (!result.success) {
    throw new Error("Validation failed");
  }
  return result.data;
}

export function handleError(c: Context, message: string, error: any) {
  return c.json({ message, error }, 400);
}

export async function executeDbOperation(c: Context, operation: Promise<any>) {
  try {
    const result = await operation;
    return c.json(result);
  } catch (error) {
    return handleError(c, "Database operation failed", error);
  }
}
