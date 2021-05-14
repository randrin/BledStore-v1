import axios from "axios";
import {
  ADD_PAYMENT_FAIL,
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_SUCCESS,
} from "../constants/paymentConstants";

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: ADD_PAYMENT_METHOD,
    payload: data,
  });
};

export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ADD_PAYMENT_REQUEST,
    payload: order,
    paymentResult,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/orders/${order._id}/pay`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {order, paymentResult},
    });
    if (response.statusText !== "OK") {
      dispatch({ type: ADD_PAYMENT_FAIL, error: "Something went wrong !!!" });
    } else {
      dispatch({ type: ADD_PAYMENT_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: ADD_PAYMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
