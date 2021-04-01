import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import DividingLine from "../../../components/DividingLine";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductList from "../../../components/Products/ProductList";
import Rating from "../../../components/Rating";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import {
  getProductById,
  getProductsRelatedByCategory,
} from "../../../redux/actions/productActions";
import ReviewScreen from "./ReviewScreen";
import HelmetSite from "../../../components/HelmetSite";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <button onClick={() => onClick()} />;
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        {" "}
        // remember to give it position:absolute
        <button
          className={currentSlide === 0 ? "disable" : ""}
          onClick={() => previous()}
        />
        <button onClick={() => next()} />
        <button onClick={() => goToSlide(currentSlide + 1)}>
          {" "}
          Go to any slide{" "}
        </button>
      </div>
    );
  };

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
        <>
          <HelmetSite title={product.name} />
          <div className="product-screen-wrapper">
            <div className="product-screen-breadcrumb">
              <Breadcrumb grandfather={product.category} child={product.name} />
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
                    <span className="product-screen-title-item">
                      Category :
                    </span>{" "}
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
                            <div className="price">
                              {product.discountPrice} €
                            </div>
                          ) : (
                            <div className="price">{product.price}€</div>
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
                          <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                      ) : (
                        <button
                          onClick={addToCartHandler}
                          className="product-add-to-cart primary block"
                        >
                          <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="product-scroll-wrapper">
              <div className="product-scroll-container">
                <div className="product-scroll-left">
                  <img
                    className="product-scroll-img small"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product-scroll-content">
                    <p className="product-scroll-name">{product.name}</p>
                  </div>
                </div>
                <div className="product-scroll-right">
                  <span className="product-scroll-price">
                    {product.discountPrice ? (
                      <>
                        <strong className="product-new-price">
                          {product.discountPrice}€
                        </strong>
                        <strong className="product-old-price">
                          {product.price}€
                        </strong>
                      </>
                    ) : (
                      <strong className="product-new-price">
                        {product.price}€
                      </strong>
                    )}
                  </span>
                  <div className="product-scroll-qty">
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
                  <div className="product-scroll-btn">
                    {product.countInStock <= 0 ? (
                      <button disabled className="primary block">
                        <i className="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={addToCartHandler}
                        className="product-add-to-cart primary block"
                      >
                        <i className="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    )}
                  </div>
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
                  <div className="products-related-carousel">
                    <Carousel
                      swipeable={false}
                      arrow={false}
                      ButtonGroup={<ButtonGroup />}
                      draggable={false}
                      showDots={false}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true}
                      autoPlay={props.deviceType !== "mobile" ? true : false}
                      autoPlaySpeed={2000}
                      keyBoardControl={true}
                      customTransition="transform 200ms ease-in-out"
                      transitionDuration={300}
                      centerMode={false}
                      renderDotsOutside={true}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      deviceType={props.deviceType}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                    >
                      {productsRelated.map((product, index) => (
                        <ProductList key={index} product={product} />
                      ))}
                    </Carousel>
                  </div>
                  <div className="row products-related-wrapper">
                    {productsRelated.length === 0 && (
                      <MessageBox>
                        No Related Products with category {product.category}{" "}
                        Found at the moment.
                      </MessageBox>
                    )}
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
        </>
      )}
    </>
  );
};

export default ProductScreen;
