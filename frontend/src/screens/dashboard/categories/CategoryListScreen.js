import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import DashboardActionModal from "../../../components/Modal/DashboardActionModal";
import {
  listCagetories,
  deleteCategory,
  activationCategory,
} from "../../../redux/actions/categoryActions";
import {
  CATEGORY_ACTIVATION_RESET,
  CATEGORY_DELETE_RESET,
} from "../../../redux/constants/categoryConstants";
import NavLeft from "../utils/NavLeft";

const CategoryListScreen = (props) => {
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

  const createHandler = () => {
    window.location.href = `/create/category`;
  };

  const categoryList = useSelector((state) => state.categoriesList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const categoryActivation = useSelector((state) => state.categoryActivation);
  const {
    loading: loadingActivation,
    error: errorActivation,
    success: successActivation,
  } = categoryActivation;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    if (successActivation) {
      dispatch({ type: CATEGORY_ACTIVATION_RESET });
    }
    dispatch(listCagetories());
  }, [dispatch, successDelete, successActivation]);

  const deleteHandler = (category) => {
    dispatch(deleteCategory(category._id));
    setOpen(false);
  };

  const activateHandler = (category) => {
    dispatch(activationCategory(category._id));
    setOpen(false);
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row top">
        <div className="bledstore-dashboard-col-1">
          <NavLeft />
        </div>
        <div className="bledstore-dashboard-col-3">
          <div className="row">
            <h1>All Categories Store</h1>
            <button
              type="button"
              className="bledstore-dashboard-btn primary"
              onClick={createHandler}
            >
              Create Category <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {loadingActivation && <LoadingBox></LoadingBox>}
          {errorActivation && (
            <MessageBox variant="danger">{errorActivation}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID CATEGORY</th>
                  <th>NAME</th>
                  <th className="table-text-center">ICON</th>
                  <th className="table-text-center">IMAGE</th>
                  <th className="table-text-center">IS ACTIVE?</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category._id}</td>
                    <td>{category.name}</td>
                    <td className="bledstore-dashboard-table-item">
                      <i
                        className={`bledstore-dashboard-table-item-icon ${category.icon}`}
                      ></i>
                    </td>
                    <td className="bledstore-dashboard-table-item">
                      <img
                        src={category.image}
                        alt={category.name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className="bledstore-dashboard-table-item">
                      <i
                        className={`fas fa-power-off ${
                          category.active ? "success" : "danger"
                        }`}
                      ></i>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => onOpenModal("activate", index)}
                      >
                        <i
                          className={`fas fa-power-off ${
                            category.active ? "danger" : "success"
                          }`}
                        ></i>{" "}
                        {category.active ? "Disactivate" : "Activate"}
                      </button>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          props.history.push(`/category/${category._id}/edit`);
                        }}
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
                            item={category}
                            actionHandler={
                              action === "delete"
                                ? () => deleteHandler(category)
                                : () => activateHandler(category)
                            }
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
      </div>
    </div>
  );
};

export default CategoryListScreen;
