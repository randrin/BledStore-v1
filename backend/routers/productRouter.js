import express from "express";
import {
  seedProducts,
  getListProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", getListProducts);
productRouter.get("/seed", isAuth, isAdmin, seedProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/create", isAuth, isAdmin, createProduct);
productRouter.put("/:productId", isAuth, isAdmin, updateProduct);
productRouter.delete("/:productId", isAuth, isAdmin, deleteProduct);

export default productRouter;
