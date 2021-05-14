import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import DashboardActionModal from "../../../components/Modal/DashboardActionModal";
import {
  deleteProduct,
  listProducts,
} from "../../../redux/actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../../redux/constants/productConstants";
import ShowMoreAndLess from "../../../components/utils/ShowMoreAndLess";
import NavLeft from "../utils/NavLeft";

const ProductListScreen = (props) => {
  const pageSize = 10;
  const { pageNumber = 1 } = useParams();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [indexItem, setindexItem] = useState("");

  const onOpenModal = (acton, index) => {
    setOpen(true);
    setAction(acton);
    setindexItem(index);
  };
  const onCloseModal = () => setOpen(false);

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
    dispatch(deleteProduct(product._id));
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
            <h1>All Products Store</h1>
            <button
              type="button"
              className="bledstore-dashboard-btn primary"
              onClick={createHandler}
            >
              Create Product <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRODUCT NAME</th>
                    <th className="table-text-center">CATEGORY</th>
                    <th className="table-text-center">BRAND</th>
                    <th>SELLER NAME</th>
                    <th className="table-text-center">PRICE (€)</th>
                    <th className="table-text-center">STOCK</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td className="bledstore-dashboard-product">
                        <img
                          className="bledstore-dashboard-product-img"
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                      <td>
                        {<ShowMoreAndLess name={product.name} lgt={20} />}
                      </td>
                      <td className="table-text-center">{product.category}</td>
                      <td className="table-text-center">{product.brand}</td>
                      <td>{product.seller.seller.name}</td>
                      <td className="table-text-center">
                        <span className="product-price">{product.price}</span>{" "}
                        <span className="product-discount-price">
                          {product.discountPrice !== 0
                            ? product.discountPrice
                            : ""}
                        </span>
                      </td>
                      <td className="table-text-center">
                        {product.countInStock > 5 ? (
                          <span className="product-in-stock">In Stock</span>
                        ) : product.countInStock === 0 ? (
                          <span className="product-out-stock">
                            Out of Stock
                          </span>
                        ) : (
                          <span className="product-stock">
                            {product.countInStock}
                          </span>
                        )}
                      </td>
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
                          onClick={() => onOpenModal("delete", index)}
                        >
                          <i className="far fa-window-close danger"></i> Delete
                        </button>
                        {index === indexItem && (
                          <Modal open={open} onClose={onCloseModal} center>
                            <DashboardActionModal
                              onCloseModal={onCloseModal}
                              action={action}
                              item={product}
                              actionHandler={() => deleteHandler(product)}
                            />
                          </Modal>
                        )}
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
      </div>
    </div>
  );
};

export default ProductListScreen;
