import axios from "axios";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

export const listCagetories = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_REQUEST,
  });
  try {
    const response = await axios({
      url: `/v1/api/categories`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({ type: CATEGORY_LIST_FAIL, error: "Something went wrong !!!" });
    } else {
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: response.data.listCategories,
      });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};
