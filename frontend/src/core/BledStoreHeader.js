import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { listCagetories } from "../redux/actions/categoryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import BledStoreHeaderCart from "./BledStoreHeaderCart";
import BledStoreHeaderUser from "./BledStoreHeaderUser";
import BledStoreNavBar from "./BledStoreNavBar";

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

  useEffect(() => {
    dispatch(listCagetories());
  }, [dispatch]);

  return (
    <>
      <header className="header-wrapper row">
        <div className="header-left">
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link className="brand" to="/">
            <div className="brand-title">BledStore <span className="brand-title-version">v1</span></div>
            <span className="brand-subtitle">All together, In the same place</span>
          </Link>
        </div>
        <div className="header-middle">
          <Route
            render={({ history }) => <SearchBox categories={categories} history={history}></SearchBox>}
          ></Route>
        </div>
        <div className="header-right">
          <BledStoreHeaderCart cartItems={cartItems} />
          <BledStoreHeaderUser userInfo={userInfo} />
        </div>
      </header>
      {/* <div>
      <BledStoreNavBar />
      </div> */}
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
              <i className="fas fa-window-close"></i>
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
