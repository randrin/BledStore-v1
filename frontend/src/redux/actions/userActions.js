import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
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
    if (response.statusText !== "Created") {
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

export const getProfileUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
    payload: userId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/users/${userId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: USER_DETAILS_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfileUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_DETAILS_REQUEST,
    payload: user,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/users/profile`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: user,
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: USER_UPDATE_DETAILS_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: response.data });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: response.data,
      });
      localStorage.setItem("userInfos", JSON.stringify(response.data));
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/users`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: USER_LIST_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: USER_LIST_SUCCESS, payload: response.data.listUsers });
    }
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_REQUEST,
    payload: userId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/users/${userId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: USER_DELETE_FAIL });
    } else {
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: response.data.order,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
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
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};
