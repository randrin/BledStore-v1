import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getDashboardItems } from "../../redux/actions/dashboardActions";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const dashboardItems = useSelector((state) => state.dashboardItems);
  const { loading, error, items } = dashboardItems;

  useEffect(() => {
    dispatch(getDashboardItems());
  }, [dispatch]);

  const createHandler = () => {
    window.location.href = `/create/category`;
  };

  console.log(items);

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>Section Dashboard</h1>
        <button
          type="button"
          className="bledstore-dashboard-btn primary"
          onClick={createHandler}
        >
          Create Category <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row bledstore-dashboard-container">
          <div className="bledstore-dashboard-items">
            <Link to="/userList" className="bledstore-dashboard-item">
              <div className="bledstore-dashboard-item-icon">
                <i className="fas fa-user-alt"></i>
              </div>
              <div className="bledstore-dashboard-item-content">
                <h2 className="bledstore-dashboard-item-content-title">
                  {items.dashboardItems?.users[0]
                    ? items.dashboardItems?.users[0].numUsers
                    : 0}
                </h2>
                <p className="bledstore-dashboard-item-content-subtitle">
                  Numbers of users present in Aurelando Shop (Sellers, clients,
                  admins, ...)
                </p>
              </div>
            </Link>
            <Link to="/orderlist" className="bledstore-dashboard-item">
              <div className="bledstore-dashboard-item-icon">
                <i className="fas fa-gifts"></i>
              </div>
              <div className="bledstore-dashboard-item-content">
                <h2 className="bledstore-dashboard-item-content-title">
                  {items.dashboardItems?.orders[0]
                    ? items.dashboardItems?.orders[0]?.numOrders
                    : 0}
                </h2>
                <p className="bledstore-dashboard-item-content-subtitle">
                  Numbers of orders present in Aurelando Shop (Paid and/or
                  unpaid ....)
                </p>
              </div>
            </Link>
            <Link to="/categorylist" className="bledstore-dashboard-item">
              <div className="bledstore-dashboard-item-icon">
                <i className="fab fa-delicious"></i>
              </div>
              <div className="bledstore-dashboard-item-content">
                <h2 className="bledstore-dashboard-item-content-title">
                  {items.dashboardItems?.categories[0]
                    ? items.dashboardItems?.categories[0]?.count
                    : 0}
                </h2>
                <p className="bledstore-dashboard-item-content-subtitle">
                  Categories products present in Aurelando Shop (Activae and/or
                  disactive ...)
                </p>
              </div>
            </Link>
            <Link to="/orderlist" className="bledstore-dashboard-item">
              <div className="bledstore-dashboard-item-icon">
                <i className="fab fa-delicious"></i>
              </div>
              <div className="bledstore-dashboard-item-content">
                <h2 className="bledstore-dashboard-item-content-title">
                  {items.dashboardItems?.categories[0]
                    ? items.dashboardItems?.categories[0]?.count
                    : 0}
                </h2>
                <p className="bledstore-dashboard-item-content-subtitle">
                  Categories products present in Aurelando Shop (Activae and/or
                  disactive ...)
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
