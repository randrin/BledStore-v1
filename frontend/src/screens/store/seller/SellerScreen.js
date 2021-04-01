import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductList from "../../../components/Products/ProductList";
import Rating from "../../../components/Rating";
import { listProducts } from "../../../redux/actions/productActions";
import { getProfileSeller } from "../../../redux/actions/userActions";

const SellerScreen = (props) => {
  const { pageNumber = 1, pageSize = 8 } = useParams();
  const sellerId = props.match.params.sellerId;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
    pages,
    page,
    totalProducts,
  } = productList;

  const sellerDetails = useSelector((state) => state.sellerDetails);
  const { loading, error, seller } = sellerDetails;

  useEffect(() => {
    dispatch(getProfileSeller(sellerId));
    dispatch(listProducts({ seller: sellerId, pageNumber, pageSize }));
  }, [dispatch, sellerId, pageNumber, pageSize]);

  return (
    <div className="seller-wrapper row top">
      <div className="seller-menu-left col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={seller.seller.logo}
                    alt={seller.seller.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{seller.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={seller.seller.rating}
                numReviews={seller.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${seller.email}`}>Contact Seller</a>
            </li>
            <li>{seller.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="seller-content col-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {totalProducts === 0 ? (
              <MessageBox>No Product Found</MessageBox>
            ) : (
              <h2 className="seller-products-count">
                {totalProducts} {totalProducts === 1 ? "Product" : "Products"}{" "}
                for this Seller
              </h2>
            )}
            <div className="row center">
              {products.map((product) => (
                <ProductList key={product._id} product={product}/>
              ))}
            </div>
            {!!products.length && (
                <div className="pagination">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      className={x + 1 === page ? "active" : ""}
                      key={x + 1}
                      to={`/seller/${sellerId}/page/${x + 1}/size/${pageSize}`}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerScreen;
