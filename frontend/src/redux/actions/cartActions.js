import axios from "axios";
export const CART_ADD_ITEM_REQUEST = "CART_ADD_ITEM_REQUEST";
export const CART_ADD_ITEM_FAIL = "CART_ADD_ITEM_FAIL";
export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const product = await axios({
    url: `/v1/api/products/${productId}`,
    method: "GET",
  });
  const {
    cart: { cartItems },
  } = getState();
  dispatch({
    type: CART_ADD_ITEM_REQUEST,
    payload: productId,
  });
  if (
    cartItems.length > 0 &&
    product.data.seller._id !== cartItems[0].seller._id
  ) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't add to Cart.  Buy only from ${cartItems[0].seller.seller.name} in this order`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: product.data.name,
        image: product.data.image,
        price: product.data.price,
        discountPrice: product.data.discountPrice,
        countInStock: product.data.countInStock,
        product: product.data._id,
        seller: product.data.seller,
        qty,
      },
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM_REQUEST,
    payload: productId,
  });
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
