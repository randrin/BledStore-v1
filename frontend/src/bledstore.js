import React from "react";
import Product from "./components/Product";
import products from "./data";

const BledStore = () => {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">
            amazona
          </a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {products.products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
};

export default BledStore;
