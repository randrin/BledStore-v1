import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import ProductList from "../../components/ProductList";
import { listProducts } from "../../redux/actions/productActions";
import { Carousel } from "react-responsive-carousel";
import { listTopSellers } from "../../redux/actions/userActions";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DividingLine from "../../components/DividingLine";
import Services from "../../components/Services";
import Categories from "../../components/Categories";
import NewsLetters from "../../components/NewsLetters";
import MenuCategories from "../../components/MenuCategories";
import MenuUser from "../../components/MenuUser";
import HelmetSite from "../../components/HelmetSite";

const HomeScreen = () => {
  const pageSize = 10;
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productList = useSelector((state) => state.productsList);
  const { loading, error, products, pages, page } = productList;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

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
    <>
      <HelmetSite title={"Welcome to Shopping"} />
      <main className="main-wrapper">
        <div className="main-container row">
          <div className="main-categories-wrapper col-1">
            <MenuCategories
              loading={loadingCategories}
              error={errorCategories}
              categories={categories}
            />
          </div>
          <div className="col-2">
            <DividingLine title="Top Sellers"></DividingLine>
            {loadingSellers ? (
              <LoadingBox></LoadingBox>
            ) : errorSellers ? (
              <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
              <>
                {sellers.length === 0 && (
                  <MessageBox>No Seller Found</MessageBox>
                )}
                <Carousel showArrows autoPlay infiniteLoop showThumbs={false}>
                  {sellers.map((seller) => (
                    <div key={seller._id}>
                      <Link to={`/seller/${seller._id}`}>
                        <img
                          src={seller.seller.logo}
                          alt={seller.seller.name}
                        />
                        <p className="legend">{seller.seller.name}</p>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </>
            )}
          </div>
          <div className="col-1">
            <div className="main-user-wrapper">
              <MenuUser user={userInfo} products={products} loading={loading} error={error} />
            </div>
          </div>
        </div>
        <Categories
          loading={loadingCategories}
          error={errorCategories}
          categories={categories}
        />
        <DividingLine title="Featured Products"></DividingLine>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            <div className="row center">
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              {products.map((product, index) => (
                <ProductList key={index} product={product} />
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
        <Services />
        <NewsLetters />
      </main>
    </>
  );
};

export default HomeScreen;
