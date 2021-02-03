import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Rating from "../../../components/Rating";
import { getProductById } from "../../../redux/actions/productActions";
import ReviewScreen from "./ReviewScreen";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="product-screen-wrapper">
          <Link to="/">Back to result</Link>
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
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
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
                      <div className="price">${product.price}</div>
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
                          <span className="danger">Unavailable</span>
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
                    <button
                      onClick={addToCartHandler}
                      className="primary block"
                    >
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ReviewScreen product={product} productId={productId} />
        </div>
      )}
    </>
  );
};

export default ProductScreen;
