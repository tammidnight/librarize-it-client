import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function NotFound() {
  return (
    <div className="error">
      <h1>404 page not found</h1>
      <h2>
        Oh no you were so focused on reading, that you wanted to enter a non
        existing path.
      </h2>

      <h2>
        Please go back{" "}
        <Link to="/" className="errorLink">
          here
        </Link>
      </h2>
      <img src="/images/open-book.png" alt="" className="errorImg" />
    </div>
  );
}

export default NotFound;
