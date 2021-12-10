import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { API_URL } from "./config";
import axios from "axios";
import SignUp from "./components/User/SignUp";
import LogIn from "./components/User/LogIn";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
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
      navigate(`/profile/${response.data._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <div>
      <Navbar />
      <LoadingScreen />
      <Routes>
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
