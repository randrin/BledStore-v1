import React from "react";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const MenuUser = ({ user, products, loading, error }) => {

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="main-user-container">
      <div className="main-user-profile">
        {user ? (
          <>
            <div className="main-user-profile-pseudo">
              <span>
                {user.name.split(" ")[0].substring(0, 1)}
                {user.name.split(" ")[1]
                  ? user.name.split(" ")[1].substring(0, 1)
                  : user.name.split(" ")[0].substring(1, 2)}
              </span>
            </div>
            <h2 className="main-user-profile-title">
              Welcome back, {user.pseudo}
            </h2>
          </>
        ) : (
          <>
            <img
              src="/assets/images/avatar.jpg"
              alt="Default Avater"
              className="main-user-profile-img"
            />
            <h2 className="main-user-profile-title">
              Welcome to Aurelando Shop
            </h2>
          </>
        )}
      </div>
      {user ? (
        <div className="main-user-menu-links">
          <div className="main-user-menu-link">
            <Link to="/profile">
              <i className="fas fa-user-alt main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Account</span>
            </Link>
          </div>
          <div className="main-user-menu-link">
            <Link to="/orders/history">
              <i className="fas fa-clipboard-list main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Orders</span>
            </Link>
          </div>
          <div className="main-user-menu-link">
            <Link to="/messages">
              <i className="fas fa-comment-dots main-user-menu-link-img"></i>
              <span className="main-user-menu-link-title">Messages</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="main-user-links">
          <Link to="/register" className="main-user-link">
            Join Us
          </Link>
          <Link to="/signin" className="main-user-link">
            Sign In
          </Link>
        </div>
      )}
      <div className="main-user-content">
        <div className="main-user-content-top">
          <Link to="/">
            <p className="main-user-content-top-title">Welcome new user !!!</p>
            <h2 className="main-user-content-top-subtitle">
              5€ Hot pick & Coupons
            </h2>
          </Link>
        </div>
        <div className="main-user-content-middle">
          <Link to="/">
            <img
              src="/assets/images/gif/promo.gif"
              alt="Promo Gif"
              className="main-user-content-middle-img"
            />
            <h2 className="main-user-content-middle-title">
              Get your 10€ coupon
            </h2>
          </Link>
        </div>
        <div className="main-user-content-bottom">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Products Found</MessageBox>
              )}
              <div className="products-carousel">
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlay
                  autoPlaySpeed={2000}
                  centerMode={false}
                  className=""
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={responsive}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={2}
                  swipeable
                >
                  {products.map((product, index) => (
                    <Link key={index} to={`/product/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="products-carousel-img"
                      />
                      <span className="products-carousel-price">
                        {product.discountPrice
                          ? product.discountPrice
                          : product.price} €
                      </span>
                    </Link>
                  ))}
                </Carousel>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuUser;
