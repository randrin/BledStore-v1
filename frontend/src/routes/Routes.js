import React from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "../components/Error404";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";

const Routes = () => (
    <Switch>
      <Route exact path="/" strict component={HomeScreen} />
      <Route exact path="/product/:productId" strict component={ProductScreen} />
      <Route exact path="/cart/:productId?" strict component={CartScreen} />
      {/* <Route exact path="/signin" strict component={Signin} />
      <Route exact path="/signup" strict component={Signup} />
      <Route exact path="/shop" strict component={Shop} />
      <Route exact path="/cart" strict component={Cart} />
      <PrivateRoute exact path="/user/dashboard" strict component={UserDashboard} />
      <AdminRoute exact path="/admin/products" strict component={ManageProducts} />
      <PrivateRoute exact path="/profile/:userId" strict component={Profile} />
      <AdminRoute exact path="/admin/dashboard" strict component={AdminDashboard} />
      <AdminRoute exact path="/create/category" strict component={AddCategory} />
      <AdminRoute exact path="/create/product" strict component={AddProduct} />
      <AdminRoute exact path="/admin/product/update/:productId" strict component={UpdateProduct} />
      <AdminRoute exact path="/admin/orders" strict component={Orders} />*/}
      <Route component={Error404} /> 
    </Switch>
  );

  export default Routes;