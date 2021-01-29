import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
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

export const signup = (pseudo, name, email, phone, password) => async (
  dispatch
) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: {
      pseudo,
      name,
      email,
      phone,
      password,
    },
  });
  try {
    const response = await axios({
      url: "/v1/api/users/signup",
      method: "POST",
      data: {
        pseudo,
        name,
        email,
        phone,
        password,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: USER_SIGNUP_FAIL });
    } else {
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: response.data,
      });
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