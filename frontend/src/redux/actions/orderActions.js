import axios from "axios";
import { CART_EMPTY_ITEM } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: "/v1/api/orders",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: order
    });
    console.log('createOrder response: ', response)
    if (response.statusText !== "Created") {
      dispatch({ type: ORDER_CREATE_FAIL });
    } else {
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: response.data.order,
      });
      dispatch({
        type: CART_EMPTY_ITEM,
      });
      localStorage.removeItem("cartItems");
    }
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
