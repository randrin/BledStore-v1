import { ADD_PAYMENT_METHOD } from "../constants/paymentConstants";

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: ADD_PAYMENT_METHOD,
    payload: data,
  });
};
