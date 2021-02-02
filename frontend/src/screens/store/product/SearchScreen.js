import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import Rating from "../../../components/Rating";
import { listProducts } from "../../../redux/actions/productActions";
import { prices, ratings } from "../../../utils";

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const {
    category = "all",
    name = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest"
  } = useParams();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order
      })
    );
  }, [category, dispatch, max, min, name, order, rating]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const filterOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${filterOrder}`;
  };

  return (
    <div className="search-wrapper">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="search-sort-by">
            Sort By
            <select
              value={order}
              onChange={(e) => {
                props.history.push(getFilterUrl({ order: e.target.value }));
              }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="toprated">Avg. Customer Reviews</option>
            </select>
          </div>
          <div className="row top">
            <div className="col-1">
              <h3>Categories</h3>
              <div>
                {loadingCategory ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategory ? (
                  <MessageBox variant="danger">{errorCategory}</MessageBox>
                ) : (
                  <ul>
                    <li>
                      <Link
                        className={"all" === category ? "active" : ""}
                        to={getFilterUrl({ category: "all" })}
                      >
                        Any
                      </Link>
                    </li>
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
              <div>
                <h3>Price</h3>
                <ul>
                  {prices.map((p, index) => (
                    <li key={index}>
                      <Link
                        to={getFilterUrl({ min: p.min, max: p.max })}
                        className={
                          `${p.min}-${p.max}` === `${min}-${max}`
                            ? "active"
                            : ""
                        }
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Average Customers Reviews</h3>
                <ul>
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={
                          `${r.rating}` === `${rating}` ? "active" : ""
                        }
                      >
                        <Rating caption={" & up"} rating={r.rating}></Rating>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-3">
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div className="row center search-content">
                  {products.length === 0 && (
                    <MessageBox>No Product Found for search: {name}</MessageBox>
                  )}
                  <h2 className="search-products-count">
                    {products.length} Products found
                  </h2>
                  <div className="search-products">
                    {products.map((product, index) => (
                      <Product key={index} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchScreen;
