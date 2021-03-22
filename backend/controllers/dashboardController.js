import expressAsyncHander from "express-async-handler";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const getDashboardItems = expressAsyncHander(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
        orders: { $sum: 1 },
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const categories = await Category.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).send({dashboardItems: {users, orders, dailyOrders, categories}});
});
