import expressAsyncHander from "express-async-handler";
import Product from "../models/productModel.js";

export const getListCategories = expressAsyncHander(async (req, res) => {
  const listCategories = await Product.find({}).distinct("category");
  res.status(200).send({ listCategories });
});
