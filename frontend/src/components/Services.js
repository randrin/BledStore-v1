import React from "react";

const Services = () => {
  return (
    <div className="row center">
      <div className="services-wrapper">
        <div className="services-container">
          <div className="services-box">
            <div className="services-box-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="services-box-content">
              <h3 className="services-box-content-title">Free Shipping</h3>
              <p className="services-box-content-description">
                Orders 50€ or more
              </p>
            </div>
          </div>
          <div className="services-box">
            <div className="services-box-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="services-box-content">
              <h3 className="services-box-content-title">Free Returns</h3>
              <p className="services-box-content-description">Within 30 days</p>
            </div>
          </div>
          <div className="services-box">
            <div className="services-box-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="services-box-content">
              <h3 className="services-box-content-title">
                Get 20 % Off
              </h3>
              <p className="services-box-content-description">
                when you sign up
              </p>
            </div>
          </div>
          <div className="services-box">
            <div className="services-box-icon">
              <i className="fas fa-life-ring"></i>
            </div>
            <div className="services-box-content">
              <h3 className="services-box-content-title">We Support</h3>
              <p className="services-box-content-description">
                24/7 amazing services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
