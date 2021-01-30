import express from "express";
import { placeOrder, getOrderById, payOrder, getMineOrders } from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/mine", isAuth, getMineOrders);
orderRouter.get("/:orderId", isAuth, getOrderById);
orderRouter.post("/", isAuth, placeOrder);
orderRouter.put("/:orderId/pay", isAuth, payOrder);

export default orderRouter;