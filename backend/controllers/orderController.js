import expressAsyncHander from "express-async-handler";
import Order from "../models/orderModel.js";

export const placeOrder = expressAsyncHander(async (req, res) => {
    console.log('req.body: ', req.body)
  if (req.body.orderItems.length === 0) {
    res.status(403).send({ message: "Cart is empty" });
  } else {
    const data = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await data.save();
    if (!order) {
      res.status(404).send({ message: "Something went wrong." });
    } else {
      res.status(201).send({
        message: "New Order Created",
        order: order,
      });
    }
  }
});
