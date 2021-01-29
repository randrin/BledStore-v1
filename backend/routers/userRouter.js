import express from "express";

const userRouter = express.Router();

import {seedUsers, signinUser} from "../controllers/userController.js";

userRouter.get("/seed", seedUsers);
userRouter.post("/signin", signinUser);

export default userRouter;
