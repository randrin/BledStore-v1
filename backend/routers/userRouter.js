import express from "express";

const userRouter = express.Router();

import {seedUsers, signinUser, signupUser} from "../controllers/userController.js";

userRouter.get("/seed", seedUsers);
userRouter.post("/signin", signinUser);
userRouter.post("/signup", signupUser);

export default userRouter;
