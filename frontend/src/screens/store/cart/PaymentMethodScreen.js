import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../../components/CheckoutStep";
import HelmetSite from "../../../components/HelmetSite";
import { savePaymentMethod } from "../../../redux/actions/paymentActions";

const PaymentMethodScreen = (props) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const userShippingAddress = useSelector((state) => state.shippingAddress);

  const { shippingAddress } = userShippingAddress;

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <>
      <HelmetSite title={"Payment Methods"} />
      <div className="payment-wrapper">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
          <div className="bledstore-payment-title">
            <i className="bledstore-payment-title-icon	fab fa-cc-mastercard"></i>
            <h1>Payment Method</h1>
          </div>
          <div className="bledstore-payment-radio">
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
          <div className="bledstore-payment-radio">
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
          <div>
            <label />
            <button className="bledstore-btn-submit primary" type="submit">
              Continue <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethodScreen;
