import { ADD_SHIPPING_ADDRESS } from "../constants/shippingConstants";

export const shippingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};
