import axios from "axios";
import {
  CATEGORY_ACTIVATION_FAIL,
  CATEGORY_ACTIVATION_REQUEST,
  CATEGORY_ACTIVATION_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
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

export const createCategory = (category) => async (dispatch, getState) => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST,
    payload: category,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: "/v1/api/categories/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: category,
    });
    if (response.statusText !== "Created") {
      dispatch({ type: CATEGORY_CREATE_FAIL });
    } else {
      dispatch({
        type: CATEGORY_CREATE_SUCCESS,
        payload: response.data.category,
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryById = (categoryId) => async (dispatch) => {
  dispatch({
    type: CATEGORY_DETAIL_REQUEST,
    payload: categoryId,
  });
  try {
    const response = await axios({
      url: `/v1/api/categories/${categoryId}`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: CATEGORY_DETAIL_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory = (category) => async (dispatch, getState) => {
  dispatch({
    type: CATEGORY_UPDATE_REQUEST,
    payload: category,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/categories/${category._id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: category,
    });
    if (response.statusText !== "OK") {
      dispatch({ type: CATEGORY_UPDATE_FAIL });
    } else {
      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
        payload: response.data.category,
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const activationCategory = (categoryId) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CATEGORY_ACTIVATION_REQUEST,
    payload: categoryId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/categories/activation/${categoryId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: CATEGORY_ACTIVATION_FAIL });
    } else {
      dispatch({
        type: CATEGORY_ACTIVATION_SUCCESS,
        payload: response.data.category,
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_ACTIVATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  dispatch({
    type: CATEGORY_DELETE_REQUEST,
    payload: categoryId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/categories/${categoryId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: CATEGORY_DELETE_FAIL });
    } else {
      dispatch({
        type: CATEGORY_DELETE_SUCCESS,
        payload: response.data.category,
      });
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

