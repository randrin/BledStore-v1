import express from "express";
import { placeOrder, getOrderById } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, placeOrder);
orderRouter.get("/:orderId", isAuth, getOrderById);

export default orderRouter;