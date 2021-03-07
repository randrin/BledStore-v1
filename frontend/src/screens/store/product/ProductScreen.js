import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import DividingLine from "../../../components/DividingLine";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import Rating from "../../../components/Rating";
import {
  getProductById,
  getProductsRelatedByCategory,
} from "../../../redux/actions/productActions";
import ReviewScreen from "./ReviewScreen";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productsListRelated = useSelector((state) => state.productsListRelated);
  const {
    loading: loadingRelated,
    error: errorRelated,
    productsRelated,
  } = productsListRelated;

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getProductsRelatedByCategory(productId));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="product-screen-wrapper">
          <div className="product-screen-breadcrumb">
            <Breadcrumb product={product} />
          </div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>
                  <span className="product-screen-title-item">Price :</span>{" "}
                  <span>
                    {product.discountPrice ? (
                      <>
                        <strong className="product-new-price">
                          {product.discountPrice} €
                        </strong>
                        <strong className="product-old-price">
                          {product.price} €
                        </strong>
                      </>
                    ) : (
                      <strong className="product-new-price">
                        {product.price} €
                      </strong>
                    )}
                  </span>
                </li>
                <li>
                  <span className="product-screen-title-item">Category :</span>{" "}
                  <span>{product.category}</span>
                </li>
                <li>
                  <span className="product-screen-title-item">Brand :</span>{" "}
                  <span>{product.brand}</span>
                </li>
                <li>
                  <span className="product-screen-title-item">
                    Description :
                  </span>
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  {product.seller && (
                    <li>
                      Seller
                      <h2>
                        <img
                          className="small product-seller-logo"
                          src={product.seller.seller.logo}
                          alt={product.seller.seller.name}
                        ></img>
                        <Link
                          to={`/seller/${product.seller._id}`}
                          className="product-seller-name"
                        >
                          {product.seller.seller.name}
                        </Link>
                      </h2>
                      <Rating
                        rating={product.seller.seller.rating}
                        numReviews={product.seller.seller.numReviews}
                      ></Rating>
                    </li>
                  )}
                  <li>
                    <div className="row">
                      <div>Price</div>

                      <span>
                        {product.discountPrice ? (
                          <div className="price">{product.discountPrice} €</div>
                        ) : (
                          <div className="price">{product.price} €</div>
                        )}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <>
                            {product.countInStock >= 5 ? (
                              <span className="success">In Stock</span>
                            ) : (
                              <span className="success">
                                Available only {product.countInStock}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="danger">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <li>
                      <div className="row">
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x, index) => (
                                <option key={index} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                  )}
                  <li>
                    {product.countInStock <= 0 ? (
                      <button disabled className="primary block">
                        <i className="fa fa-shopping-cart"></i> Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={addToCartHandler}
                        className="product-add-to-cart primary block"
                      >
                        <i className="fa fa-shopping-cart"></i> Add to Cart
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row center products-related">
            {loadingRelated ? (
              <LoadingBox />
            ) : errorRelated ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <div>
                <DividingLine title="You will like also this products"></DividingLine>
                <div className="row">
                  {productsRelated.length === 0 && (
                    <MessageBox>
                      No Related Products with category {product.category} Found
                      at the moment.
                    </MessageBox>
                  )}
                  {productsRelated.map((product, index) => (
                    <Product key={index} product={product} />
                  ))}
                </div>
                {/* <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/page/${x + 1}/size/${pageSize}`}
              >
                {x + 1}
              </Link>
            ))}
          </div> */}
              </div>
            )}
          </div>
          <ReviewScreen product={product} productId={productId} />
        </div>
      )}
    </>
  );
};

export default ProductScreen;
