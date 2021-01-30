import express from "express";
import {seedUsers, signinUser, signupUser, getProfileUser} from "../controllers/userController.js";
import { isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", isAuth, seedUsers);
userRouter.get("/:userId", isAuth, getProfileUser);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);

export default userRouter;
