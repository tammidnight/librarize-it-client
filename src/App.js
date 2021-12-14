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
import EditProfile from "./components/User/EditProfile";
import CreateLibrary from "./components/Library/CreateLibrary";
import LibraryDetail from "./components/Library/LibraryDetail";
import LibraryOverview from "./components/Library/LibraryOverview";
import EditLibrary from "./components/Library/EditLibrary";
import BookDetail from "./components/Book/BookDetail";

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
        <Route path="/settings" element={<EditProfile />} />
        <Route path="/create-library" element={<CreateLibrary />} />
        <Route
          path="/profile/:id/library-overview"
          element={<LibraryOverview />}
        />
        <Route path="/library/:id" element={<LibraryDetail />} />
        <Route path="/library/:id/edit" element={<EditLibrary />} />
        <Route path="library/:libraryId/book/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}

export default App;
