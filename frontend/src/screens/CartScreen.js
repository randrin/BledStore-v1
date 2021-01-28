import React from "react";

const CartScreen = (props) => {
  const productId = props.match.params.productId;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add To Cart: Product ID: {productId}, qty: {qty}
      </p>
    </div>
  );
};

export default CartScreen;
