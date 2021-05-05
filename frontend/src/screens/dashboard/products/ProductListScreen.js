import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  deleteProduct,
  listProducts,
} from "../../../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../../redux/constants/productConstants";

const ProductListScreen = (props) => {
  const pageSize = 10;
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page } = productList;

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
      dispatch(
        listProducts({
          seller: sellerMode ? userInfo._id : "",
          pageNumber,
          pageSize,
        })
      );
    }
    dispatch(
      listProducts({
        seller: sellerMode ? userInfo._id : "",
        pageNumber,
        pageSize,
      })
    );
  }, [
    dispatch,
    props.history,
    sellerMode,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const createHandler = () => {
    props.history.push(`/create/product`);
  };

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete this product?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="row">
        <h1>All Products Store</h1>
        <button type="button" className="bledstore-dashboard-btn primary" onClick={createHandler}>
          Create Product <i className="fas fa-angle-double-right"></i>
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
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>SELLER NAME</th>
                <th className="table-text-center">PRICE (€)</th>
                <th className="table-text-center">PRODUCT STOCK</th>
                <th className="table-text-center">CATEGORY</th>
                <th className="table-text-center">BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.seller.seller.name}</td>
                  <td className="table-text-center"><span className="product-price">{product.price}</span> <span className="product-discount-price">{product.discountPrice !== 0 ? product.discountPrice : ""}</span></td>
                  <td className="table-text-center">{product.countInStock}</td>
                  <td className="table-text-center">{product.category}</td>
                  <td className="table-text-center">{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      <i className="far fa-edit success"></i> Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      <i className="far fa-window-close danger"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlist/page/${x + 1}/size/${pageSize}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
