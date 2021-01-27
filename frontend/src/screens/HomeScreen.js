import React from "react";
import Product from "../components/Product";
import products from "../data";

const HomeScreen = () => {
  return (
    <main>
      <div className="row center">
        {products.products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomeScreen;
