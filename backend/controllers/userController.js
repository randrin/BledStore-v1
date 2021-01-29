import expressAsyncHander from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken } from "../utils.js";

export const seedUsers = expressAsyncHander(async (req, res) => {
  // await User.remove({}); // Remove all the users before saving
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export const signinUser = expressAsyncHander(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pseudo: user.pseudo,
        token: generateToken(user),
      });
      return;
    } else {
      res
        .status(404)
        .send({ message: "Password don't macth with this user Try again !!!" });
    }
  } else {
    res.status(401).send({ message: "User not Found. Signup" });
  }
});
