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

  return (
    <>
      <header className="header-wrapper row">
        <div>
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
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
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
                  <Link to="/profile">
                    <i className="fa fa-user-circle-o"></i> User Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders/history">
                    <i className="	fa fa-list"></i> Order History
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
            <Link to="/signin">
              <i className="fa fa-user-circle"></i> Sign In
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
