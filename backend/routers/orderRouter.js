import express from "express";
import { placeOrder, getOrderById, payOrder } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, placeOrder);
orderRouter.get("/:orderId", isAuth, getOrderById);
orderRouter.put("/:orderId/pay", isAuth, payOrder);

export default orderRouter;