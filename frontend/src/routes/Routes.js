import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "../components/Error404";
import AdminRoute from "../core/AdminRoute";
import PrivateRoute from "../core/PrivateRoute";
import CartScreen from "../screens/CartScreen";
import ProductCreateScreen from "../screens/dashboard/products/ProductCreateScreen";
import ProductEditScreen from "../screens/dashboard/products/ProductEditScreen";
import ProductListScreen from "../screens/dashboard/products/ProductListScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderHistoryScreeen from "../screens/OrderHistoryScreeen";
import OrderScreen from "../screens/OrderScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ProductScreen from "../screens/ProductScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterSreeen";
import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import SigninScreen from "../screens/SigninScreen";

const Routes = () => (
  <Switch>
    <Route exact path="/" strict component={HomeScreen} />
    <Route exact path="/product/:productId" strict component={ProductScreen} />
    <Route exact path="/product/:productId/edit" strict component={ProductEditScreen} />
    <Route exact path="/cart/:productId?" strict component={CartScreen} />
    <Route exact path="/signin" strict component={SigninScreen} />
    <Route exact path="/register" strict component={RegisterScreen} />
    <Route exact path="/shipping" strict component={ShippingAddressScreen} />
    <Route exact path="/payment" strict component={PaymentMethodScreen} />
    <Route exact path="/placeorder" strict component={PlaceOrderScreen} />
    <Route exact path="/order/:orderId" strict component={OrderScreen} />
    <Route exact path="/orders/history" strict component={OrderHistoryScreeen} />
    <PrivateRoute exact path="/profile" strict component={ProfileScreen} />
    <AdminRoute exact path="/productlist" strict component={ProductListScreen} />
    <AdminRoute exact path="/create/product" strict component={ProductCreateScreen} />
    <Route component={Error404} />
  </Switch>
);

export default Routes;
