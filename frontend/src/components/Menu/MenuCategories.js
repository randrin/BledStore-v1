import React from "react";
import { Link } from "react-router-dom";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const MenuCategories = ({ loading, error, categories }) => {
  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="main-categories-container">
          <div className="main-categories-title">
            <i className="fas fa-list"></i>{" "}
            <span className="main-categories-subtitle">Categories</span>
          </div>
          <div className="main-categories-menu">
            <ul className="main-categories-items">
              {categories.map((c, index) => (
                <li key={index} className="main-categories-item">
                  <Link to={`/search/category/${c.name}`}>
                    <i className={`${c.icon} main-categories-item-icon`}></i>{" "}
                    <span className="main-categories-item-title">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuCategories;
