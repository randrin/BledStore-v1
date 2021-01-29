import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: {
      email,
      password,
    },
  });
  try {
    const response = await axios({
      url: "/v1/api/users/signin",
      method: "POST",
      data: {
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: USER_SIGNIN_FAIL });
    } else {
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("userInfos", JSON.stringify(response.data));
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfos");
  localStorage.removeItem("cartItems");
  dispatch({ type: USER_SIGNOUT });
};
