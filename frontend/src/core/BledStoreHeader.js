import React from "react";
import { Link } from "react-router-dom";

const BledStoreHeader = () => {
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          amazona
        </Link>
      </div>
      <div>
        <a href="cart.html">Cart</a>
        <a href="signin.html">Sign In</a>
      </div>
    </header>
  );
};

export default BledStoreHeader;
