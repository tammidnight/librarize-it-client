import React, { useContext, useEffect } from "react";
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
import BookOverview from "./components/Book/BookOverview";
import BookOverviewDetail from "./components/Book/BookOverviewDetail";
import NotFound from "./components/Error/NotFound";
import InternalError from "./components/Error/InternalError";

function App() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
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
      if (err.response.data.error) {
        if (err.response.data.error.username) {
          setError({ username: err.response.data.error.username });
        } else if (err.response.data.error.email) {
          setError({ password: err.response.data.error.email });
        }
      } else if (err.response.data.username) {
        setError({ username: err.response.data.username });
      } else if (err.response.data.email) {
        setError({ email: err.response.data.email });
      } else if (err.response.data.password) {
        setError({ password: err.response.data.password });
      }
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
      if (err.response.data.error) {
        if (err.response.data.error === "Username does not exist") {
          setError({ username: "Username does not exist" });
        } else if (err.response.data.error === "Passwords don't match") {
          setError({ password: "Passwords don't match" });
        }
      } else if (err.response.data.username) {
        setError({ username: err.response.data.username });
      } else if (err.response.data.password) {
        setError({ password: err.response.data.password });
      }
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
        <Route path="/library/:libraryId/book/:id" element={<BookDetail />} />
        <Route path="/book-overview" element={<BookOverview />} />
        <Route path="/book/:id" element={<BookOverviewDetail />} />
        <Route path="/500" element={<InternalError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
