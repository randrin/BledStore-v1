import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatBox from "../components/ChatBox";

const BledStoreFooter = () => {
  const currentYear = new Date().getFullYear();
  const createdYear = "2020";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <>
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s. Lorem Ipsum is ...
                </p>
              </div>
              <div className="bledstore-footer-socials">
                <a
                  href="#"
                  className="bledstore-social-facebook"
                  title="Facebook Store"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="bledstore-social-twitter"
                  title="Twitter Store"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="bledstore-social-instagram"
                  title="Instagram Store"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="bledstore-social-youtube"
                  title="Youtube Store"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="bledstore-footer-link">
              <Link
                to="/terms-conditions"
                className="footer-link"
                title="Terms and Conditions"
              >
                Terms and Conditions
              </Link>
              <Link
                to="/privacies-policies"
                className="footer-link"
                title="Privacies Policies"
              >
                Privacies Policies
              </Link>
              <Link
                to="/cookies-policies"
                className="footer-link"
                title="Cookies Policies"
              >
                Cookies Policies
              </Link>
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
                <i className="icon-phone fas fa-phone-alt"></i>
                <span>Got Question? Call us 24/7</span>
                <a href="tel:6 46 55 87 98" className="footer-number">
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
                <Link to="/about">About Bled Store</Link>
                <Link to="/career">Career at Bled Store</Link>
                <Link to="/services">Our Services</Link>
                <Link to="/partners">Our Partners</Link>
                <Link to="/news">Our News</Link>
                <Link to="/blogs">Our Blogs</Link>
              </div>
            </div>
            <div className="bledstore-footer-box-quarter">
              <h2>My Account</h2>
              <div className="box-quarter">
                {userInfo ? <Link to="/profile">Hello {userInfo.pseudo}</Link> : <Link to="/signin">Sign In / Sign Up</Link>}
                <a href="#" title="">
                  How to create an account
                </a>
                <Link to="/cart">My Shopping Cart</Link>
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
                <Link to="/steps-shopping">How to buy on xxxx</Link>
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
    </>
  );
};

export default BledStoreFooter;
