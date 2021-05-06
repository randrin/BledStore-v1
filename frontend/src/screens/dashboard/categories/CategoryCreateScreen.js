import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { createCategory } from "../../../redux/actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "../../../redux/constants/categoryConstants";

const CategoryCreateScreen = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [showImage, setShowImage] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, success } = categoryCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      props.history.push("/categorylist");
    }
  }, [dispatch, props.history, success]);

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCategory({
        name,
        icon,
        image,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios({
        url: `/v1/api/uploads/`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: bodyFormData,
      });
      setImage(data.image);
      setShowImage(true);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="bledstore-dashboard-btn-back">
        <Link to="/categorylist">
          <i className="fas fa-angle-left"></i> Back to Categories
        </Link>
      </div>
      <form className="form" onSubmit={submitCreateHandler}>
        <div className="bledstore-dashboard-title">
          <h1>Create New Category</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                required
              ></input>
            </div>
            <div>
              <label htmlFor="icon">
                Icon <span className="form-required">*</span>
              </label>
              <input
                id="icon"
                type="text"
                placeholder="Enter icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              ></input>
            </div>
            {showImage ? (
              <div>
                <label htmlFor="image">
                  Image <span className="form-required">*</span>
                </label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                ></input>
              </div>
            ) : (
              <div>
                <label htmlFor="imageFile">
                  Image File <span className="form-required">*</span>
                </label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
            )}
            <div>
              <label></label>
              <button className="bledstore-dashboard-btn primary" type="submit">
                <i className="fas fa-check"></i> Create
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CategoryCreateScreen;
