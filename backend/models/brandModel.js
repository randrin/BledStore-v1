import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
