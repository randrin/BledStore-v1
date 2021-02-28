import {
  CATEGORY_ACTIVATION_FAIL,
  CATEGORY_ACTIVATION_REQUEST,
  CATEGORY_ACTIVATION_RESET,
  CATEGORY_ACTIVATION_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/categoryConstants";

export const categoriesReducer = (
  state = { categories: [], loading: true },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryActivationReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ACTIVATION_REQUEST:
      return { loading: true };
    case CATEGORY_ACTIVATION_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_ACTIVATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_ACTIVATION_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { categories: {}, loading: true },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { loading: true };
    case CATEGORY_DETAIL_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
