import React from "react";

const BannerScreen = () => {
  return (
    <div className="banner-wrapper">
      <div className="banner-left">
        <img
          className="banner-left-img-shipping"
          src="/assets/images/svg/FreeShipping-Red.svg"
          alt="Free Shipping"
        />
        <span className="banner-left-content">
          Free Shipping for Members. Want it?{" "}
          <a href="/register">Create your account now</a>
        </span>
      </div>
      <a href="/" className="banner-right">
        <img
          className="banner-right-img-promo-white"
          src="/assets/images/svg/Promo-BW.svg"
          alt="Banner Promotions"
        />
        <img
          className="banner-right-img-promo-color"
          src="/assets/images/svg/Promo-Color.svg"
          alt="Banner Promotions"
        />
        <span className="banner-right-content">Special Offers</span>
      </a>
    </div>
  );
};

export default BannerScreen;
