import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";
import EmptyCartScreen from "./EmptyCartScreen";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const productId = props.match.params.productId;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error, loading } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty, error]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <>
      <HelmetSite title={"Shopping Cart"} />
      <div className="cart-wrapper row top">
        <div className="col-2">
          <h1 className="cart-title">Shopping Cart</h1>
          {cartItems.length !== 0 && (
            <ul>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="row">
                    <div>
                      <img src={item.image} alt={item.name} className="small" />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(
                          (x, index) => (
                            <option key={index} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      {item.discountPrice ? (
                        <div className="cart-price-content">
                          <span className="cart-new-price">
                            {item.discountPrice}€
                          </span>
                          <span className="cart-old-price">{item.price}€</span>
                        </div>
                      ) : (
                        <div className="cart-price-content">
                          <span className="cart-price">{item.price}€</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="cart-btn-remove"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="far fa-window-close danger"></i> Remove to
                        Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length === 0 && <EmptyCartScreen></EmptyCartScreen>}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  {cartItems.reduce(
                    (a, c) =>
                      a + c.qty * (c.discountPrice ? c.discountPrice : c.price),
                    0
                  )}{" "}
                  €
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className={`primary ${
                    cartItems.length === 0 ? "" : "cart-btn-submit"
                  } block`}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout{" "}
                  <i className="fas fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
