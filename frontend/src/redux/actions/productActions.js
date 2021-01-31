import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const response = await axios({
      url: "/v1/api/products",
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({ type: PRODUCT_LIST_FAIL, error: "Something went wrong !!!" });
    } else {
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: response.data.listProducts,
      });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
    payload: productId,
  });
  try {
    const response = await axios({
      url: `/v1/api/products/${productId}`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: "/v1/api/products",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      // data: order,
    });
    if (response.statusText !== "Created") {
      dispatch({ type: PRODUCT_CREATE_FAIL });
    } else {
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: response.data.product,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
