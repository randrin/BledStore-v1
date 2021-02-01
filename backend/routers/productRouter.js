import express from "express";
import {
  seedProducts,
  getListProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", getListProducts);
productRouter.get("/seed", isAuth, isAdmin, seedProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/create", isAuth, isSellerOrAdmin, createProduct);
productRouter.put("/:productId", isAuth, isSellerOrAdmin, updateProduct);
productRouter.delete("/:productId", isAuth, isSellerOrAdmin, deleteProduct);

export default productRouter;
