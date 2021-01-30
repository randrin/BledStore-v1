import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/userActions";

const BledStoreHeader = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

  const { cartItems } = cart;
  const { userInfo } = user;

  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {}, [cart]);
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          amazona
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <i className="fa fa-shopping-cart"></i>{" "}
          <span className="cart-items">
            {cartItems.length > 0 ? cartItems.length : 0}
          </span>
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.pseudo} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <li>
                <Link to="#signout" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#admin">
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/productlist">Products</Link>
              </li>
              <li>
                <Link to="/orderlist">Orders</Link>
              </li>
              <li>
                <Link to="/userlist">Users</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default BledStoreHeader;
