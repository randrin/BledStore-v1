export const CART_ADD_ITEM_FAIL = "CART_ADD_ITEM_FAIL";
export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_EMPTY_ITEM = "CART_EMPTY_ITEM";
export const CART_ADD_ITEM_REQUEST = "CART_ADD_ITEM_REQUEST";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          loading: false,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        loading: false,
        error: "",
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_EMPTY_ITEM:
      return { ...state, loading: false, error: "", cartItems: [] };
    case CART_ADD_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
