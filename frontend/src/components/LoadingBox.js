import React from "react";

export default function LoadingBox() {
  return (
    <div className="loading">
      <img src="/assets/images/loading.gif" alt="Loading" width="200" height="200" />
      <span>Loading...</span>
    </div>
  );
}
