import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  listCagetories,
  deleteCategory,
  activationCategory,
} from "../../../redux/actions/categoryActions";
import {
  CATEGORY_ACTIVATION_RESET,
  CATEGORY_DELETE_RESET,
} from "../../../redux/constants/categoryConstants";

const CategoryListScreen = (props) => {
  const dispatch = useDispatch();

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
    if (window.confirm("Are you sure to delete this category?")) {
      dispatch(deleteCategory(category._id));
    }
  };

  const activateHandler = (category) => {
    if (
      window.confirm(
        `Are you sure to ${
          category.active ? "disabled" : "activate"
        } this category?`
      )
    ) {
      dispatch(activationCategory(category._id));
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>All Categories Store</h1>
        <button
          type="button"
          className="bledstore-dashboard-btn primary"
          onClick={createHandler}
        >
          Create Category <i className="fa fa-angle-double-right"></i>
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
              <th>ICON</th>
              <th>IMAGE</th>
              <th>IS ACTIVE?</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td className="bledstore-dashboard-table-item">
                  <i className={category.icon}></i>
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
                    className={`fa fa-power-off ${
                      category.active ? "success" : "danger"
                    }`}
                  ></i>
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => activateHandler(category)}
                  >
                    <i
                      className={`fa fa-power-off ${
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
                    <i className="fa fa-edit success"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(category)}
                  >
                    <i className="fa fa-remove danger"></i> Delete
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

export default CategoryListScreen;
