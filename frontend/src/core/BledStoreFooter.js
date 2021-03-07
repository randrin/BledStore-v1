import React from "react";
import { Link } from "react-router-dom";

const BledStoreFooter = () => {
  const currentYear = new Date().getFullYear();
  const createdYear = "2020";

  return (
    <footer className="row center">
      <div className="bledstore-footer-wrapper">
        <div className="bledstore-footer-box">
          <div className="bledstore-footer-store">
            <div className="bledstore-footer-store-infos">
            <h2>
              <Link to="/">
                <img
                className="bledstore-footer-store-infos-logo"
                  src="/assets/images/logo/logo.png"
                  alt="Logo Compagny Page"
                />
              </Link>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s. Lorem Ipsum is ...
            </p>
            </div>
            <div className="bledstore-footer-socials">
              <a
                href="#"
                className="bledstore-social-facebook"
                title="Facebook Store"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="#"
                className="bledstore-social-twitter"
                title="Twitter Store"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                href="#"
                className="bledstore-social-instagram"
                title="Instagram Store"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="#"
                className="bledstore-social-youtube"
                title="Youtube Store"
              >
                <i className="fa fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="bledstore-footer-link">
            <a href="#" className="footer-link" title="Terms and Conditions">
              Terms and Conditions
            </a>
            <a href="#" className="footer-link" title="Privacies Policies">
              Privacies Policies
            </a>
            <a href="#" className="footer-link" title="Cookies Policies">
              Cookies Policies
            </a>
            <div className="bledstore-footer-appstore">
              <a href="#" title="App Store">
                <img
                  src="/assets/images/appstores/App_Store.png"
                  alt="App Store"
                />
              </a>
              <a href="#" title="Google Play">
                <img
                  src="/assets/images/appstores/Google_Play.png"
                  alt="App Store"
                />
              </a>
            </div>
          </div>
          <div className="bledstore-footer-contact">
            <div className="footer-call">
              <i className="icon-phone fa fa-phone"></i>
              <span>Got Question? Call us 24/7</span>
              <a href="#" className="footer-number">
                6 46 55 87 98
              </a>
            </div>
          </div>
        </div>
        <hr className="bledstore-footer-dividing-line" />
        <div className="bledstore-footer-box">
          <div className="bledstore-footer-box-quarter">
            <h2>Who we are?</h2>
            <div className="box-quarter">
              <a href="#" title="">
                About Bled Store
              </a>
              <a href="#" title="">
                Carrer at Bled Store
              </a>
              <a href="#" title="">
                Our Services
              </a>
              <a href="#" title="">
                Our Partners
              </a>
              <a href="#" title="">
                Our News
              </a>
              <a href="#" title="">
                Our Blogs
              </a>
            </div>
          </div>
          <div className="bledstore-footer-box-quarter">
            <h2>My Account</h2>
            <div className="box-quarter">
              <a href="/#/signin" title="">
                Sign In / Sign Up
              </a>
              <a href="#" title="">
                How to create an account
              </a>
              <a href="#" title="">
                My Shopping Cart
              </a>
              <a href="#" title="">
                My Wishlist
              </a>
              <a href="#" title="">
                Track my order
              </a>
            </div>
          </div>
          <div className="bledstore-footer-box-quarter">
            <h2>Customer Services</h2>
            <div className="box-quarter">
              <a href="#" title="">
                How to buy on xxxx
              </a>
              <a href="#" title="">
                Our Payments Methods
              </a>
              <a href="#" title="">
                Informations Delivery
              </a>
              <a href="#" title="">
                Our FAQs
              </a>
              <a href="#" title="">
                Contact Us
              </a>
              <a href="#" title="">
                Need other help?
              </a>
            </div>
          </div>
          <div className="bledstore-footer-box-quarter">
            <h2>Our Shop</h2>
            <div className="box-quarter">
              <a href="#" title="">
                Our offers of the day
              </a>
              <a href="#" title="">
                Our News & Promotions
              </a>
              <a href="#" title="">
                Our Trend Products
              </a>
              <a href="#" title="">
                Our Recommandations
              </a>
              <a href="#" title="">
                Flash Sale
              </a>
              <a href="#" title="">
                Become Seller at Bled Store
              </a>
            </div>
          </div>
        </div>
        <hr className="bledstore-footer-dividing-line" />
        <div className="bledstore-footer-box">
          <div className="bledstore-footer-copyright">
            <p>
              Copyright ©
              {currentYear > createdYear ? (
                <span>
                  {createdYear} - {currentYear}
                </span>
              ) : (
                createdYear
              )}
              . Bled Store. All Rights Reserved.
            </p>
          </div>
          <div className="bledstore-footer-payment">
            <p>Payment Methods</p>
            <img src="/assets/images/payments.png" alt="Payment Methods" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BledStoreFooter;
