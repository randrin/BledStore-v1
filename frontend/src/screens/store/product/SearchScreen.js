import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import { listProducts } from "../../../redux/actions/productActions";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { category = "all", name = "all" } = useParams();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(listProducts({ name: name !== "all" ? name : "", category: category !== "all" ? category : "" }));
  }, [category, dispatch, name]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-1">
            <h3>Categories</h3>
            {loadingCategory ? (
              <LoadingBox></LoadingBox>
            ) : errorCategory ? (
              <MessageBox variant="danger">{errorCategory}</MessageBox>
            ) : (
              <ul>
                {categories.map((c, index) => (
                  <li key={index}>
                    <Link
                      to={getFilterUrl({ category: c })}
                      className={c === category ? "active" : ""}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
