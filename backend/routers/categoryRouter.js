import express from "express";
import { getListCategories } from "../controllers/categoryController.js";

import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getListCategories);

export default categoryRouter;
