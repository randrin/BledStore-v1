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

export const signupUser = expressAsyncHander(async (req, res) => {
  const data = User({
    pseudo: req.body.pseudo,
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const user = await data.save();
  if (!user) {
    res.status(404).send({ message: "Something went wrong." });
  } else {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pseudo: user.pseudo,
      token: generateToken(user),
    });
  }
});

export const getProfileUser = expressAsyncHander(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404).send({ message: "User not found!!!!" });
  } else {
    res.status(200).send(user);
  }
});

export const updateProfileUser = expressAsyncHander(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).send({ message: "User not found !!!" });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pseudo: updatedUser.pseudo,
      token: generateToken(updatedUser),
    });
  }
});
