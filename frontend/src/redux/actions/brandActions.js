import axios from "axios";
import {
  BRAND_ACTIVATION_FAIL,
  BRAND_ACTIVATION_REQUEST,
  BRAND_ACTIVATION_SUCCESS,
  BRAND_CREATE_FAIL,
  BRAND_CREATE_REQUEST,
  BRAND_CREATE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_DELETE_REQUEST,
  BRAND_DELETE_SUCCESS,
  BRAND_DETAIL_FAIL,
  BRAND_DETAIL_REQUEST,
  BRAND_DETAIL_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
} from "../constants/brandConstants";

export const listBrands = () => async (dispatch) => {
  dispatch({
    type: BRAND_LIST_REQUEST,
  });
  try {
    const response = await axios({
      url: `/v1/api/brands`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({ type: BRAND_LIST_FAIL, error: "Something went wrong !!!" });
    } else {
      dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: response.data.listBrands,
      });
    }
  } catch (error) {
    dispatch({ type: BRAND_LIST_FAIL, payload: error.message });
  }
};

export const createBrand = (brand) => async (dispatch, getState) => {
  dispatch({
    type: BRAND_CREATE_REQUEST,
    payload: brand,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: "/v1/api/brands/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: brand,
    });
    if (response.statusText !== "Created") {
      dispatch({ type: BRAND_CREATE_FAIL });
    } else {
      dispatch({
        type: BRAND_CREATE_SUCCESS,
        payload: response.data.brand,
      });
    }
  } catch (error) {
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBrandById = (brandId) => async (dispatch) => {
  dispatch({
    type: BRAND_DETAIL_REQUEST,
    payload: brandId,
  });
  try {
    const response = await axios({
      url: `/v1/api/brands/${brandId}`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      dispatch({
        type: BRAND_DETAIL_FAIL,
        error: "Something went wrong !!!",
      });
    } else {
      dispatch({ type: BRAND_DETAIL_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: BRAND_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBrand = (brand) => async (dispatch, getState) => {
  dispatch({
    type: BRAND_UPDATE_REQUEST,
    payload: brand,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/brands/${brand._id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: brand,
    });
    if (response.statusText !== "OK") {
      dispatch({ type: BRAND_UPDATE_FAIL });
    } else {
      dispatch({
        type: BRAND_UPDATE_SUCCESS,
        payload: response.data.brand,
      });
    }
  } catch (error) {
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const activationBrand = (brandId) => async (dispatch, getState) => {
  dispatch({
    type: BRAND_ACTIVATION_REQUEST,
    payload: brandId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/brands/activation/${brandId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: BRAND_ACTIVATION_FAIL });
    } else {
      dispatch({
        type: BRAND_ACTIVATION_SUCCESS,
        payload: response.data.brand,
      });
    }
  } catch (error) {
    dispatch({
      type: BRAND_ACTIVATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBrand = (brandId) => async (dispatch, getState) => {
  dispatch({
    type: BRAND_DELETE_REQUEST,
    payload: brandId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const response = await axios({
      url: `/v1/api/brands/${brandId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response.statusText !== "OK") {
      dispatch({ type: BRAND_DELETE_FAIL });
    } else {
      dispatch({
        type: BRAND_DELETE_SUCCESS,
        payload: response.data.BRAND,
      });
    }
  } catch (error) {
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
