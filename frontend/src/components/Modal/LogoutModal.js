import React from "react";
import { Link } from "react-router-dom";

const LogoutModal = ({ onCloseModal, signoutHandler }) => {
  return (
    <div className="logout-modal-wrapper">
      <div className="logout-modal-container">
        <div className="logout-modal-header">
          <i className="logout-modal-img fas fa-info-circle"></i>
        </div>
        <div className="logout-modal-body">
          <h2 className="logout-modal-title">Attention</h2>
          <p className="logout-modal-subtitle">
            Êtes vous sûre de vouloir quitter l' AurelandoShop ?
          </p>
        </div>
        <div className="logout-modal-footer">
          <button className="primary logout-modal-back">
            <Link to="#" onClick={onCloseModal}>
              <i className="fas fa-long-arrow-alt-left"></i> Back
            </Link>
          </button>
          <button className="primary logout-modal-signout">
            <Link to="#" onClick={signoutHandler}>
              Logout <i className="fas fa-long-arrow-alt-right"></i>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
