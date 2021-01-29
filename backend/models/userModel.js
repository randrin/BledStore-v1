import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true, unique: true },
  sex: { type: String, required: true, default: 'Male' },
  email: { type: String, required: true, index: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;