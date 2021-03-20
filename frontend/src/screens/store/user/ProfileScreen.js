import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  getProfileUser,
  updateProfileUser,
} from "../../../redux/actions/userActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userDetailsUpdate = useSelector((state) => state.userDetailsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userDetailsUpdate;

  useEffect(() => {
    if (!user) {
      dispatch(getProfileUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateProfileUser({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="bledstore-dashboard-btn-back">
        <Link to="/orders/history">
          <i className="fas fa-angle-left"></i> Back to My Orders
        </Link>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">
                Name <span className="form-required">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">
                Email <span className="form-required">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">
                Password <span className="form-required">*</span>
              </label>
              <input
                id="password"
                type={passwordType}
                placeholder="Enter password"
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
                id="confirmPassword"
                type={confirmPasswordType}
                placeholder="Enter confirm password"
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
            {user.isSeller && (
              <>
                <h2>Seller</h2>
                <div>
                  <label htmlFor="sellerName">
                    Seller Name <span className="form-required">*</span>
                  </label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Enter Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">
                    Seller Logo <span className="form-required">*</span>
                  </label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="Enter Seller Logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerDescription">
                    Seller Description <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="sellerDescription"
                    rows="8"
                    type="text"
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></textarea>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="bledstore-auth-btn-submit primary" type="submit">
                Update <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
