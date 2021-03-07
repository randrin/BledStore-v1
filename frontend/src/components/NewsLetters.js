import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../redux/actions/userActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const NewsLetters = () => {
  const [email, setEmail] = useState("");
  const [subcription, setSubcription] = useState(false);

  const dispatch = useDispatch();

  const userSubscription = useSelector((state) => state.userSubscription);
  const { loading, error, success, message } = userSubscription;

  console.log(message, success, error);

  useEffect(() => {
    if (success) {
      setSubcription(true);
      setTimeout(() => {
        setSubcription(false);
      }, 3000);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(subscribe(email));
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className={`${subcription ? "newsletters-success-wrapper" : "newsletters-failure-wrapper"}`}>
          {subcription ? (
            <span className="newsletters-success-icon">
              <i className="fa fa-check-circle"></i>
              {message}
            </span>
          ) : (
            ""
          )}
        </div>
      )}
      <div
        className="newsletters-wrapper"
        style={{
          backgroundImage: "url('assets/images/logo/newsletters-bg.jpg')",
        }}
      >
        <div className="newsletters-container">
          <div className="newsletters-box">
            <div className="newsletters-box-content">
              <h3 className="newsletters-box-content-title">
                Obtenez les dernières offres
              </h3>
              <p className="newsletters-box-content-subtitle">
                et recevez un coupon de 20 $ pour vos premiers achats
              </p>
            </div>
            <div className="newsletters-box-subscribe">
              <form
                className="newsletters-box-subscribe-form"
                onSubmit={submitHandler}
              >
                <div className="newsletters-box-subscribe-input-group">
                  <input
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletters-box-subscribe-form-control"
                    placeholder="Enter your email address"
                  />
                  <div className="newsletters-box-subscribe-input-group-append">
                    <button
                      type="submit"
                      className="newsletters-box-subscribe-btn"
                    >
                      <span className="newsletters-box-subscribe-btn-cta">
                        Subscribe
                      </span>
                      <i className="fa fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetters;
