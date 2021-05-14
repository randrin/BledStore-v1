import jwt from "jsonwebtoken";
import config from "./config.js";
import mg from "mailgun-js";
import Product from "./models/productModel.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      pseudo: user.pseudo,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: "Token is not supplied" });
  } else {
    const token = bearerToken.slice(7, bearerToken.length); // Bearer xxxxxx
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Token is not valid for admin user" });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Token is not valid for seller user" });
  }
};

export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res
      .status(401)
      .send({ message: "Token is not valid for admin/seller user" });
  }
};

export const decreaseQuantity = (req, res, next) => {
  console.log("req.body: ", JSON.stringify(req.body.orderItems[0]))
  let bulkOps = req.body.orderItems.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { countInStock: -item.qty, countInSold: +item.qty } },
      },
    };
  });

  console.log("bulkOps: ", bulkOps)
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};

export const mailgun = () =>
  mg({
    apiKey: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Thanks you for shopping with us</h1>
  <p>Hi ${order.user.name},</p>
  <p>We have finished processing your order</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
    <thead>
      <tr>
        <td><strong>Product</strong></td>
        <td><strong>Quantity</strong></td>
        <td><strong align="right">Price</strong></td>
      </tr>
    </thead>
    <tbody>
    ${order.orderItems
      .map(
        (item) => `
      <tr>
        <td>${item.name}</td>
        <td align="center">${item.qty}</td>
        <td align="right">${item.price.toFixed(2)} €</td>
      </tr>
    `
      )
      .join("\n")}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Items Price:</td>
        <td align="right">${order.itemsPrice.toFixed(2)} €</td>
      </tr>
      <tr>
        <td colspan="2">Tax Price:</td>
        <td align="right">${order.taxPrice.toFixed(2)} €</td>
      </tr>
      <tr>
        <td colspan="2">Shipping Price:</td>
        <td align="right">${order.shippingPrice.toFixed(2)} €</td>
      </tr>
      <tr>
        <td colspan="2">Total Price:</td>
        <td align="right"><strong>${order.totalPrice.toFixed(2)} €</strong></td>
      </tr>
      <tr>
        <td colspan="2">Payment Method:</td>
        <td align="right"><strong>${order.paymentMethod}</strong></td>
      </tr>
    </tfoot>
  </table>
  <h2>Shipping Address</h2>
  <p>
    ${order.shippingAddress.fullName}, <br/>
    ${order.shippingAddress.address}, <br/>
    ${order.shippingAddress.city}, <br/>
    ${order.shippingAddress.country}, <br/>
    ${order.shippingAddress.postalCode}, <br/>
  </p>
  <hr/>
  <p>Thanks for shopping with us.</p>
  `;
};
