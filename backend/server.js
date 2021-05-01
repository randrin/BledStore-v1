import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from 'path';
import SocketIO from "socket.io";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";
dotenv.config();

// Import Routes
import dashboardRouter from "./routers/dashboardRouter.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import reviewRouter from "./routers/reviewRouter.js";

const app = express();
// Middleware to content data like json : resove problem "message": "Cannot read property 'email' of undefined"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/v1/api/dashboards", dashboardRouter);
app.use("/v1/api/users", userRouter);
app.use("/v1/api/products", productRouter);
app.use("/v1/api/categories", categoryRouter);
app.use("/v1/api/orders", orderRouter);
app.use("/v1/api/reviews", reviewRouter);
app.use("/v1/api/uploads", uploadRouter);
app.use("/v1/api/paypal/cliendId", (req, res) => {
  res.send({ clientId: config.PAYPAL_CLIENT_ID });
});
app.use("/v1/api/google/apiKey", (req, res) => {
  res.send({ clientId: config.GOOGLE_API_KEY });
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

// app.get("/", (req, res) => {
//   res.send("Server is running ....");
// });

// app.listen(config.PORT, () => {
//   console.log(`Server started at http://localhost:${config.PORT}`);
// });

const httpServer = http.Server(app);
const socketIO = SocketIO(httpServer);
