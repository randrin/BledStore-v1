import express from "express";
import { placeOrder, getOrderById, payOrder, getMineOrders, getListOrders, deleteOrder } from "../controllers/orderController.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/", isAuth, isAdmin, getListOrders);
orderRouter.get("/mine", isAuth, getMineOrders);
orderRouter.get("/:orderId", isAuth, getOrderById);
orderRouter.post("/", isAuth, placeOrder);
orderRouter.put("/:orderId/pay", isAuth, payOrder);
orderRouter.delete("/:orderId", isAuth, isAdmin, deleteOrder);

export default orderRouter;