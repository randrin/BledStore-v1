import express from "express";
import config from "./config.js";
import data from "./data.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running ....");
});

app.get("/v1/api/products", (req, res) => {
    res.send(data.products);
  });

app.listen(config.PORT, () => {
    console.log(`Server started at http://localhost:${config.PORT}`);
});
