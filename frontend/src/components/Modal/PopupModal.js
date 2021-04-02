import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../../redux/actions/userActions";
import { Modal } from "react-responsive-modal";

const PopupModal = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const [showHideModal, setHowHideModal] = useState(false);
  const [email, setEmail] = useState("");

  const userSubscription = useSelector((state) => state.userSubscription);
  const { error, success } = userSubscription;

  const onCloseModal = () => setOpen(false);

  const subscriptionCache =
    JSON.parse(localStorage.getItem("subscription")) &&
    JSON.parse(localStorage.getItem("subscription")).timestamps;
  const subscriptionCacheAfter7Day =
    subscriptionCache + 7 * 24 * 60 * 60 * 1000;
  const currentDate = new Date().getTime();

  useEffect(() => {
    setHowHideModal(currentDate > subscriptionCacheAfter7Day ? false : true);
    if (success) {
      setEmail("");
    }
    if (error) {
      setHowHideModal(false);
    }

    // Check if user already subscribe to newsletter
    if (show) {
      setHowHideModal(show);
    }
  }, [dispatch, success, error]);

  const onChangeHandler = (e) => {
    setShow(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      show,
      timestamps: new Date().getTime(),
    };
    localStorage.setItem("subscription", JSON.stringify(data));
    dispatch(subscribe(email));
  };

  return (
    <>
      {!showHideModal && (
        <Modal open={open} onClose={onCloseModal} center>
          <div className="popup-modal-wrapper">
            <div className="popup-modal-container">
              <div className="popup-modal-background">
                <img
                  src="/assets/images/backgrounds/newsletters.jpg"
                  alt="Newsletters Popup"
                />
              </div>
              <div className="popup-modal-content">
                <h2 className="popup-modal-title">
                  Subscribe And Get 25% Discount!
                </h2>
                <p className="popup-modal-subtitle">
                  Subscribe to the newsletter to receive updates about new
                  products.
                </p>
                <form className="popup-modal-form" onSubmit={submitHandler}>
                  <div className="popup-modal-input-group">
                    <div className="popup-modal-input-row">
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="popup-modal-input-control"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="popup-modal-input-row">
                      <input
                        id="show"
                        name="show"
                        type="checkbox"
                        className="popup-modal-checkbox-control"
                        checked={show}
                        onChange={onChangeHandler}
                      />{" "}
                      <label htmlFor="show">Don't show this popup again!</label>
                    </div>
                    <div className="popup-modal-form-submit">
                      <button
                        type="submit"
                        className="primary popup-modal-input-btn"
                      >
                        <span className="popup-modal-input-btn">
                          {error && show ? "Close Modal" : "Subscribe"}
                        </span>
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </button>
                    </div>
                    <div className="popup-modal-form-error">
                      <span className="popup-modal-form-error-title">
                        {error}
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PopupModal;
