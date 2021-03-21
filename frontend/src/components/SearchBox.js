import React, { useState } from "react";

const SearchBox = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const filterName = name.length ? name : "all";
    const categoryName = category.length ? category : "all";
    props.history.push(`/search/category/${categoryName}/name/${filterName}`);
  };

  return (
    <form className="search-wrapper" onSubmit={submitHandler}>
      <div className="row">
        <select
          id="category"
          name="category"
          className="search-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {props.categories &&
            props.categories.map((c, index) => (
              <option key={index} value={c.name} className="search-option">
                {c.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          id="name"
          className="search-input"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="search-btn-submit primary" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="search-hover">Content to see when hover</div>
    </form>
  );
};

export default SearchBox;
