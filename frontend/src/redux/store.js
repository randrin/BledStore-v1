import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  brandActivationReducer,
  brandCreateReducer,
  brandDeleteReducer,
  brandDetailsReducer,
  brandsReducer,
  brandUpdateReducer,
} from "./reducers/brandsReducer";
import { cartReducer } from "./reducers/cartsReducer";
import {
  categoriesReducer,
  categoryActivationReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryUpdateReducer,
} from "./reducers/categoriesReducer";
import { dashboardItemsReducer } from "./reducers/dashboardsReducer";
import {
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderMineReducer,
  orderReducer,
  ordersReducer,
} from "./reducers/ordersReducer";
import {
  paymentOrderReducer,
  paymentReducer,
} from "./reducers/paymentsReducer";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productsReducer,
  productsRelatedReducer,
  productUpdateReducer,
} from "./reducers/productsReducer";
import { reviewsReducer } from "./reducers/reviewsReducer";
import { sellerDetailsReducer } from "./reducers/sellersReducer";
import { shippingReducer } from "./reducers/shippingsReducer";
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  usersReducer,
  usersToSellersReducer,
  userSubscriptionReducer,
  userUpdateReducer,
} from "./reducers/usersReducer";

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
    paymentMethod: "PayPal",
  },
};
const reducer = combineReducers({
  dashboardItems: dashboardItemsReducer,
  productsList: productsReducer,
  productsListRelated: productsRelatedReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  usersList: usersReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userResetPassword: userResetPasswordReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  usersToSellers: usersToSellersReducer,
  userAddressMap: userAddressMapReducer,
  userSubscription: userSubscriptionReducer,
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
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryActivation: categoryActivationReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDetails: categoryDetailsReducer,
  reviews: reviewsReducer,
  sellerDetails: sellerDetailsReducer,
  brandsList: brandsReducer,
  brandCreate: brandCreateReducer,
  brandDelete: brandDeleteReducer,
  brandActivation: brandActivationReducer,
  brandUpdate: brandUpdateReducer,
  brandDetails: brandDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
