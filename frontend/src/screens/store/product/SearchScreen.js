import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductList from "../../../components/Products/ProductList";
import ProductLarge from "../../../components/Products/ProductLarge";
import Rating from "../../../components/Rating";
import { listProducts } from "../../../redux/actions/productActions";
import { prices, ratings } from "../../../utils";
import { listBrands } from "../../../redux/actions/brandActions";

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const {
    category = "all",
    brand = "all",
    name = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
    pageSize = 8,
  } = useParams();

  const [productMode, setProductMode] = useState(true);

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page, totalProducts } = productList;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  const brandList = useSelector((state) => state.brandsList);
  const { loading: loadingBrand, error: errorBrand, brands } = brandList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        pageSize,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        brand: brand !== "all" ? brand : "",
        min,
        max,
        rating,
        order,
      })
    );
    dispatch(listBrands());
  }, [category, brand, dispatch, max, min, name, order, pageNumber, pageSize, rating]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterBrand = filter.brand || brand;
    const filterPage = filter.page || pageNumber;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const filterOrder = filter.order || order;
    const filterPageSize = filter.pageSize || pageSize;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/brand/${filterBrand}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${filterOrder}/size/${filterPageSize}/page/${filterPage}`;
  };

  return (
    <>
      <HelmetSite title={"Products"} />
      <div className="search-wrapper">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row top">
            <div className="col-1 search-container">
              <div className="search-content">
                <h3 className="search-title">
                  <span>Categories</span>
                </h3>
                {loadingCategory ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategory ? (
                  <MessageBox variant="danger">{errorCategory}</MessageBox>
                ) : (
                  <ul className="search-content-items">
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
                          to={getFilterUrl({ category: c.name })}
                          className={c.name === category ? "active" : ""}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="search-content">
                <h3 className="search-title">
                  <span>Brands</span>
                </h3>
                {loadingBrand ? (
                  <LoadingBox></LoadingBox>
                ) : errorBrand ? (
                  <MessageBox variant="danger">{errorBrand}</MessageBox>
                ) : (
                  <ul className="search-content-items">
                    <li>
                      <Link
                        className={"all" === brand ? "active" : ""}
                        to={getFilterUrl({ brand: "all" })}
                      >
                        Any
                      </Link>
                    </li>
                    {brands.map((b, index) => (
                      <li key={index}>
                        <Link
                          to={getFilterUrl({ brand: b.name })}
                          className={b.name === brand ? "active" : ""}
                        >
                          {b.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="search-content">
                <h3 className="search-title">
                  <span>Price</span>
                </h3>
                <ul className="search-content-items">
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
              <div className="search-content">
                <h3 className="search-title">
                  <span>Average Customers Reviews</span>
                </h3>
                <ul className="search-content-items">
                  {ratings.map((r) => (
                    <li key={r.name}>
                      <Link
                        to={getFilterUrl({ rating: r.rating })}
                        className={
                          `${r.rating}` === `${rating}` ? "active" : ""
                        }
                      >
                        <Rating
                          className="rating-active"
                          caption={" & up"}
                          rating={r.rating}
                        ></Rating>
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
                <>
                  {totalProducts === 0 ? (
                    <MessageBox>
                      No Product Found for search: name: {name}, category:{" "}
                      {category}, brand: {brand}, min: {min}, max: {max}, rating: {rating} and
                      sort: {order}
                    </MessageBox>
                  ) : (
                    <div className="search-seller-products">
                      <h2 className="search-products-count">
                        {totalProducts}{" "}
                        {totalProducts === 1 ? "Product" : "Products"} found
                      </h2>
                      <div className="search-sort-by">
                        <span>Sort By</span>
                        <select
                          className="select-criteria-products"
                          value={order}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({ order: e.target.value })
                            );
                          }}
                        >
                          <option value="newest">Newest Arrivals</option>
                          <option value="lowest">Price: Low to High</option>
                          <option value="highest">Price: High to Low</option>
                          <option value="toprated">
                            Avg. Customer Reviews
                          </option>
                        </select>
                        <div className="select-product-grid">
                          <button
                            className={`${productMode ? "primary" : ""} block`}
                            onClick={() => setProductMode(true)}
                          >
                            <i className="fas fa-th-large"></i>
                          </button>
                          <button
                            className={`${productMode ? "" : "primary"} block`}
                            onClick={() => setProductMode(false)}
                          >
                            <i className="fas fa-th-list"></i>
                          </button>
                        </div>
                        <select
                          className="select-showing-products"
                          value={pageSize}
                          onChange={(e) => {
                            props.history.push(
                              getFilterUrl({ pageSize: e.target.value })
                            );
                          }}
                        >
                          <option value="8">8</option>
                          <option value="12">12</option>
                          <option value="16">16</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="row center search-content">
                    {productMode
                      ? products.map((product, index) => (
                          <ProductList key={index} product={product} />
                        ))
                      : products.map((product, index) => (
                          <ProductLarge key={index} product={product} />
                        ))}
                  </div>
                  {!!products.length && pages > 1 && (
                    <div className="pagination">
                      {[...Array(pages).keys()].map((x) => (
                        <Link
                          className={x + 1 === page ? "active" : ""}
                          key={x + 1}
                          to={getFilterUrl({ page: x + 1 })}
                        >
                          {x + 1}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchScreen;
