import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 15, unique: true },
    icon: { type: String, required: true, unique: true },
    image: { type: String },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
