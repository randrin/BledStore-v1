import express from "express";
import {seedUsers, signinUser, signupUser, getProfileUser, updateProfileUser} from "../controllers/userController.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", isAuth, seedUsers);
userRouter.get("/:userId", isAuth, getProfileUser);
userRouter.put("/profile", isAuth, updateProfileUser);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);

export default userRouter;
