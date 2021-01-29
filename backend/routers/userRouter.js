import express from "express";

const userRouter = express.Router();

import seedData from "../controllers/userController.js";

userRouter.get("/seed", seedData);

export default userRouter;
