import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import ProductList from "../../components/Products/ProductList";
import { listProducts } from "../../redux/actions/productActions";
import { Carousel } from "react-responsive-carousel";
import { listTopSellers } from "../../redux/actions/userActions";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DividingLine from "../../components/DividingLine";
import Services from "../../components/Services";
import Categories from "../../components/Categories";
import NewsLetters from "../../components/NewsLetters";
import MenuCategories from "../../components/Menu/MenuCategories";
import MenuUser from "../../components/Menu/MenuUser";
import HelmetSite from "../../components/HelmetSite";
import data from "../../data";
import PopupModal from "../../components/Modal/PopupModal";
import Brand from "../../components/Brand";

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
            {/* <DividingLine title="Top Sellers"></DividingLine> */}
            <div className="sales-wrapper">
              {data.sales.map((sale, index) => (
                <div key={index} className="sale-item">
                  <Link to={sale.link} className="sale-link">
                    <i className={sale.icon}></i>
                    <span className="sale-name">{sale.name}</span>
                    <span className="sale-count">{sale.count}</span>
                  </Link>
                </div>
              ))}
            </div>
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
                  {data.sliders.map((slider) => (
                    <div
                      key={slider._id}
                      style={{ backgroundImage: "url( " + slider.image + " )" }}
                      className="sliders-wrapper"
                    >
                      <div
                        className={`slider-container ${
                          slider.position === "left"
                            ? "slider-left"
                            : slider.position === "right"
                            ? "slider-right"
                            : "slider-center"
                        }`}
                      >
                        <h2 className="slider-title">{slider.title}</h2>
                        <h3 className="slider-name">{slider.name}</h3>
                        <div className="slider-price">
                          <sup className="slider-old-price">
                            {slider.oldPrice.split(".")[0]}€
                          </sup>
                          <span className="slider-new-price">
                            {slider.newPrice.split(".")[0]}{" "}
                            <sup>{slider.newPrice.split(".")[1]}</sup>€
                          </span>
                        </div>
                        <div className="slider-button">
                          <Link to={slider.link} className="slider-btn">
                            {slider.buttonTitle}{" "}
                            <i className="fas fa-long-arrow-alt-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </>
            )}
          </div>
          {/* <div className="col-1">
            <div className="main-user-wrapper">
              <MenuUser
                user={userInfo}
                products={products}
                loading={loading}
                error={error}
              />
            </div>
          </div> */}
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
        <Brand />
        <PopupModal />
      </main>
    </>
  );
};

export default HomeScreen;
