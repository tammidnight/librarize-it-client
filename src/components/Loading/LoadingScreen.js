import Lottie from "react-lottie";
import React, { useEffect, useState } from "react";
import "./Loading.css";
import axios from "axios";

const LoadingScreen = () => {
  const [someJson, setJson] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(
        "https://assets6.lottiefiles.com/packages/lf20_irdkrpwy.json"
      );
      setJson(response.data);
    };

    getData();
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: someJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="loading">
      <Lottie options={defaultOptions} height={"50vw"} width={"50vw"} />
      <p>
        Reading through
        <br />
        all the pages...
      </p>
    </div>
  );
};

export default LoadingScreen;
