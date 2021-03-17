import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { signout } from "../redux/actions/userActions";
import { listCagetories } from "../redux/actions/categoryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const BledStoreHeader = () => {
  const dispatch = useDispatch();

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listCagetories());
  }, [dispatch]);

  const goToShopping = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <>
      <header className="header-wrapper row">
        <div className="header-left">
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link className="brand" to="/">
            BledStore <span>v1</span>
          </Link>
        </div>
        <div className="search-wrapper">
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
        <div className="header-right">
          <Link to="/cart" className="header-right-cart">
            <div className="header-right-cart-items">
              <i className="fa fa-shopping-cart"></i>
              <span className="cart-items">
                {cartItems.length > 0 ? cartItems.length : 0}
              </span>
            </div>
            <div className="header-right-cart-hover">
              {cartItems.length > 0 ? (
                <div className="header-right-cart-hover-container">
                  <div className="header-right-cart-hover-items">
                    <ul className="header-right-cart-hover-items-container">
                      {cartItems.map((cartItem, index) => (
                        <li
                          key={index}
                          className="header-right-cart-hover-item"
                        >
                          <div className="header-right-cart-hover-item-img">
                            <img
                              src={cartItem.image}
                              alt={cartItem.name}
                              width="50"
                            />
                          </div>
                          <div className="header-right-cart-hover-item-content">
                            <h3 className="header-right-cart-hover-item-title">
                              {cartItem.name.length > 50
                                ? cartItem.name.subtring(0, 50) + "..."
                                : cartItem.name}
                            </h3>
                            <p className="header-right-cart-hover-item-qty">
                              Quantity: {cartItem.qty}
                            </p>
                            <h2 className="header-right-cart-hover-item-price">
                              {cartItem.price} €
                            </h2>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="header-right-cart-hover-subtotal">
                      <span className="header-right-cart-hover-subtotal-title">
                        SubTotal{" "}
                      </span>
                      <span className="header-right-cart-hover-subtotal-price">
                        {cartItems.reduce((a, c) => a + c.qty * c.price, 0)} €
                      </span>
                    </div>
                    <button className="header-right-cart-hover-btn primary">
                      Buy <i className="fa fa-angle-double-right"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="header-right-cart-hover-empty-container">
                  <i className="fa fa-shopping-cart header-right-cart-hover-icon"></i>
                  <span className="header-right-cart-hover-title">
                    Your shopping cart is empty
                  </span>
                  <button
                    className="header-right-cart-hover-btn primary"
                    onClick={goToShopping}
                  >
                    Go Shopping <i className="fa fa-angle-double-right"></i>
                  </button>
                </div>
              )}
            </div>
          </Link>
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
        </div>
      </header>
      <aside className={sidebarIsOpen ? "open" : ""}>
        <ul className="categories">
          <li>
            <Link className="brand" to="/">
              BledStore <span>v1</span>
            </Link>
            <button
              className="close-sidebar"
              type="button"
              onClick={() => setSidebarIsOpen(false)}
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          {loadingCategory ? (
            <LoadingBox></LoadingBox>
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : (
            <ul>
              {categories.map((c, index) => (
                <li key={index}>
                  <Link
                    to={`/search/category/${c.name}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <i className={c.icon}></i> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </aside>
    </>
  );
};

export default BledStoreHeader;
