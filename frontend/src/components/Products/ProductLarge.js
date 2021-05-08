import React from "react";
import { Link } from "react-router-dom";
import { AFTER_7_DAYS } from "../../constants";
import { truncate } from "../../utils";
import Rating from "../Rating";

const ProductLarge = ({ product }) => {
  const labelSale = product.discountPrice
    ? Math.floor(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const productCreatedAt = new Date(product.createdAt).getTime();
  const productCreatedAtAfter7Day = productCreatedAt + AFTER_7_DAYS;
  const currentDate = new Date().getTime();
  const labelNew = currentDate > productCreatedAtAfter7Day ? false : true;

  return (
    <div className="product-large-wrapper">
      <div className="card">
        <div className="card-product-img">
          <Link to={`/product/${product._id}`}>
            {labelNew ? (
              <span className="card-product-label label-circle-new">New</span>
            ) : (
              ""
            )}
            {product.discountPrice ? (
              <span
                className={`card-product-label ${
                  labelNew ? "label-margin" : ""
                } label-circle-sale`}
              >
                {labelSale}%
              </span>
            ) : (
              ""
            )}
            <img className="medium" src={product.image} alt={product.name} />
          </Link>
        </div>
        <div className="card-body">
          <div className="card-product-infos">
            <Link to={`/product/${product._id}`}>
              <h2 className="card-title">{truncate(product.name, 100)}</h2>
            </Link>
          </div>
          <div className="category">
            <Link to={`/product/${product._id}`}>{product.category}</Link>
            {product.countInStock > 5 ? (
              <span className="availability-in-stock">
                <span className="availability-stock"></span> Disponible
              </span>
            ) : product.countInStock === 0 ? (
              <span className="availability-out-stock">
                <i className="fas fa-exclamation-triangle"></i> Out of Stock
              </span>
            ) : (
              <span className="availability-out-stock">
                <i className="fas fa-exclamation-triangle"></i> Il ne reste que{" "}
                {product.countInStock}
              </span>
            )}
          </div>
          <div className="row start product-seller-content">
            <div className="product-price-content">
              {product.discountPrice ? (
                <>
                  <div className="product-price">{product.discountPrice}€</div>
                  <div className="product-discount-price">{product.price}€</div>
                </>
              ) : (
                <div className="product-price">{product.price}€</div>
              )}
            </div>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div className="description">
            {truncate(product.description, 150)}
          </div>
          <div className="row start product-seller-content">
            <button className="bledstore-button primary product-add-to-cart">
              <Link to={`/product/${product._id}`}>
                <i className="fas fa-cart-plus"></i> Add to Cart
              </Link>
            </button>
            {product.seller && (
              <span className="product-seller-infos">
                <Link to={`/seller/${product.seller._id}`}>
                  <img
                    className="seller-logo product-seller-logo"
                    src={product.seller.seller.logo}
                    alt={product.seller.seller.name}
                  ></img>
                  {truncate(product.seller.seller.name, 10)}
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLarge;
