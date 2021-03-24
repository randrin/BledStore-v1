import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ grandfather, father, child }) => {
  return (
    <div className="bledstore-breadcrumb-wrapper">
      <div className="container">
        <div className="row">
          <div className="col">
            <ol className="bledstore-breadcrumb">
              <li className="bledstore-breadcrumb-navigation">
                <Link to="/" className="bledstore-breadcrumb-link">
                  <i className="fas fa-store"></i> Home Page
                </Link>
              </li>
              {grandfather && (
                <>
                <li className="bledstore-breadcrumb-navigation">
                <Link
                  to={`/search/category/all`}
                  className="bledstore-breadcrumb-link"
                >
                  Products
                </Link>
              </li>
                <li className="bledstore-breadcrumb-navigation">
                  <Link
                    to={`/search/category/${grandfather}`}
                    className="bledstore-breadcrumb-link"
                  >
                    {grandfather}
                  </Link>
                </li>
                </>
              )}
              {father && (
                <li className="bledstore-breadcrumb-navigation">
                  <Link
                    to={`/search/category/${father}`}
                    className="bledstore-breadcrumb-link"
                  >
                    {father}
                  </Link>
                </li>
              )}
              <li className="bledstore-breadcrumb-navigation">{child}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
