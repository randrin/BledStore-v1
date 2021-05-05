import expressAsyncHander from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";

export const getListProducts = expressAsyncHander(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 4;
  const page = Number(req.query.pageNumber) || 1;
  const seller = req.query.seller || "";
  const name = req.query.name || "";
  const order = req.query.order || "";
  const category = req.query.category || "";
  const brand = req.query.brand || "";
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  const sellerFilter = seller ? { seller } : {};
  const categoryFilter = category ? { category } : {};
  const brandFilter = brand ? { brand } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {}; // to contains some characters in the search
  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : { _id: -1 };
  const count = await Product.count({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...brandFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  const listProducts = await Product.find({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...brandFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate("seller", "seller.name seller.logo")
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res
    .status(200)
    .send({ listProducts, page, pages: Math.ceil(count / pageSize), count });
});

export const seedProducts = expressAsyncHander(async (req, res) => {
  await Product.remove({}); // Remove all the products before saving
  const seller = await User.findOne({ isSeller: true });
  if (seller) {
    const products = data.products.map((product) => ({
      ...product,
      seller: seller._id,
    }));
    const createdProducts = await Product.insertMany(products);
    res.status(200).send({ createdProducts });
  } else {
    res
      .status(500)
      .send({ message: "No seller found. first run /v1/api/users/seed" });
  }
});

export const getProductById = expressAsyncHander(async (req, res) => {
  const product = await Product.findById(req.params.productId).populate(
    "seller",
    "seller.name seller.description seller.logo seller.numReviews seller.rating"
  );
  if (!product) {
    res.status(404).send({ message: "Product not found!!!!" });
  } else {
    res.status(200).send(product);
  }
});

export const getProductsRelatedByCategory = expressAsyncHander(
  async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const product = await Product.findById(req.params.productId);
    const productsRelated = await Product.find({
      _id: { $ne: req.params.productId },
      category: product.category,
    }).populate("seller", "seller.name seller.logo").limit(limit);
    if (!productsRelated) {
      res.status(404).send({ message: `Products related with ${req.params.category} not found!!!!` });
    } else {
      res.status(200).send(productsRelated);
    }
  }
);

export const createProduct = expressAsyncHander(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    seller: req.user._id,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    image: req.body.image,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    countInStock: req.body.countInStock,
  });
  if (product.price <= product.discountPrice) {
    res.status(400).send({ message: "Discount price is greater or equal than price" });
  } else {
    const createdProduct = await product.save();
    if (createdProduct) {
      res.status(201).send({
        message: "Product Created successfuly.",
        product: createdProduct,
      });
    } else {
      res.status(500).send({ message: "Error in creating product" });
    }
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
    if (product.price <= product.discountPrice) {
      res.status(400).send({ message: "Discount price is greater or equal than price" });
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

export const deleteProduct = expressAsyncHander(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    const productDeleted = await product.remove();
    res.status(200).send({
      message: "Product deleted successfully",
      product: productDeleted,
    });
  } else {
    res.status(404).send({ message: "Product not Found" });
  }
});
