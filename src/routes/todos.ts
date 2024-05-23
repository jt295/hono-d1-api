import { Hono } from "hono";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const todosRoutes = new Hono();

todosRoutes.post("/", createTodo);
todosRoutes.get("/", getTodos);
todosRoutes.patch("/:recordId", updateTodo);
todosRoutes.delete("/:recordId", deleteTodo);

export default todosRoutes;
