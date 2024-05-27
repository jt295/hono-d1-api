import { Hono } from "hono";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products";

const productRoutes = new Hono();

productRoutes.post("/", createProduct);
productRoutes.get("/", getProducts);
productRoutes.get("/:slug", getProduct);
productRoutes.patch("/:recordId", updateProduct);
productRoutes.delete("/:recordId", deleteProduct);

export default productRoutes;
