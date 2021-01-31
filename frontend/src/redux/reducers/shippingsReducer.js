import { ADD_SHIPPING_ADDRESS } from "../constants/shippingConstants.js";

export const shippingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};
