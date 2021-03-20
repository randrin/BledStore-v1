import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  getCategoryById,
  updateCategory,
} from "../../../redux/actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../../../redux/constants/categoryConstants";

const CategoryEditScreen = (props) => {
  const categoryId = props.match.params.categoryId;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [showImage, setShowImage] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/categorylist");
    }
    if (!category || category._id !== categoryId || successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(getCategoryById(categoryId));
    } else {
      setName(category.name);
      setIcon(category.icon);
      setImage(category.image);
    }
  }, [category, dispatch, categoryId, successUpdate, props.history]);

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

  const submitEditHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
        icon,
        image,
      })
    );
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="bledstore-dashboard-btn-back">
        <Link to="/categorylist">
          <i className="fas fa-angle-left"></i> Back to Categories
        </Link>
      </div>
      <form className="form" onSubmit={submitEditHandler}>
        <div className="bledstore-dashboard-title">
          <h1>Edit Category</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
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
                <i className="fas fa-check"></i> Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CategoryEditScreen;
