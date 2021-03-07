import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({product}) => {
  return (
    <div className="bledstore-breadcrumb-wrapper">
      <div className="container">
        <div className="row">
          <div className="col">
            <ol className="bledstore-breadcrumb">
              <li className="bledstore-breadcrumb-navigation">
                <Link
                  to="/"
                  className="bledstore-breadcrumb-link"
                >
                  <i className="fa fa-home"></i> Home Page
                </Link>
              </li>
              <li className="bledstore-breadcrumb-navigation">
                <Link
                  to={`/search/category/${product.category}`}
                  className="bledstore-breadcrumb-link"
                >
                  {product.category}
                </Link>
              </li>
              <li className="bledstore-breadcrumb-navigation">{product.name}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
