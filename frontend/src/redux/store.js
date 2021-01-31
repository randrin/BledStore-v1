import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartsReducer";
import { orderDetailsReducer, orderMineReducer, orderReducer } from "./reducers/ordersReducer";
import { paymentOrderReducer, paymentReducer } from "./reducers/paymentsReducer";
import {
  productCreateReducer,
  productDetailsReducer,
  productsReducer,
} from "./reducers/productsReducer";
import { shippingReducer } from "./reducers/shippingsReducer";
import { userDetailsReducer, userDetailsUpdateReducer, userSigninReducer, userSignupReducer } from "./reducers/usersReducer";

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
  productCreate: productCreateReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  shippingAddress: shippingReducer,
  paymentMethod: paymentReducer,
  paymentOrder: paymentOrderReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
