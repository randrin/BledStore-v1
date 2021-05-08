import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../../../../node_modules/axios/index";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { listBrands } from "../../../redux/actions/brandActions";
import { listCagetories } from "../../../redux/actions/categoryActions";
import {
  getProductById,
  updateProduct,
} from "../../../redux/actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../../redux/constants/productConstants";

const ProductEditScreen = (props) => {
  const productId = props.match.params.productId;
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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const categoryList = useSelector((state) => state.categoriesList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const brandList = useSelector((state) => state.brandsList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = brandList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(getProductById(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDiscountPrice(product.discountPrice);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
    dispatch(listCagetories());
    dispatch(listBrands());
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitEditHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
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
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="bledstore-dashboard-wrapper">
      <div className="bledstore-dashboard-btn-back">
        <Link to="/productlist">
          <i className="fas fa-angle-left"></i> Back to Products
        </Link>
      </div>
      <form className="form" onSubmit={submitEditHandler}>
        <div className="bledstore-dashboard-title">
          <h1>Edit Product {productId}</h1>
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
              <textarea
                id="name"
                type="text"
                rows="5"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              ></input>
            </div>
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
              ></textarea>
            </div>
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

export default ProductEditScreen;
