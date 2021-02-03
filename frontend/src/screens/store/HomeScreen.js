import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import { listProducts } from "../../redux/actions/productActions";
import { Carousel } from "react-responsive-carousel";
import { listTopSellers } from "../../redux/actions/userActions";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeScreen = () => {
  const pageSize = 5;
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page } = productList;

  const usersToSellers = useSelector((state) => state.usersToSellers);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = usersToSellers;

  useEffect(() => {
    dispatch(listProducts({ pageNumber, pageSize }));
    dispatch(listTopSellers());
  }, [dispatch, pageNumber]);

  return (
    <main className="main-wrapper">
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay infiniteLoop showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/page/${x + 1}/size/${pageSize}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default HomeScreen;
