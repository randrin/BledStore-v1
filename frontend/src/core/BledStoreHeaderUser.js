import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/userActions";

const BledStoreHeaderUser = ({ userInfo }) => {
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <>
      {userInfo ? (
        <div className="dropdown">
          <Link to="#">
            {userInfo.pseudo} <i className="fa fa-caret-down"></i>{" "}
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/profile">
                <i className="fa fa-user-circle-o"></i> User Profile
              </Link>
            </li>
            <li>
              <Link to="/orders/history">
                <i className="fa fa-list"></i> Order History
              </Link>
            </li>
            <li>
              <Link to="#signout" onClick={signoutHandler}>
                <i className="fa fa-power-off"></i> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/signin" className="header-right-signin">
          <img
            className="header-right-signin-img-new-user"
            src="/assets/images/svg/new-user.svg"
            alt="New User"
          />
          <img
            className="header-right-signin-img-new-user-hover"
            src="/assets/images/svg/new-user-hover.svg"
            alt="New User Hover"
          />
          <span className="header-right-signin-title">Sign In</span>
        </Link>
      )}
      {userInfo && userInfo.isSeller && (
        <div className="dropdown">
          <Link to="#admin">
            Seller <i className="fa fa-caret-down"></i>
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/productlist/seller">
                {" "}
                <i className="fa fa-shopping-bag"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/orderlist/seller">
                <i className="fa fa-gift"></i> Orders
              </Link>
            </li>
          </ul>
        </div>
      )}
      {userInfo && userInfo.isAdmin && (
        <div className="dropdown">
          <Link to="#admin">
            Admin <i className="fa fa-caret-down"></i>
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/dashboard">
                <i className="fa fa-pie-chart"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/productlist">
                <i className="fa fa-shopping-bag"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/orderlist">
                <i className="fa fa-gift"></i> Orders
              </Link>
            </li>
            <li>
              <Link to="/userlist">
                <i className="fa fa-users"></i> Users
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default BledStoreHeaderUser;
