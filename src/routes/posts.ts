import { Hono } from "hono";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts";

const postRoutes = new Hono();

postRoutes.post("/", createPost);
postRoutes.get("/", getPosts);
postRoutes.get("/:slug", getPost);
postRoutes.patch("/:recordId", updatePost);
postRoutes.delete("/:recordId", deletePost);

export default postRoutes;
