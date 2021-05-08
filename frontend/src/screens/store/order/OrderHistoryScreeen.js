import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { getMyOrderList } from "../../../redux/actions/orderActions";

const OrderHistoryScreeen = (props) => {
  const dispatch = useDispatch();
  const mineOrdersList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = mineOrdersList;

  useEffect(() => {
    dispatch(getMyOrderList());
  }, [dispatch]);
  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>Order Histories</h1>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE (dd/mm/yyyy)</th>
                <th className="table-text-center">TOTAL (€)</th>
                <th className="table-text-center">PAID</th>
                <th className="table-text-center">DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                  <td className="table-text-center">
                    {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="table-text-center">
                    {order.isPaid
                      ? <span className="alert alert-success">{moment(order.paidAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                      : <span className="alert alert-danger">No</span>}
                  </td>
                  <td className="table-text-center">
                    {order.isDelivered
                      ? <span className="alert alert-success">{moment(order.deliveredAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                      : <span className="alert alert-danger">No</span>}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <i className="fas fa-file-alt success"></i> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryScreeen;
