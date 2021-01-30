import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartsReducer";
import { orderDetailsReducer, orderReducer } from "./reducers/ordersReducer";
import { paymentReducer } from "./reducers/paymentsReducer";
import {
  productDetailsReducer,
  productsReducer,
} from "./reducers/productsReducer";
import { shippingReducer } from "./reducers/shippingsReducer";
import { userSigninReducer, userSignupReducer } from "./reducers/usersReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfos")
      ? JSON.parse(localStorage.getItem("userInfos"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  shippingAddress: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
  paymentMethod: {
    paymentMethod: "PayPal"
  }
};
const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  shippingAddress: shippingReducer,
  paymentMethod: paymentReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
