import {
  SELLER_DETAILS_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_RESET,
  SELLER_DETAILS_SUCCESS,
} from "../constants/sellerConstants";

export const sellerDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return { loading: true };
    case SELLER_DETAILS_SUCCESS:
      return { loading: false, seller: action.payload };
    case SELLER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_DETAILS_RESET:
      return { loading: true };
    default:
      return state;
  }
};
