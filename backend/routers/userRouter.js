import express from "express";
import {
  seedUsers,
  signinUser,
  signupUser,
  getProfileUser,
  updateProfileUser,
  getListUsers,
  deleteUser,
  updateUser
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", isAuth, isAdmin, seedUsers);
userRouter.get("/", isAuth, isAdmin, getListUsers);
userRouter.get("/:userId", isAuth, getProfileUser);
userRouter.put("/profile", isAuth, updateProfileUser);
userRouter.put("/:userId", isAuth, updateUser);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);
userRouter.delete("/:userId", isAuth, isAdmin, deleteUser);

export default userRouter;
