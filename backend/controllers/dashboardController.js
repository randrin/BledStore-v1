import expressAsyncHander from "express-async-handler";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";

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
  const admins = await User.aggregate([
    { $match: { isAdmin: true } },
    {
      $group: {
        _id: null,
        numAdmins: { $sum: 1 },
      },
    },
  ]);
  const sellers = await User.aggregate([
    { $match: { isSeller: true } },
    {
      $group: {
        _id: null,
        numSellers: { $sum: 1 },
      },
    },
  ]);
  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        orders: { $sum: 1 },
        sales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  const categories = await Category.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  const productsCategories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        numProducts: { $sum: 1 },
      },
    },
  ]);
  const brands = await Brand.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).send({
    dashboardItems: { users, admins, sellers, orders, dailyOrders, categories, productsCategories, brands },
  });
});
