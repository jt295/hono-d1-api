import { type DrizzleD1Database } from "drizzle-orm/d1";
import {} from "hono";

declare module "hono" {
  interface Env {
    Bindings: {
      DB: D1Database;
    };
    Variables: {
      db: DrizzleD1Database;
    };
  }
  interface ContextVariableMap {
    db: DrizzleD1Database;
  }
}
