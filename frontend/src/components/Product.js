import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="product-wrapper">
      <div className="card">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
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
            <div className="price">${product.price}</div>
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
      </div>
    </div>
  );
};

export default Product;
