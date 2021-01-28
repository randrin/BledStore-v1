import axios from "axios";
import { CART_ADD_ITEM } from "../constants/CartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios({
    url: `/v1/api/products/${productId}`,
    method: "GET",
  });
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
