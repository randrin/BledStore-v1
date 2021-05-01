import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions/userActions";
import { Modal } from 'react-responsive-modal';
import LogoutModal from "../components/Modal/LogoutModal";

const BledStoreHeaderUser = ({ userInfo }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const goToPageHandler = (url) => {
    window.location.href = "/" + url;
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="header-right-signin">
      <div className="header-right-signin-content">
        <img
          className="header-right-signin-img-new-user"
          src="/assets/images/svg/new-user.svg"
          alt="New User"
          width="40"
        />
        <img
          className="header-right-signin-img-new-user-hover"
          src="/assets/images/svg/new-user-hover.svg"
          alt="New User Hover"
          width="40"
        />
        <div className="header-right-signin-title">
          {userInfo ? (
            <Link to="/profile" className="header-right-signin-title-link">
              Hi {userInfo.pseudo}
            </Link>
          ) : (
            <>
              <Link to="/signin" className="header-right-signin-title-link">
                Sign In
              </Link>
              <span className="header-right-signin-title-delimiter">|</span>
              <Link to="/register" className="header-right-signin-title-link">
                Register Now
              </Link>
            </>
          )}
          <p className="header-right-signin-subtitle">My Aurelando Shop</p>
        </div>
      </div>
      <div className="header-right-signin-hover-container">
        {userInfo ? (
          <>
            {userInfo.isAdmin && (
              <div className="header-right-signin-hover-user">
                <p>Bingoo {userInfo.pseudo}, you are Admin</p>
                <button
                  className="header-right-signin-hover-btn primary"
                  onClick={() => goToPageHandler("dashboard")}
                >
                  <i className="far fa-list-alt"></i> Admin Dashboard{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            )}
            {userInfo.isSeller && (
              <div className="header-right-signin-hover-user">
                <p>Bingoo {userInfo.pseudo}, you are Seller</p>
                <button
                  className="header-right-signin-hover-btn primary"
                  onClick={() => goToPageHandler("productlist/seller")}
                >
                  <i className="fas fa-user-check"></i> Seller Dashboard{" "}
                  <i className="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            )}
            <div className="header-right-signin-hover-user">
              <p>Leave Aurelando.com ?</p>
              <button
                className="header-right-signin-hover-btn primary"
                onClick={onOpenModal}
              >
                <i className="fas fa-power-off"></i> Sign Out
              </button>
              <Modal open={open} onClose={onCloseModal} center>
                <LogoutModal onCloseModal={onCloseModal} signoutHandler={signoutHandler} />
              </Modal>
            </div>
          </>
        ) : (
          <>
            <div className="header-right-signin-hover-user">
              <p>Welcome to Aurelando.com</p>
              <button
                className="header-right-signin-hover-btn primary"
                onClick={() => goToPageHandler("signin")}
              >
                Sign In <i className="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
            <div className="header-right-signin-hover-user">
              <p>New User in Aurelando.com ?</p>
              <button
                className="header-right-signin-hover-btn primary"
                onClick={() => goToPageHandler("register")}
              >
                Register Free <i className="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </>
        )}
        <div className="header-right-signin-hover-menu">
          <ul className="header-right-signin-hover-menu-items">
            <li className="header-right-signin-hover-menu-item">
              <Link to="/profile">
                <i className="fas fa-store"></i> <span>My AurelandoShop</span>
              </Link>
            </li>
            <li className="header-right-signin-hover-menu-item">
              <Link to="#">
                <i className="fas fa-tags"></i> <span>My Advantages</span>
              </Link>
            </li>
            <li className="header-right-signin-hover-menu-item">
              <Link to="/orders/history">
                <i className="	fas fa-gifts"></i> <span>My Orders</span>
              </Link>
            </li>
            <li className="header-right-signin-hover-menu-item">
              <Link to="#">
                <i className="fas fa-truck"></i>{" "}
                <span>Track, Cancel or Return an Order</span>
              </Link>
            </li>
            <li className="header-right-signin-hover-menu-item">
              <Link to="#">
                <i className="fas fa-percentage"></i> <span>My Coupons</span>
              </Link>
            </li>
            <li className="header-right-signin-hover-menu-item">
              <Link to="/support">
                <i className="fas fa-question-circle"></i>{" "}
                <span>Center Messages</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BledStoreHeaderUser;
