import express from "express";

import {
    getDashboardItems
  } from "../controllers/dashboardController.js";

import { isAdmin, isAuth } from "../utils.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", isAuth, isAdmin, getDashboardItems);

export default dashboardRouter;