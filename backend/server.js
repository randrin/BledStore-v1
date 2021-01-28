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
