import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./core/routes/Routes";
import "./bledstore.scss";
import BledStoreHeader from "./core/BledStoreHeader";
import BledStoreFooter from "./core/BledStoreFooter";

ReactDOM.render(
  <React.StrictMode>
    <div className="grid-container">
      <BrowserRouter>
        <BledStoreHeader />
        <Route component={Routes} />
        <BledStoreFooter />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("bledstore")
);
