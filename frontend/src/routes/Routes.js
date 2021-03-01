import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "../components/Error404";
import AdminRoute from "../core/AdminRoute";
import SellerRoute from "../core/SellerRoute";
import PrivateRoute from "../core/PrivateRoute";
import CartScreen from "../screens/store/cart/CartScreen";
import OrderListScreen from "../screens/dashboard/orders/OrderListScreen";
import ProductCreateScreen from "../screens/dashboard/products/ProductCreateScreen";
import ProductEditScreen from "../screens/dashboard/products/ProductEditScreen";
import ProductListScreen from "../screens/dashboard/products/ProductListScreen";
import HomeScreen from "../screens/store/HomeScreen";
import OrderHistoryScreeen from "../screens/store/order/OrderHistoryScreeen";
import OrderScreen from "../screens/store/order/OrderScreen";
import PaymentMethodScreen from "../screens/store/cart/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/store/order/PlaceOrderScreen";
import ProductScreen from "../screens/store/product/ProductScreen";
import ProfileScreen from "../screens/store/user/ProfileScreen";
import RegisterScreen from "../screens/store/auth/RegisterSreeen";
import ShippingAddressScreen from "../screens/store/cart/ShippingAddressScreen";
import SigninScreen from "../screens/store/auth/SigninScreen";
import UserEditScreen from "../screens/store/user/UserEditScreen";
import UserListScreen from "../screens/store/user/UserListScreen";
import SellerScreen from "../screens/store/seller/SellerScreen";
import SellerOrAdminRoute from "../core/SellerOrAdminRoute";
import SearchScreen from "../screens/store/product/SearchScreen";
import MapScreen from "../screens/store/cart/MapScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import CategoryCreateScreen from "../screens/dashboard/categories/CategoryCreateScreen";
import CategoryListScreen from "../screens/dashboard/categories/CategoryListScreen";
import CategoryEditScreen from "../screens/dashboard/categories/CategoryEditScreen";

const Routes = () => (
  <Switch>
    <Route exact path="/" strict component={HomeScreen} />
    <Route exact path="/page/:pageNumber/size/:pageSize" strict component={HomeScreen} />
    <Route exact path="/product/:productId" strict component={ProductScreen} />
    <Route exact path="/product/:productId/edit" strict component={ProductEditScreen} />
    <AdminRoute exact path="/category/:categoryId/edit" strict component={CategoryEditScreen} />
    <Route exact path="/cart/:productId?" strict component={CartScreen} />
    <Route exact path="/signin" strict component={SigninScreen} />
    <Route exact path="/register" strict component={RegisterScreen} />
    <Route exact path="/shipping" strict component={ShippingAddressScreen} />
    <Route exact path="/payment" strict component={PaymentMethodScreen} />
    <AdminRoute exact path="/dashboard" strict component={DashboardScreen} />
    <Route exact path="/placeorder" strict component={PlaceOrderScreen} />
    <PrivateRoute exact path="/order/:orderId" strict component={OrderScreen} />
    <Route exact path="/orders/history" strict component={OrderHistoryScreeen} />
    <PrivateRoute exact path="/profile" strict component={ProfileScreen} />
    <PrivateRoute exact path="/map" strict component={MapScreen} />
    <AdminRoute exact path="/productlist" strict component={ProductListScreen} />
    <AdminRoute exact path="/categorylist" strict component={CategoryListScreen} />
    <AdminRoute exact path="/productlist/page/:pageNumber/size/:pageSize" strict component={ProductListScreen} />
    <SellerRoute exact path="/productlist/seller" strict component={ProductListScreen} />
    <SellerOrAdminRoute exact path="/create/product" strict component={ProductCreateScreen} />
    <AdminRoute exact path="/create/category" strict component={CategoryCreateScreen} />
    <AdminRoute exact path="/orderlist" strict component={OrderListScreen} />
    <AdminRoute exact path="/userlist" strict component={UserListScreen} /> 
    <SellerRoute exact path="/orderlist/seller" strict component={OrderListScreen} /> 
    <AdminRoute exact path="/user/:userId/edit" strict component={UserEditScreen} />
    <Route exact path="/seller/:sellerId/page/:pageNumber/size/:pageSize" strict component={SellerScreen} />
    <Route exact path="/seller/:sellerId" strict component={SellerScreen} />
    <Route exact path="/search/name/:name?" strict component={SearchScreen} />
    <Route exact path="/search/category/:category" strict component={SearchScreen} />
    <Route exact path="/search/category/:category/name/:name" strict component={SearchScreen} />
    <Route exact path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/size/:pageSize/page/:pageNumber" strict component={SearchScreen} />
    <Route component={Error404} />
  </Switch>
);

export default Routes;
