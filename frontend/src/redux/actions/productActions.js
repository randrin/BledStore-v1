import axios from "axios";
import {
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
      dispatch({ type: PRODUCT_LIST_FAIL, error: "Somethig went wrong !!!" });
    } else {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
