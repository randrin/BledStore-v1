import {
  ADD_PAYMENT_FAIL,
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_REQUEST,
  ADD_PAYMENT_RESET,
  ADD_PAYMENT_SUCCESS,
} from "../constants/paymentConstants";

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export const paymentOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAYMENT_REQUEST:
      return { loading: true };
    case ADD_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case ADD_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
