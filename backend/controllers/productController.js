import expressAsyncHander from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";

export const getListProducts = expressAsyncHander(async (req, res) => {
  const listProducts = await Product.find({});
  res.status(200).send({ listProducts });
});

export const seedProducts = expressAsyncHander(async (req, res) => {
  // await Product.remove({}); // Remove all the products before saving
  const createdProducts = await Product.insertMany(data.products);
  res.status(200).send({ createdProducts });
});

export const getProductById = expressAsyncHander(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({ message: "Product not found!!!!" });
  } else {
    res.status(200).send(product);
  }
});
