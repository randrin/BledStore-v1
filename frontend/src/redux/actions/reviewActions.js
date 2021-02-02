import axios from "axios";
import {
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
} from "../constants/reviewConstants";

export const createCommentReview = (productId, review) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: REVIEW_CREATE_REQUEST,
    payload: productId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/reviews/${productId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: review,
    });
    if (response.statusText !== "Created") {
      dispatch({ type: REVIEW_CREATE_FAIL });
    } else {
      dispatch({
        type: REVIEW_CREATE_SUCCESS,
        payload: response.data.review,
      });
    }
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
