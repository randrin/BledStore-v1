import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  deleteProduct,
  listProducts,
} from "../../../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../../redux/constants/productConstants";

const ProductListScreen = (props) => {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products } = productList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, props.history, sellerMode, successDelete, userInfo._id]);

  const createHandler = () => {
    props.history.push(`/create/product`);
  };

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product <i className="fa fa-angle-double-right"></i>
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      <i className="fa fa-edit success"></i> Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      <i className="fa fa-remove danger"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div> */}
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
