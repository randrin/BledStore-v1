import express from "express";

const productRouter = express.Router();

import {
  seedProducts,
  getListProducts,
  getProductById,
} from "../controllers/productController.js";

productRouter.get("/", getListProducts);
productRouter.get("/seed", seedProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
