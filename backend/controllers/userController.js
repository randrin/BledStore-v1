import expressAsyncHander from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken } from "../utils.js";
import { errorHandler } from "../helpers/errorHandler.js";
import Subscribe from "../models/subscribeModel.js";

export const seedUsers = expressAsyncHander(async (req, res) => {
  await User.remove({}); // Remove all the users before saving
  const createdUsers = await User.insertMany(data.users);
  res.status(200).send({ createdUsers });
});

export const getListUsers = expressAsyncHander(async (req, res) => {
  const listUsers = await User.find({});
  res.status(200).send({ listUsers });
});

export const getTopSellers = expressAsyncHander(async (req, res) => {
  const listTopSellers = await User.find({ isSeller: true })
    .sort({ "seller.rating": -1 })
    .limit(5);
  res.status(200).send({ listTopSellers });
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
        isSeller: user.isSeller,
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
      isSeller: user.isSeller,
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

export const getProfileSeller = expressAsyncHander(async (req, res) => {
  const seller = await User.findById(req.params.sellerId);
  if (!seller) {
    res.status(404).send({ message: "Seller not found!!!!" });
  } else {
    res.status(200).send(seller);
  }
});

export const updateProfileUser = expressAsyncHander(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401).send({ message: "User not found !!!" });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description =
        req.body.sellerDescription || user.seller.description;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      pseudo: updatedUser.pseudo,
      token: generateToken(updatedUser),
    });
  }
});

export const updateUser = expressAsyncHander(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(401).send({ message: "User not found !!!" });
  } else {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isSeller = Boolean(req.body.isSeller);
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      pseudo: updatedUser.pseudo,
      token: generateToken(updatedUser),
    });
  }
});

export const deleteUser = expressAsyncHander(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    if (user.isAdmin) {
      res.status(403).send({
        message: "Can't delete the Admin User. See your administration.",
      });
      return;
    }
    const userDeleted = await user.remove();
    res
      .status(200)
      .send({ message: "User Delivered successfully.", user: userDeleted });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export const subscribeUser = expressAsyncHander(async (req, res) => {
  const subscription = await Subscribe.findOne({ email: req.body.email });
  console.log("subscription: ", res)
  if (subscription && subscription.email) {
    res.status(302).send({
      message: `The subscription with the email ${req.body.email} is already done!`
    });
  } else {
    const userSubscription = await new Subscribe({email: req.body.email}).save();
    res.status(200).send({ message: "Your subscription has been made successfully.", user: userSubscription });
  }
});
