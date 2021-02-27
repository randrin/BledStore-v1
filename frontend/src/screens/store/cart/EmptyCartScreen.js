import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
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
    window.location.href = "/"
  };

  return (
    <div className="cart-empty-wrapper">
      <i className="cart-empty-icon fa fa-shopping-cart"></i>
      <h2 className="cart-empty-title">
        Your shopping cart is empty at the moment.
      </h2>
      <h3 className="cart-empty-subtitle">We suggest these sales: </h3>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      )}
      <button
        className="bledstore-auth-btn-submit primary"
        onClick={goShoppingHandler}
      >
        Access current sales <i className="fa fa-angle-double-right"></i>
      </button>
    </div>
  );
};

export default EmptyCartScreen;
