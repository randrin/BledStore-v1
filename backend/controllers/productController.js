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
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404).send({ message: "Product not found!!!!" });
  } else {
    res.status(200).send(product);
  }
});

export const createProduct = expressAsyncHander(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    image: req.body.image,
    price: req.body.price,
    discountPrice: req.body.price,
    countInStock: req.body.countInStock,
    image: req.body.image,
  });
  if (product.price < product.discountPrice) {
    res.status(400).send({ message: "Discount price is greater than price" });
  }
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).send({
      message: "Product Created successfuly.",
      product: createdProduct,
    });
  } else {
    res.status(500).send({ message: "Error in creating product" });
  }
});

export const updateProduct = expressAsyncHander(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.brand = req.body.brand;
    product.image = req.body.image;
    product.price = req.body.price;
    product.discountPrice = req.body.discountPrice;
    product.countInStock = req.body.countInStock;
    if (product.price < product.discountPrice) {
      res.status(400).send({ message: "Discount price is greater than price" });
    } else {
      const productUpdated = await product.save();
      if (productUpdated) {
        res.status(200).send({
          message: "Product Updated successfully.",
          product: productUpdated,
        });
      } else {
        res.status(500).send({ message: "Error in updating product" });
      }
    }
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});
