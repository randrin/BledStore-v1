import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>
        <i
          className={`far fa-${
            props.step1 ? "check" : "times"
          }-circle checkout-steps-icon`}
        ></i>{" "}
        <span className="checkout-steps-title">Sign-In</span>
      </div>
      <div className={props.step2 ? "active" : ""}>
        {" "}
        <i
          className={`far fa-${
            props.step2 ? "check" : "times"
          }-circle checkout-steps-icon`}
        ></i>{" "}
        <span className="checkout-steps-title">Shipping</span>
      </div>
      <div className={props.step3 ? "active" : ""}>
        <i
          className={`far fa-${
            props.step3 ? "check" : "times"
          }-circle checkout-steps-icon`}
        ></i>{" "}
        <span className="checkout-steps-title">Payment</span>
      </div>
      <div className={props.step4 ? "active" : ""}>
        <i
          className={`far fa-${
            props.step4 ? "check" : "times"
          }-circle checkout-steps-icon`}
        ></i>{" "}
        <span className="checkout-steps-title">Place Order</span>
      </div>
    </div>
  );
}
