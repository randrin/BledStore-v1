import express from "express";
import { placeOrder, getOrderById, payOrder, getMineOrders, getListOrders, deleteOrder, deliverOrder } from "../controllers/orderController.js";
import { decreaseQuantity, isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get("/", isAuth, isSellerOrAdmin, getListOrders);
orderRouter.get("/mine", isAuth, getMineOrders);
orderRouter.get("/:orderId", isAuth, getOrderById);
orderRouter.post("/", isAuth, decreaseQuantity, placeOrder);
orderRouter.put("/:orderId/pay", isAuth, payOrder);
orderRouter.put("/:orderId/deliver", isAuth, isAdmin, deliverOrder);
orderRouter.delete("/:orderId", isAuth, isAdmin, deleteOrder);

export default orderRouter;