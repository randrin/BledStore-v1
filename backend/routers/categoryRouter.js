import express from "express";
import {
  getListCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  activateCategory
} from "../controllers/categoryController.js";

import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getListCategories);
categoryRouter.get("/:categoryId", getCategoryById);
categoryRouter.post("/create", isAuth, isAdmin, createCategory);
categoryRouter.put("/:categoryId", isAuth, isAdmin, updateCategory);
categoryRouter.put("/activation/:categoryId", isAuth, isAdmin, activateCategory);
categoryRouter.delete("/:categoryId", isAuth, isAdmin, deleteCategory);

export default categoryRouter;
