import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const labelSale = product.discountPrice
    ? Math.floor(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const productCreatedAt = new Date(product.createdAt).getTime();
  const productCreatedAtAfter7Day = productCreatedAt + 7 * 24 * 60 * 60 * 1000;
  const currentDate = new Date().getTime();
  const labelNew = currentDate > productCreatedAtAfter7Day ? false : true;

  return (
    <div className="product-wrapper">
      <div className="card">
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
        <div className="card-body">
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
          <Link to={`/product/${product._id}`}>
            <h2 className="card-title">{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="description">
            {product.description.length > 30
              ? product.description.substring(0, 30) + " ..."
              : product.description}
          </div>
          <div className="row start product-seller-content">
            <div className="product-price-content">
              {product.discountPrice ? (
                <>
                  <div className="product-price">{product.discountPrice}€</div>
                  <div className="product-discount-price">{product.price}€</div>
                </>
              ) : (
                <div className="price">{product.price}€</div>
              )}
            </div>
            {product.seller && (
              <span className="product-seller-infos">
                <Link to={`/seller/${product.seller._id}`}>
                  <img
                    className="seller-logo product-seller-logo"
                    src={product.seller.seller.logo}
                    alt={product.seller.seller.name}
                  ></img>
                  {product.seller.seller.name.length > 10
                    ? product.seller.seller.name.substring(0, 10) + " ..."
                    : product.seller.seller.name}
                </Link>
              </span>
            )}
          </div>
        </div>
        <div className="card-footer">
          <Link
            to={`/product/${product._id}`}
            className="bledstore-button product-add-to-cart"
          >
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
