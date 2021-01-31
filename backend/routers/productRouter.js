import express from "express";
import {
  seedProducts,
  getListProducts,
  getProductById,
  createProduct
} from "../controllers/productController.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", getListProducts);
productRouter.get("/seed", isAuth, isAdmin, seedProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", isAuth, isAdmin, createProduct);

export default productRouter;
