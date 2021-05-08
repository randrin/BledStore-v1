import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true, minlength: 5, maxlength: 15, unique: true },
  sex: { type: String, required: true, default: 'Male' },
  email: { type: String, required: true, index: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  isSeller: { type: Boolean, required: true, default: false },
  seller: {
    name: String,
    logo: String,
    description: String,
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;