import React from "react";

export default function MessageBox(props) {
  return (
    <div className="message-box-wrapper">
      <div className={`alert alert-${props.variant || "info"}`}>
        <i
          className={`fa ${
            props.variant ? "fa-times-circle-o" : "fa-info-circle"
          } message-box-alert`}
        ></i>{" "}
        {props.children}
      </div>
    </div>
  );
}
