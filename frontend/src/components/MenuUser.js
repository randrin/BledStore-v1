import React from "react";
import { Link } from "react-router-dom";

const MenuUser = ({ user }) => {
  console.log("User: ", user);

  return (
    <div className="main-user-container">
      <div className="main-user-profile">
        {user ? (
          <>
            <div className="main-user-profile-pseudo">
              <span>
                {user.name.split(" ")[0].substring(0, 1)}
                {user.name.split(" ")[1]
                  ? user.name.split(" ")[1].substring(0, 1)
                  : user.name.split(" ")[0].substring(1, 2)}
              </span>
            </div>
            <h2 className="main-user-profile-title">
              Welcome back, {user.pseudo}
            </h2>
          </>
        ) : (
          <>
            <img
              src="/assets/images/avatar.jpg"
              alt="Default Avater"
              className="main-user-profile-img"
            />
            <h2 className="main-user-profile-title">
              Welcome to Aurelando Shop
            </h2>
          </>
        )}
      </div>
      {user ? (
        <div className="main-user-menu-links">
          <div className="main-user-menu-link">
            <Link to="/profile">
              <i className="fas fa-user-alt main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Account</span>
            </Link>
          </div>
          <div className="main-user-menu-link">
            <Link to="/orders/history">
              <i className="fas fa-clipboard-list main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Orders</span>
            </Link>
          </div>
          <div className="main-user-menu-link">
            <Link to="/messages">
              <i className="fas fa-comment-dots main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Messages</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="main-user-links">
          <Link to="/register" className="main-user-link">
            Join Us
          </Link>
          <Link to="/signin" className="main-user-link">
            Sign In
          </Link>
        </div>
      )}
      <div className="main-user-content"></div>
    </div>
  );
};

export default MenuUser;
