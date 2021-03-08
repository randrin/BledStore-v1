import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCagetories } from "../redux/actions/categoryActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const Categories = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCagetories());
  }, [dispatch]);

  return (
    <div className="categories-wrapper">
      <h2 className="categories-title">Explore ours Popular Categories</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="categories-container">
          <div className="categories-row">
            {categories.map((c, index) => (
              <div key={index} className="categories-block">
                <Link to={`/search/category/${c.name}`}>
                  <span className="categories-block-container-img">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="categories-block-img"
                    />
                  </span>
                  <h3 className="categories-block-title">{c.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;