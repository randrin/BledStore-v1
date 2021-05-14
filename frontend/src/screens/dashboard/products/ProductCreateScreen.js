import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { listBrands } from "../../../redux/actions/brandActions";
import { listCagetories } from "../../../redux/actions/categoryActions";
import { createProduct } from "../../../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../../redux/constants/productConstants";
import NavLeft from "../utils/NavLeft";

const ProductCreateScreen = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [showImage, setShowImage] = useState(false);

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const brandList = useSelector((state) => state.brandsList);
  const { loading: loadingBrands, error: errorBrands, brands } = brandList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(
        `${userInfo.isAdmin ? "/productlist" : "/productlist/seller"}`
      );
    }
    dispatch(listCagetories());
    dispatch(listBrands());
  }, [dispatch, props.history, success, userInfo.isAdmin]);

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        discountPrice,
        image,
        category,
        brand,
        countInStock,
        description,
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
      <div className="row top">
        <div className="bledstore-dashboard-col-1">
          <NavLeft />
        </div>
        <div className="bledstore-dashboard-col-3">
          <div className="row">
            {/* <div className="bledstore-dashboard-btn-back">
              <Link to="/productlist">
                <i className="fas fa-angle-left"></i> Back to Products
              </Link>
            </div> */}
            <form className="form" onSubmit={submitCreateHandler}>
              <div className="bledstore-dashboard-title">
                <h1>Create New Product</h1>
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
                    <textarea
                      id="name"
                      type="text"
                      rows="5"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="price">
                      Price <span className="form-required">*</span>
                    </label>
                    <input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="discountPrice">Discount Price</label>
                    <input
                      id="discountPrice"
                      type="number"
                      placeholder="Enter discount price"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
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
                    <label htmlFor="category">
                      Category <span className="form-required">*</span>
                    </label>
                    {loadingCategories ? (
                      <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        <option value="" disabled hidden>
                          Select the Category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div>
                    <label htmlFor="brand">
                      Brand <span className="form-required">*</span>
                    </label>
                    {loadingBrands ? (
                      <LoadingBox></LoadingBox>
                    ) : errorBrands ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                      <select
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                      >
                        <option value="" disabled hidden>
                          Select the Brand
                        </option>
                        {brands.map((brand, index) => (
                          <option key={index} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div>
                    <label htmlFor="countInStock">
                      Count In Stock <span className="form-required">*</span>
                    </label>
                    <input
                      id="countInStock"
                      type="text"
                      placeholder="Enter countInStock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="description">
                      Description <span className="form-required">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows="10"
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label></label>
                    <button
                      className="bledstore-dashboard-btn primary"
                      type="submit"
                    >
                      <i className="fas fa-check"></i> Create
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreateScreen;
