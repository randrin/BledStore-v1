import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./routes/Routes";
import "./bledstore.scss";
import BledStoreHeader from "./core/BledStoreHeader";
import BledStoreFooter from "./core/BledStoreFooter";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <div className="grid-container">
        <BrowserRouter>
          <BledStoreHeader />
          <Route component={Routes} />
          <BledStoreFooter />
        </BrowserRouter>
      </div>
    </React.StrictMode>
  </Provider>,
  document.getElementById("bledstore")
);
