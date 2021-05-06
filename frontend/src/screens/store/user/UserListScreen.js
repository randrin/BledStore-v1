import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import * as moment from "moment";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import DashboardActionModal from "../../../components/Modal/DashboardActionModal";
import { deleteUser, listUsers } from "../../../redux/actions/userActions";
import { USER_DETAILS_RESET } from "../../../redux/constants/userConstants";

const UserListScreen = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [indexItem, setindexItem] = useState("");

  const onOpenModal = (acton, index) => {
    setOpen(true);
    setAction(acton);
    setindexItem(index);
  };
  const onCloseModal = () => setOpen(false);

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
    setOpen(false);
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>All Users Store</h1>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th className="table-text-center">IS SELLER</th>
              <th className="table-text-center">IS ADMIN</th>
              <th>MEMBER FROM (dd/mm/yyyy)</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="table-text-center">{user.isSeller ? "YES" : " NO"}</td>
                <td className="table-text-center">{user.isAdmin ? "YES" : "NO"}</td>
                <td>{moment(user.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    <i className="far fa-edit success"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => onOpenModal("delete", index)}
                  >
                    <i className="far fa-window-close danger"></i> Delete
                  </button>
                  {index === indexItem && (
                    <Modal open={open} onClose={onCloseModal} center>
                      <DashboardActionModal
                        onCloseModal={onCloseModal}
                        action={action}
                        item={user}
                        actionHandler={() => deleteHandler(user)}
                      />
                    </Modal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
