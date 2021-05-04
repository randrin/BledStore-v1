import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  activationBrand,
  deleteBrand,
  listBrands,
} from "../../../redux/actions/brandActions";
import { BRAND_ACTIVATION_RESET, BRAND_DELETE_RESET } from "../../../redux/constants/brandConstants";

const BrandListScreen = (props) => {
  const dispatch = useDispatch();

  const createHandler = () => {
    window.location.href = `/create/brand`;
  };

  const brandList = useSelector((state) => state.brandsList);
  const { loading, error, brands } = brandList;

  const brandDelete = useSelector((state) => state.brandDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = brandDelete;

  const brandActivation = useSelector((state) => state.brandActivation);
  const {
    loading: loadingActivation,
    error: errorActivation,
    success: successActivation,
  } = brandActivation;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BRAND_DELETE_RESET });
    }
    if (successActivation) {
      dispatch({ type: BRAND_ACTIVATION_RESET });
    }
    dispatch(listBrands());
  }, [dispatch, successDelete, successActivation]);

  const deleteHandler = (brand) => {
    if (window.confirm("Are you sure to delete this brand?")) {
      dispatch(deleteBrand(brand._id));
    }
  };

  const activateHandler = (brand) => {
    if (
      window.confirm(
        `Are you sure to ${brand.active ? "disabled" : "activate"} this brand?`
      )
    ) {
      dispatch(activationBrand(brand._id));
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>All Brands Store</h1>
        <button
          type="button"
          className="bledstore-dashboard-btn primary"
          onClick={createHandler}
        >
          Create Brand <i className="fas fa-angle-double-right"></i>
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
              <th>ID Brands</th>
              <th>NAME</th>
              <th className="table-text-center">IMAGE</th>
              <th className="table-text-center">IS ACTIVE?</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{brand.name}</td>
                <td className="bledstore-dashboard-table-item">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    width="50"
                    height="50"
                  />
                </td>
                <td className="bledstore-dashboard-table-item">
                  <i
                    className={`fas fa-power-off ${
                      brand.active ? "success" : "danger"
                    }`}
                  ></i>
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => activateHandler(brand)}
                  >
                    <i
                      className={`fas fa-power-off ${
                        brand.active ? "danger" : "success"
                      }`}
                    ></i>{" "}
                    {brand.active ? "Disactivate" : "Activate"}
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/brand/${brand._id}/edit`);
                    }}
                  >
                    <i className="far fa-edit success"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(brand)}
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

export default BrandListScreen;
