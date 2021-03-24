import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../../components/CheckoutStep";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { createOrder } from "../../../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../../../redux/constants/orderConstants";

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreated = useSelector((state) => state.order);
  const userShippingAddress = useSelector((state) => state.shippingAddress);
  const userPaymentMethod = useSelector((state) => state.paymentMethod);

  // const { loading, error } = cart;
  const { loading, success, error, order } = orderCreated;
  const { shippingAddress } = userShippingAddress;
  const { paymentMethod } = userPaymentMethod;

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  if (!paymentMethod) {
    props.history.push("/payment");
  }

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        ...cart,
        orderItems: cart.cartItems,
        shippingAddress,
        paymentMethod,
      })
    );
  };

  return (
    <>
      <HelmetSite title={"Finalization Orders"} />
      <div className="place-order-wrapper">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {shippingAddress.fullName} <br />
                    <strong>Address: </strong> {shippingAddress.address},
                    {shippingAddress.city}, {shippingAddress.postalCode},
                    {shippingAddress.country}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {paymentMethod}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Order Items</h2>
                  <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x {item.price}€ = {item.qty * item.price}
                            €
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items</div>
                    <div>{cart.itemsPrice.toFixed(2)}€</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>{cart.shippingPrice.toFixed(2)}€</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>{cart.taxPrice.toFixed(2)}€</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>{cart.totalPrice.toFixed(2)}€</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="place-order-btn-submit primary block"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order <i className="fas fa-angle-double-right"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
