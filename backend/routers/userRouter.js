import express from "express";
import {seedUsers, signinUser, signupUser} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/seed", seedUsers);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);

export default userRouter;
