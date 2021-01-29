import jwt from "jsonwebtoken";
import config from "./config.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pseudo: user.pseudo,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};
