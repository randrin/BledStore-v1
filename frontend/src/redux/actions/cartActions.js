import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const product = await axios({
    url: `/v1/api/products/${productId}`,
    method: "GET",
  });
  console.log('product: ', product)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: product.data.name,
      image: product.data.image,
      price: product.data.price,
      countInStock: product.data.countInStock,
      product: product.data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
