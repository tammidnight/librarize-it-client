import React from "react";
import "./Error.css";

function InternalError() {
  return (
    <div className="error">
      <img src="/images/open-book.png" alt="" className="errorImg" />

      <h1 className="errorH">500 internal error</h1>
      <h2>Our developers might be reading too much...</h2>
    </div>
  );
}

export default InternalError;
