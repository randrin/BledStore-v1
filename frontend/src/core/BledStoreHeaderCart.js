import React from "react";
import { Link } from "react-router-dom";

const BledStoreHeaderCart = ({ cartItems }) => {
  const goToShopping = (e) => {
    e.preventDefault();
    window.location.href = "search/category/all/name/all";
  };

  return (
    <Link to="/cart" className="header-right-cart">
      <div className="header-right-cart-items">
        <i className="fas fa-shopping-cart"></i>
        <span className={`cart-items ${!!cartItems.length ? "cart-items-animation" : ""}`}>
          {cartItems.length > 0 ? cartItems.length : 0}
        </span>
      </div>
      <div className="header-right-cart-hover">
        {cartItems.length > 0 ? (
          <div className="header-right-cart-hover-container">
            <div className="header-right-cart-hover-items">
              <ul className="header-right-cart-hover-items-container">
                {cartItems.map((cartItem, index) => (
                  <li key={index} className="header-right-cart-hover-item">
                    <div className="header-right-cart-hover-item-img">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        width="50"
                      />
                    </div>
                    <div className="header-right-cart-hover-item-content">
                      <h3 className="header-right-cart-hover-item-title">
                        {cartItem.name.length > 50
                          ? cartItem.name.subtring(0, 50) + "..."
                          : cartItem.name}
                      </h3>
                      <p className="header-right-cart-hover-item-qty">
                        Quantity: {cartItem.qty}
                      </p>
                      <h2 className="header-right-cart-hover-item-price">
                        {cartItem.price} €
                      </h2>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="header-right-cart-hover-subtotal">
                <span className="header-right-cart-hover-subtotal-title">
                  SubTotal{" "}
                </span>
                <span className="header-right-cart-hover-subtotal-price">
                  {cartItems.reduce((a, c) => a + c.qty * c.price, 0)} €
                </span>
              </div>
              <button className="header-right-cart-hover-btn primary">
                Buy <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="header-right-cart-hover-empty-container">
            <i className="fas fa-shopping-cart header-right-cart-hover-icon"></i>
            <span className="header-right-cart-hover-title">
              Your shopping cart is empty
            </span>
            <button
              className="header-right-cart-hover-btn primary"
              onClick={goToShopping}
            >
              Go Shopping <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BledStoreHeaderCart;
