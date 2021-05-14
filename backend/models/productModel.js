import mongoose from "mongoose";
import Review from "./reviewModel.js";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    discountPrice: { type: Number, default: 0.0, required: false },
    countInStock: { type: Number, default: 0, required: true },
    countSold: { type: Number, default: 0 },
    rating: { type: Number, default: 0.0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    active: { type: Boolean, default: false },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
