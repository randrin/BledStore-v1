import jwt from "jsonwebtoken";
import config from "./config.js";

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
