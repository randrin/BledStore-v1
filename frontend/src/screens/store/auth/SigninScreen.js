import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { signin } from "../../../redux/actions/userActions";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const user = useSelector((state) => state.userSignin);
  const { loading, error, userInfo } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [dispatch, props.history, redirect, userInfo]);

  const showHideIcon = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  return (
    <div className="bledstore-auth-wrapper">
      <form className="form" onSubmit={submitHandler}>
        <div className="bledstore-auth-title">
          <i className="bledstore-auth-title-icon fa fa-user-circle"></i>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
              onClick={showHideIcon}
              className={`bledstore-auth-show-hide-icon fa fa-${
                passwordType === "password" ? "eye" : "eye-slash"
              }`}
            ></i>
          </span>
        </div>
        <div>
          <label />
          <button className="bledstore-auth-btn-submit primary" type="submit">
            Login <i className="fa fa-angle-double-right"></i>
          </button>
        </div>
        <div className="bledstore-auth-footer">
          <label />
          <div>
            New customer?
            <Link
              to={`/register?redirect=${redirect}`}
              className="bledstore-auth-cta"
            >
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
