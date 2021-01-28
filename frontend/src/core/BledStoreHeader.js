import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BledStoreHeader = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart: ", cartItems);
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          amazona
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="cart-items">
            {cartItems.length > 0 ? cartItems.length : 0}
          </span>
        </Link>
        <Link to="/signin"><i className="fa fa-user-circle"></i> Sign In</Link>
      </div>
    </header>
  );
};

export default BledStoreHeader;
