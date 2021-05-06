import React from "react";
import { Link } from "react-router-dom";

const DashboardActionModal = ({
  onCloseModal,
  action,
  item,
  actionHandler,
}) => {
  return (
    <div className="logout-modal-wrapper">
      <div className="logout-modal-container">
        <div className="logout-modal-header">
          <i
            className={`logout-modal-img fas ${
              action === "delete"
                ? "fa-trash-alt"
                : item.active
                ? "fa-exclamation-triangle"
                : "fa-check-circle"
            }`}
          ></i>
        </div>
        <div className="logout-modal-body">
          <h2 className="logout-modal-title">Attention</h2>
          <p className="logout-modal-subtitle">
            Êtes vous sûre de vouloir{" "}
            {action === "delete"
              ? "supprimer"
              : item.active
              ? "désactiver"
              : "activer"}{" "}
            {item.name}?
          </p>
        </div>
        <div className="logout-modal-footer">
          <button className="primary logout-modal-back">
            <Link to="#" onClick={onCloseModal}>
              <i className="fas fa-long-arrow-alt-left"></i> Cancel
            </Link>
          </button>
          <button className="primary logout-modal-signout">
            <Link to="#" onClick={actionHandler}>
              {action === "delete"
                ? "Supprimer"
                : item.active
                ? "Désactiver"
                : "Activer"}{" "}
              <i className="fas fa-long-arrow-alt-right"></i>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardActionModal;
