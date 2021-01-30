import express from "express";
import {
  seedProducts,
  getListProducts,
  getProductById,
} from "../controllers/productController.js";
import { isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get("/", getListProducts);
productRouter.get("/seed", isAuth, seedProducts);
productRouter.get("/:productId", getProductById);

export default productRouter;
