import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingScreen from "./components/Loading/LoadingScreen";
import { API_URL } from "./config";
import axios from "axios";
import SignUp from "./components/User/SignUp";
import LogIn from "./components/User/LogIn";
import Navbar from "./components/Navbar";
import { UserContext } from "./context/user.context";
import { ErrorContext } from "./context/error.context";
import { FetchingUserContext } from "./context/fetchingUser.context";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Profile from "./components/User/Profile";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const { fetchingUser, setFetchingUser } = useContext(FetchingUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setFetchingUser(false);
        setUser(userResponse.data);
      } catch (err) {
        setFetchingUser(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  }, [user]);

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

  if (fetchingUser) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Navbar onLogOut={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/login" element={<LogIn onLogIn={handleLogIn} />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
