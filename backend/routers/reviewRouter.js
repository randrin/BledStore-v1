import express from "express";
import { isAuth } from "../utils.js";
import { createReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", isAuth, createReview);

export default reviewRouter;
