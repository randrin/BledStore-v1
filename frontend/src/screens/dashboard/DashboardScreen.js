import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as moment from "moment";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getDashboardItems } from "../../redux/actions/dashboardActions";
import Chart from "react-google-charts";
import NavLeft from "./utils/NavLeft";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const dashboardItemss = useSelector((state) => state.dashboardItems);
  const { loading, error, items } = dashboardItemss;

  useEffect(() => {
    dispatch(getDashboardItems());
  }, [dispatch]);

  const createHandler = () => {
    window.location.href = `/create/category`;
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row top">
        <div className="bledstore-dashboard-col-1">
          <NavLeft />
        </div>
        <div className="bledstore-dashboard-col-3">
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
                      Numbers of users present in Aurelando Shop (Sellers,
                      clients, admins, ...)
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
                    <i className="fas fa-shapes"></i>
                  </div>
                  <div className="bledstore-dashboard-item-content">
                    <h2 className="bledstore-dashboard-item-content-title">
                      {items.dashboardItems?.categories[0]
                        ? items.dashboardItems?.categories[0]?.count
                        : 0}
                    </h2>
                    <p className="bledstore-dashboard-item-content-subtitle">
                      Categories products present in Aurelando Shop (Activae
                      and/or disactive ...)
                    </p>
                  </div>
                </Link>
                <Link to="/brandlist" className="bledstore-dashboard-item">
                  <div className="bledstore-dashboard-item-icon">
                    <i className="fab fa-delicious"></i>
                  </div>
                  <div className="bledstore-dashboard-item-content">
                    <h2 className="bledstore-dashboard-item-content-title">
                      {items.dashboardItems?.brands[0]
                        ? items.dashboardItems?.brands[0]?.count
                        : 0}
                    </h2>
                    <p className="bledstore-dashboard-item-content-subtitle">
                      Brands present in Aurelando Shop (Activae and/or disactive
                      ...)
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}
          <div className="row bledstore-dashboard-container">
            {items?.dashboardItems?.dailyOrders?.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <div className="chart">
                {items?.dashboardItems?.dailyOrders && (
                  <Chart
                    height="400px"
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Date", "Sales"],
                      ...items.dashboardItems.dailyOrders.map((x) => [
                        moment(x._id).format("DD/MM/YYYY"),
                        x.sales,
                      ]),
                    ]}
                    options={{
                      title: "Company Performance",
                      hAxis: {
                        title: "Period (dd/mm/yyyy)",
                        titleTextStyle: { color: "#f0c040" },
                      },
                      vAxis: {
                        title: "Sales (€)",
                        titleTextStyle: { color: "#f0c040" },
                        minValue: 0,
                      },
                      // For the legend to fit, we make the chart area smaller
                      lineWidth: 3,
                    }}
                  />
                )}
              </div>
            )}
            {items?.dashboardItems?.dailyOrders?.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <div className="chart">
                {items?.dashboardItems?.dailyOrders && (
                  <Chart
                    height="400px"
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Date", "Sales"],
                      ...items.dashboardItems.dailyOrders.map((x) => [
                        moment(x._id).format("DD/MM/YYYY"),
                        x.sales,
                      ]),
                    ]}
                    options={{
                      title: "Company Performance",
                      hAxis: {
                        title: "Period (dd/mm/yyyy)",
                        titleTextStyle: { color: "#f0c040" },
                      },
                      vAxis: {
                        title: "Sales (€)",
                        titleTextStyle: { color: "#f0c040" },
                        minValue: 0,
                      },
                      // For the legend to fit, we make the chart area smaller
                      lineWidth: 3,
                    }}
                  />
                )}
              </div>
            )}
            {items?.dashboardItems?.productsCategories?.length === 0 ? (
              <MessageBox>No Categories</MessageBox>
            ) : (
              <div className="chart">
                {items?.dashboardItems?.productsCategories && (
                  <Chart
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Category", "Products"],
                      ...items.dashboardItems.productsCategories.map((x) => [
                        x._id,
                        x.numProducts,
                      ]),
                    ]}
                    options={{
                      title: "Products by Categories Sold",
                    }}
                  />
                )}
              </div>
            )}
            {items?.dashboardItems?.productsCategories?.length === 0 ? (
              <MessageBox>No Categories</MessageBox>
            ) : (
              <div className="chart">
                {items?.dashboardItems?.productsCategories && (
                  <Chart
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Category", "Products"],
                      ...items.dashboardItems.productsCategories.map((x) => [
                        x._id,
                        x.numProducts,
                      ]),
                    ]}
                    options={{
                      title: "Products by Categories Sold",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
