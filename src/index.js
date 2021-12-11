import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserWrapper } from "./context/user.context";
import { ErrorWrapper } from "./context/error.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserWrapper>
        <ErrorWrapper>
          <App />
        </ErrorWrapper>
      </UserWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
