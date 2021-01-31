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
    // name: req.body.name,
    // description: req.body.description,
    // category: req.body.category,
    // brand: req.body.brand,
    // image: req.body.image,
    // price: req.body.price,
    // discountPrice: req.body.price,
    // countInStock: req.body.countInStock,
    name: 'sample name ' + Date.now(),
    image: '/assets/images/products/demo.png',
    price: 10,
    discountPrice: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    description: 'sample description',
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