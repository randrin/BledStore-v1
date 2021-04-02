import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../redux/actions/userActions";
import { USER_SUBSCRIBE_RESET } from "../redux/constants/userConstants";
import LoadingBox from "./LoadingBox";

const NewsLetters = () => {
  const [email, setEmail] = useState("");
  const [subcriptionSuccess, setSubcriptionSuccess] = useState(false);

  const dispatch = useDispatch();

  const userSubscription = useSelector((state) => state.userSubscription);
  const { loading, error, success, message } = userSubscription;

  useEffect(() => {
    if (success) {
      setSubcriptionSuccess(true);
      setTimeout(() => {
        setSubcriptionSuccess(false);
        dispatch({ type: USER_SUBSCRIBE_RESET });
      }, 3000);
      setEmail("");
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(subscribe(email));
  };

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <div className="newsletters-error-message">
          <span className="newsletters-error-icon">
            <i className="fas fa-times-circle"></i>
            {error}
          </span>
        </div>
      ) : (
        <div
          className={`${
            subcriptionSuccess
              ? "newsletters-success-message"
              : "newsletters-failure-message"
          }`}
        >
          {subcriptionSuccess ? (
            <span className="newsletters-success-icon">
              <i className="fas fa-check-circle"></i>
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
                    value={email}
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
                      <i className="fas fa-long-arrow-alt-right"></i>
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
