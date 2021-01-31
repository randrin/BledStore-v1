import expressAsyncHander from "express-async-handler";
import Order from "../models/orderModel.js";

export const placeOrder = expressAsyncHander(async (req, res) => {
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

export const getOrderById = expressAsyncHander(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    res.status(404).send({ message: "Order not found!!!!" });
  } else {
    res.status(200).send(order);
  }
});

export const getMineOrders = expressAsyncHander(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    res.status(404).send({ message: "Orders not found!!!!" });
  } else {
    res.status(200).send(orders);
  }
});

export const payOrder = expressAsyncHander(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      paymentID: req.body.id,
      status: req.body.status,
      payerID: req.body.payer.payer_id,
      payerEmailAddress: req.body.payer.email_address,
      payerCountryCode: req.body.payer.address.country_code,
      payerFullName:
        req.body.payer.name.given_name + " " + req.body.payer.name.surname,
      update_time: req.body.update_time,
      create_time: req.body.create_time,
    };
    const updatedOrder = await order.save();
    res
      .status(200)
      .send({ message: "Order Paid successfully.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export const getListOrders = expressAsyncHander(async (req, res) => {
  const listOrders = await Order.find({}).populate("user", "name");
  res.status(200).send({ listOrders });
});

export const deleteOrder = expressAsyncHander(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order) {
    const orderDeleted = await order.remove();
    res.status(200).send({
      message: "Order deleted successfully",
      order: orderDeleted,
    });
  } else {
    res.status(404).send({ message: "Order not Found" });
  }
});

export const deliverOrder = expressAsyncHander(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res
      .status(200)
      .send({ message: "Order Delivered successfully.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
