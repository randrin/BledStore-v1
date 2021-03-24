import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { signup } from "../../../redux/actions/userActions";

const RegisterScreen = (props) => {
  const [pseudo, setPseudo] = useState("");
  const [phone, setPhone] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const user = useSelector((state) => state.userSignup);
  const { loading, error, userInfo } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm password don t matched");
    } else {
      dispatch(signup(pseudo, name, email, phone, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [dispatch, props.history, redirect, userInfo]);

  const showHideIcon = (e) => {
    if (e.target.id === "blestaore-auth-show-hide-password") {
      passwordType === "password"
        ? setPasswordType("text")
        : setPasswordType("password");
    } else {
      confirmPasswordType === "password"
        ? setConfirmPasswordType("text")
        : setConfirmPasswordType("password");
    }
  };

  return (
    <>
      <HelmetSite title={"Sign Up"} />
      <div className="bledstore-auth-wrapper">
        <form className="form" onSubmit={submitHandler}>
          <div className="bledstore-auth-title">
            <i className="bledstore-auth-title-icon fas fa-user-circle"></i>
            <h1>Sign Up</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="bledstore-auth-register-promo">
            <img
              src="/assets/images/svg/Promo-BW.svg"
              alt="Promotion Registration"
              width="30"
            />{" "}
            <span className="bledstore-auth-register-title">
              Register now to get a $5 Coupon as New User
            </span>
          </div>
          <div>
            <label htmlFor="pseudo">
              Pseudo <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="pseudo"
              placeholder="Enter pseudo"
              required
              onChange={(e) => setPseudo(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="name">
              Name <span className="form-required">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">
              Email address <span className="form-required">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number <span className="form-required">*</span>
            </label>
            <input
              type="number"
              id="phone"
              placeholder="Enter phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">
              Password <span className="form-required">*</span>
            </label>
            <input
              type={passwordType}
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span className="bledstore-auth-show-hide-content">
              <i
                id="blestaore-auth-show-hide-password"
                onClick={(e) => showHideIcon(e)}
                className={`bledstore-auth-show-hide-icon fas fa-${
                  passwordType === "password" ? "eye" : "eye-slash"
                }`}
              ></i>
            </span>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password <span className="form-required">*</span>
            </label>
            <input
              type={confirmPasswordType}
              id="confirmPassword"
              placeholder="Enter confirm password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <span className="bledstore-auth-show-hide-content">
              <i
                id="blestaore-auth-show-hide-confirmPassword"
                onClick={(e) => showHideIcon(e)}
                className={`bledstore-auth-show-hide-icon fas fa-${
                  confirmPasswordType === "password" ? "eye" : "eye-slash"
                }`}
              ></i>
            </span>
          </div>
          <div>
            <label />
            <button className="bledstore-auth-btn-submit primary" type="submit">
              Register <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
          <div className="bledstore-auth-footer">
            <label />
            <div>
              Already have an account ?
              <Link
                to={`/signin?redirect=${redirect}`}
                className="bledstore-auth-cta"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
