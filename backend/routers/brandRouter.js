import express from "express";
import {
  activateBrand,
  createBrand,
  deleteBrand,
  getBrandById,
  getListBrands,
  updateBrand,
} from "../controllers/brandController.js";

import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const brandRouter = express.Router();

brandRouter.get("/", getListBrands);
brandRouter.get("/:brandId", getBrandById);
brandRouter.post("/create", isAuth, isAdmin, createBrand);
brandRouter.put("/:brandId", isAuth, isAdmin, updateBrand);
brandRouter.put("/activation/:brandId", isAuth, isAdmin, activateBrand);
brandRouter.delete("/:brandId", isAuth, isAdmin, deleteBrand);

export default brandRouter;
