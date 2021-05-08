import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as moment from "moment";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Rating from "../../../components/Rating";
import { createCommentReview } from "../../../redux/actions/reviewActions";
import { REVIEW_CREATE_RESET } from "../../../redux/constants/reviewConstants";

const ReviewScreen = ({ product, productId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showFormReview, setShowFormReview] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const reviewsCreate = useSelector((state) => state.reviews);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
    review,
  } = reviewsCreate;

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review added successfully.");
      setRating(0);
      setComment("");
      setShowFormReview(false);
      dispatch({ type: REVIEW_CREATE_RESET });
    }
  }, [dispatch, successReviewCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createCommentReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please Insert the comment");
    }
  };

  return (
    <div className="review-wrapper">
      <h2 id="reviews">Reviews</h2>
      {product.reviews && product.reviews.length === 0 && userInfo && (
        <MessageBox>
          There is no reviews.
          <Link to="#" onClick={() => setShowFormReview(!showFormReview)}>
            {showFormReview ? "Hide Form review" : "Leave your review"}
          </Link>
        </MessageBox>
      )}
      <ul>
        {product.reviews &&
          product.reviews.map((review) => (
            <li key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt && moment(review.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
              <p>{review.comment && review.comment}</p>
            </li>
          ))}
        <li>
          {userInfo ? (
            <>
              <div>
                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                {errorReviewCreate && (
                  <MessageBox variant="danger">{errorReviewCreate}</MessageBox>
                )}
              </div>
              {showFormReview && (
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <h2>Write a customer review</h2>
                  </div>
                  <div>
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      rows="8"
                      placeholder="Insert the review"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label />
                    <button className="primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <MessageBox>
              Please <Link to="/signin">Sign In</Link> to write a review
            </MessageBox>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ReviewScreen;
