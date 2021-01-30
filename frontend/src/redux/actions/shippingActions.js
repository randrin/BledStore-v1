import { ADD_SHIPPING_ADDRESS } from "../constants/shippingConstants";

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: ADD_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
