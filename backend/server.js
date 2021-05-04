import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import Server from "socket.io";
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
import brandRouter from "./routers/brandRouter.js";
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
app.use("/v1/api/brands", brandRouter);
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
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);

// app.get("/", (req, res) => {
//   res.send("Server is running ....");
// });

// app.listen(config.PORT, () => {
//   console.log(`Server started at http://localhost:${config.PORT}`);
// });

const httpServer = http.Server(app);
const socketio = new Server(httpServer, {cors: {origin: "*"}});
const users = [];
socketio.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      console.log(users);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        socketio.to(admin.socketId).emit("updateUser", user);
      }
    }
    // const index = clients.map((item) => item.socketId).indexOf(socket.id);
    // clients.splice(index, 1);
    // console.log('removed', clients);
  });
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };

    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser); 
    }
    console.log("Online", user.name);
    console.log(users);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      socketio.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      socketio.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      socketio.to(admin.socketId).emit("selectUser", existUser);
    }
  });
  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        socketio.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        socketio.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        socketio.to(socket.id).emit("message", {
          name: "Support BledStore",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

httpServer.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
