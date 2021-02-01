import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import { listProducts } from "../../../redux/actions/productActions";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { name = "all" } = useParams();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "" }));
  }, [dispatch, name]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-1">
            <h3>Department</h3>
            <ul>
              <li>Category 1</li>
            </ul>
          </div>
          <div className="col-3">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="row center">
                {products.length === 0 && (
                  <MessageBox>No Product Found for search: {name}</MessageBox>
                )}
                {products.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
