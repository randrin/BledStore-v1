import expressAsyncHander from "express-async-handler";
import User from "../models/userModel.js";
import data from "../data.js";

const seedUsers = expressAsyncHander(async (req, res) => {
  // await User.remove({}); // Remove all the users before saving
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export default seedUsers;
