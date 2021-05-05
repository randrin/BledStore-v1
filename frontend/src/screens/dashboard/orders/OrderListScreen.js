import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { deleteOrder, listOrders } from "../../../redux/actions/orderActions";
import { ORDER_DELETE_RESET } from "../../../redux/constants/orderConstants";

const OrderListScreen = (props) => {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>All Orders Store</h1>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE (dd/mm/yyyy)</th>
              <th>TOTAL (€)</th>
              <th className="table-text-center">PAID</th>
              <th className="table-text-center">DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td className="table-text-center">{order.isPaid ? moment(order.paidAt).format("DD/MM/YYYY") : "No"}</td>
                <td className="table-text-center">
                  {order.isDelivered
                    ? moment(order.deliveredAt).format("DD/MM/YYYY")
                    : "No"}
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
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    <i className="far fa-window-close danger"></i> Delete 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListScreen;
