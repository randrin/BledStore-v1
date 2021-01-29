import express from "express";

const userRouter = express.Router();

import seedUsers from "../controllers/userController.js";

userRouter.get("/seed", seedUsers);

export default userRouter;
