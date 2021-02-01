import React, { useState } from "react";

const SearchBox = (props) => {
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          id="q"
          name="q"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
