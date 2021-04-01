import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import Rating from "../Rating";

const ProductModal = ({ product, labelNew, labelSale }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    //window.location.href = `/cart/${product._id}?qty=${qty}`;
    dispatch(addToCart(product._id, qty));
  };

  return (
    <div className="product-modal-wrapper">
      <div className="product-modal-img">
        {labelNew ? (
          <span className="product-modal-label label-circle-new">New</span>
        ) : (
          ""
        )}
        {product.discountPrice ? (
          <span
            className={`product-modal-label ${
              labelNew ? "label-margin" : ""
            } label-circle-sale`}
          >
            {labelSale}%
          </span>
        ) : (
          ""
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-modal-content">
        <div className="product-modal-header">
          <Link to={`/product/${product._id}`} className="product-modal-title">
            {product.name}
          </Link>
        </div>
        <div className="product-modal-category">
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
        <div className="product-modal-price">
          {product.discountPrice ? (
            <>
              <div className="product-price">{product.discountPrice}€</div>
              <div className="product-discount-price">{product.price}€</div>
            </>
          ) : (
            <div className="product-price">{product.price}€</div>
          )}
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
        <div className="product-modal-description">{product.description}</div>
        <hr className="product-modal-divider" />
        <div className="product-modal-qty">
          <div className="product-modal-qty-title">Qty</div>
          <select value={qty} onChange={(e) => setQty(e.target.value)}>
            {[...Array(product.countInStock).keys()].map((x, index) => (
              <option key={index} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="product-modal-submit">
          <button className="primary product-modal-add-to-cart">
            <Link to="#" onClick={addToCartHandler}>
              <i className="fas fa-cart-plus"></i> Add to Cart
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
