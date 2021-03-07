import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="bledstore-error-404-wrapper">
      <div className="bledstore-error-404-container">
        <div className="bledstore-error-404-left">
          <Link to="/">
            <img
            className="bledstore-error-404-logo"
              src="/assets/images/logo/error-404.png"
              alt="Logo Error 404 Page"
            />
          </Link>
        </div>
        <div className="bledstore-error-404-right">
          <Link to="/">
            <img src="/assets/images/logo/logo.png" alt="Logo Compagny Page" />
          </Link>
          <h2 className="bledstore-error-404-right-title">We're sorry. The page you are searching for no longer exists.</h2>
          <h3 className="bledstore-error-404-right-title">
            Please contact Customer Care for assistance at 6 46 55 87 98 or
            customerService@compagnyName.com.
          </h3>
          <p className="bledstore-error-404-right-title">
            <Link to="/" className="bledstore-error-404-right-link">Click here</Link> to return to the home page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error404;
