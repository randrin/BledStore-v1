import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const sale = product.discountPrice
    ? Math.floor(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="product-wrapper">
      <div className="card">
        <Link to={`/product/${product._id}`}>
          {product.discountPrice ? (
            <span className="card-product-label label-circle label-sale">
              {sale}%
            </span>
          ) : (
            ""
          )}
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <div className="category">
            <Link to={`/product/${product._id}`}>{product.category}</Link>
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
            <i className="fa fa-shopping-cart"></i> Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
