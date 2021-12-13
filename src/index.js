import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserWrapper } from "./context/user.context";
import { ErrorWrapper } from "./context/error.context";
import { FetchingUserWrapper } from "./context/fetchingUser.context";
import { LibraryWrapper } from "./context/library.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserWrapper>
        <FetchingUserWrapper>
          <ErrorWrapper>
            <LibraryWrapper>
              <App />
            </LibraryWrapper>
          </ErrorWrapper>
        </FetchingUserWrapper>
      </UserWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
