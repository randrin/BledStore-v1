import express from "express";
import {
  seedUsers,
  signinUser,
  subscribeUser,
  signupUser,
  getProfileUser,
  updateProfileUser,
  getListUsers,
  deleteUser,
  updateUser,
  getTopSellers,
  getProfileSeller
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUsers);
userRouter.get("/", isAuth, isAdmin, getListUsers);
userRouter.get("/top-sellers", getTopSellers);
userRouter.get("/:userId", isAuth, getProfileUser);
userRouter.get("/seller/:sellerId", getProfileSeller);
userRouter.put("/profile", isAuth, updateProfileUser);
userRouter.put("/:userId", isAuth, updateUser);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);
userRouter.post("/subscribe", subscribeUser);
userRouter.delete("/:userId", isAuth, isAdmin, deleteUser);

export default userRouter;
