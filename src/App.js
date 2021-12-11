import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { API_URL } from "./config";
import axios from "axios";
import SignUp from "./components/User/SignUp";
import LogIn from "./components/User/LogIn";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/user.context";
import { ErrorContext } from "./context/error.context";
import LandingPage from "./components/LandingPage";
import "./App.css"

function App() {
  const { user, setUser } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      let newUser = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        confirmPassword: event.target.confirmPassword.value,
      };

      let response = await axios.post(`${API_URL}/signup`, newUser, {
        withCredentials: true,
      });
      setUser(response.data);
      setError(null);
      navigate(`/profile/${response.data._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      let newUser = {
        username: event.target.username.value,
        password: event.target.password.value,
      };

      let response = await axios.post(`${API_URL}/login`, newUser, {
        withCredentials: true,
      });

      setUser(response.data);
      setError(null);
      navigate(`/profile/${response.data._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <Navbar onLogOut={handleLogout} />
      {/* <LoadingScreen /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={<SignUp onSignUp={handleSignUp} error />}
        />
        <Route path="/login" element={<LogIn onLogIn={handleLogIn} error />} />
      </Routes>
    </div>
  );
}

export default App;
