import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productDetailsReducer, productsReducer } from "./reducers/productsReducer";

const initialState = {};
const reducer = combineReducers({
  productsList: productsReducer,
  productDetails: productDetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
