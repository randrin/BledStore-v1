import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";
import data from "./data.js";
dotenv.config();

// Import Routes
import userRouter from "./routers/userRouter.js";

const app = express();

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("Error connected to mongodb:", error.reason);
  });

// Routes
app.use("/v1/api/users", userRouter);

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Server is running ....");
});

app.get("/v1/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/v1/api/products/:productId", (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.productId
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found!!!!" });
  }
});

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
