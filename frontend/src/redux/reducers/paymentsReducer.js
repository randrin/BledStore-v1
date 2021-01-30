import { ADD_PAYMENT_METHOD } from "../constants/paymentConstants";

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
