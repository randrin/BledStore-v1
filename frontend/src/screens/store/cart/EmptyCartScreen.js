import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DividingLine from "../../../components/DividingLine";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductList from "../../../components/Products/ProductList";
import { listProducts } from "../../../redux/actions/productActions";

const EmptyCartScreen = () => {
  const pageSize = 8;
  const pageNumber = 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ pageNumber, pageSize }));
  }, [dispatch, pageNumber]);

  const goShoppingHandler = () => {
    window.location.href = "/";
  };

  return (
    <>
      <HelmetSite title={"Empty Shopping Cart"} />
      <div className="cart-empty-wrapper">
        <div className="cart-empty-container">
          <i className="cart-empty-icon fas fa-shopping-cart"></i>
          <h2 className="cart-empty-title">
            Your shopping cart is empty at the moment.
          </h2>
          <p>
            The items remain in the cart for 60 minutes, then they are moved to
            the List Products.
          </p>
        </div>
        <DividingLine title="We suggest these sales" />
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div className="row center">
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            {products.map((product, index) => (
              <ProductList key={index} product={product} />
            ))}
          </div>
        )}
        <div className="row center">
          <button
            className="bledstore-auth-btn-submit primary"
            onClick={goShoppingHandler}
          >
            Access current sales <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyCartScreen;
