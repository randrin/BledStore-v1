import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import ProductModal from "../Modal/ProductModal";
import Rating from "../Rating";
import { truncate } from "../../utils";
import { AFTER_7_DAYS } from "../../constants";

const ProductList = ({ product }) => {
  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);

  const onGoToProduct = () => {
    window.location.href = `/product/${product._id}`;
  };

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
    <div className="product-wrapper">
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        animationDuration={800}
      >
        <ProductModal
          product={product}
          labelNew={labelNew}
          labelSale={labelSale}
        />
      </Modal>
      <div className="card">
        <Link to="">
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
          <div className="product-actions">
            <ul className="product-actions-list">
              <li className="product-action-item">
                <button onClick={onGoToProduct}>
                  <i className="fas fa-cart-plus"></i>
                </button>
              </li>
              <li className="product-action-item">
                <button onClick={onOpenModal}>
                  <i className="fas fa-search-plus"></i>
                </button>
              </li>
            </ul>
          </div>
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
            <h2 className="card-title">{truncate(product.name, 25)}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="description">
            {truncate(product.description, 30)}
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
        <div className="card-footer">
          <Link
            to={`/product/${product._id}`}
            className="bledstore-button product-add-to-cart"
          >
            <i className="fas fa-cart-plus"></i> Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
