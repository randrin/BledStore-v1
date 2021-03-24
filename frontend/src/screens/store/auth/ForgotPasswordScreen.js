import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HelmetSite from "../../../components/HelmetSite";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { resetPassword } from "../../../redux/actions/userActions";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, userInfo } = userResetPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  return (
    <>
      <HelmetSite title={"Forgot Password"} />
      <div className="bledstore-auth-wrapper">
        <form className="form" onSubmit={submitHandler}>
          <div className="bledstore-auth-title">
            <i className="bledstore-auth-title-icon fas fa-key"></i>
            <h1>Password Assistance</h1>
          </div>
          <div>
            <p>
              Enter the email address or mobile number associated with your xxxx
              account.
            </p>
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
            <label />
            <button className="bledstore-auth-btn-submit primary" type="submit">
              Reset Password <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
          <div className="bledstore-auth-footer">
            <label />
            <div>
              Do you remember your password?
              <Link to={`/signin`} className="bledstore-auth-cta">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPasswordScreen;
