import express from "express";
import multer from "multer";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
import { uploadProductImage } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, isSellerOrAdmin, upload.single('image'), uploadProductImage);

export default uploadRouter;
