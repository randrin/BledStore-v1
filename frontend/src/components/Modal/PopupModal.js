import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../../redux/actions/userActions";
import { Modal } from "react-responsive-modal";
import { AFTER_7_DAYS, REGREX_EMAIL } from "../../constants";

const PopupModal = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const [showHideModal, setHowHideModal] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const userSubscription = useSelector((state) => state.userSubscription);
  const { error, success } = userSubscription;

  const onCloseModal = () => setOpen(false);

  const subscriptionCache =
    JSON.parse(localStorage.getItem("subscription")) &&
    JSON.parse(localStorage.getItem("subscription")).timestamps;
  const subscriptionCacheAfter7Day =
    subscriptionCache + AFTER_7_DAYS;
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

  const onFocusHandler = () => {
    setIsValid(true);
    setErrors({});
  };

  const subHandler = () => {
    const data = {
      show: !show,
      timestamps: new Date().getTime(),
    };
    localStorage.setItem("subscription", JSON.stringify(data));
    dispatch(subscribe(email));
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!!email.length) {
      if (show) {
        subHandler();
      } else {
        var pattern = new RegExp(REGREX_EMAIL);
        if (!pattern.test(email)) {
          setIsValid(false);
          errors["email"] = "Please enter valid email address.";
        } else {
          subHandler();
        }
      }
    } else {
      subHandler();
    }
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
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={onFocusHandler}
                        className={`popup-modal-input-control ${
                          !isValid ? "popup-modal-input-error" : ""
                        }`}
                        placeholder="Enter your email address"
                      />
                      <div className="popup-modal-input-text-error">
                        {errors.email}
                      </div>
                    </div>
                    <div className="popup-modal-input-row">
                      <input
                        id="show"
                        name="show"
                        type="checkbox"
                        className="popup-modal-checkbox-control"
                        checked={show}
                        onChange={(e) => setShow(e.target.checked)}
                      />
                      <label htmlFor="show">Don't show this popup again!</label>
                    </div>
                    <div className="popup-modal-form-submit">
                      <button
                        type="submit"
                        className="primary popup-modal-input-btn"
                      >
                        <span className="popup-modal-input-btn">
                          {show ? "Close Modal without subscribe" : "Subscribe"}
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
