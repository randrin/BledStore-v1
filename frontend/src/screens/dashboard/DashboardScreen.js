import React from "react";

const DashboardScreen = () => {
  const createHandler = () => {
    window.location.href = `/create/category`;
  };
  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>Section Dashboard</h1>
        <button
          type="button"
          className="bledstore-dashboard-btn primary"
          onClick={createHandler}
        >
          Create Category <i className="fa fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default DashboardScreen;
