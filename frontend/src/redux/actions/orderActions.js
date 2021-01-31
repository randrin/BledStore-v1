import axios from "axios";
import { CART_EMPTY_ITEM } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
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
      data: order,
    });
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

export const getOrderById = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAIL_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/orders/${orderId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: ORDER_DETAIL_FAIL, error: "Something went wrong !!!" });
    } else {
      dispatch({ type: ORDER_DETAIL_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrderList = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_MINE_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/orders/mine`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: ORDER_MINE_LIST_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/orders`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: ORDER_LIST_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: ORDER_LIST_SUCCESS, payload: response.data.listOrders });
    }
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DELETE_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/orders/${orderId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: ORDER_DELETE_FAIL });
    } else {
      dispatch({
        type: ORDER_DELETE_SUCCESS,
        payload: response.data.order,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
