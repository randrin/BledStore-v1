import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
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
