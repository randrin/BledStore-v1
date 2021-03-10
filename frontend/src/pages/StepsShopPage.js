import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const StepsShopPage = () => {
  return (
    <div className="steps-shop-page-wrapper">
      <Breadcrumb child="How to shop in xxxx" />
      <div className="steps-shop-page-container">
        <div className="steps-shop-page-content">
          <h6 className="steps-shop-page-title">Our Process</h6>
          <h3 className="steps-shop-page-subtitle">How Does It Work</h3>
        </div>
        <div className="steps-shop-page-steps">
          <div className="steps-shop-page-step-box">
            <div className="steps-shop-page-step-box-content">
              <Link to="/search/category/all">
                <span className="steps-shop-page-step-box-content-header">
                  <img
                    src="/assets/images/steps/001-search.png"
                    className="steps-shop-page-step-box-content-header-img"
                    alt="Steps Search"
                  />
                  <span className="steps-shop-page-step-box-content-header-number">
                    01
                  </span>
                </span>
              </Link>
              <h6 className="steps-shop-page-step-box-content-title">Search</h6>
              <p className="steps-shop-page-step-box-content-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
            </div>
          </div>
          <div className="steps-shop-page-step-box">
            <div className="steps-shop-page-step-box-content">
              <Link to="/search/category/all">
                <span className="steps-shop-page-step-box-content-header">
                  <img
                    src="/assets/images/steps/004-shopping-bag.png"
                    className="steps-shop-page-step-box-content-header-img"
                    alt="Steps Select"
                  />
                  <span className="steps-shop-page-step-box-content-header-number">
                    02
                  </span>
                </span>
              </Link>
              <h6 className="steps-shop-page-step-box-content-title">Select</h6>
              <p className="steps-shop-page-step-box-content-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
            </div>
          </div>
          <div className="steps-shop-page-step-box">
            <div className="steps-shop-page-step-box-content">
              <Link to="/search/category/all">
                <span className="steps-shop-page-step-box-content-header">
                  <img
                    src="/assets/images/steps/002-stopwatch.png"
                    className="steps-shop-page-step-box-content-header-img"
                    alt="Steps Order"
                  />
                  <span className="steps-shop-page-step-box-content-header-number">
                    03
                  </span>
                </span>
              </Link>
              <h6 className="steps-shop-page-step-box-content-title">Order</h6>
              <p className="steps-shop-page-step-box-content-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
            </div>
          </div>
          <div className="steps-shop-page-step-box">
            <div className="steps-shop-page-step-box-content">
              <Link to="/search/category/all">
                <span className="steps-shop-page-step-box-content-header">
                  <img
                    src="/assets/images/steps/003-placeholder.png"
                    className="steps-shop-page-step-box-content-header-img"
                    alt="Steps Enjoy"
                  />
                  <span className="steps-shop-page-step-box-content-header-number">
                    04
                  </span>
                </span>
              </Link>
              <h6 className="steps-shop-page-step-box-content-title">Enjoy</h6>
              <p className="steps-shop-page-step-box-content-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsShopPage;
