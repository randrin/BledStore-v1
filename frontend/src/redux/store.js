import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartsReducer";
import { categoriesReducer } from "./reducers/categoriesReducer";
import { orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderMineReducer, orderReducer, ordersReducer } from "./reducers/ordersReducer";
import { paymentOrderReducer, paymentReducer } from "./reducers/paymentsReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productsReducer,
  productUpdateReducer,
} from "./reducers/productsReducer";
import { reviewsReducer } from "./reducers/reviewsReducer";
import { shippingReducer } from "./reducers/shippingsReducer";
import { userDeleteReducer, userDetailsReducer, userDetailsUpdateReducer, userSigninReducer, userSignupReducer, usersReducer, usersToSellersReducer, userUpdateReducer } from "./reducers/usersReducer";

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
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  usersList: usersReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  usersToSellers: usersToSellersReducer,
  shippingAddress: shippingReducer,
  paymentMethod: paymentReducer,
  paymentOrder: paymentOrderReducer,
  ordersList: ordersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  categoriesList: categoriesReducer,
  reviews: reviewsReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
