import {
  Avatar,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  createTheme,
  Backdrop,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ErrorContext } from "../../context/error.context";
import "./User.css";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/user.context";
import LoadingScreen from "../Loading/LoadingScreen";
import FooterNavigation from "../FooterNavigation";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate } from "react-router";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const { error } = useContext(ErrorContext);
  let image = null;
  let usernameError = null;
  let emailError = null;
  let passwordError = null;
  const { fetchingUser } = useContext(FetchingUserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  if (user) {
    image = user.image;
  }

  if (error) {
    if (error.username) {
      usernameError = error.username;
    } else if (error.email) {
      emailError = error.email;
    } else if (error.password) {
      passwordError = error.password;
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    let updatedUser = {};

    if (event.target.image.files.length === 0) {
      updatedUser = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        newPassword: event.target.newPassword.value,
      };
    } else {
      let formData = new FormData();
      formData.append("imageUrl", event.target.image.files[0]);

      let imgResponse = await axios.post(`${API_URL}/upload`, formData);

      updatedUser = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        newPassword: event.target.newPassword.value,
        image: imgResponse.data.image,
      };
    }

    let response = await axios.patch(
      `${API_URL}/profile/${user._id}`,
      updatedUser,
      {
        withCredentials: true,
      }
    );
    setUser(response.data);
    navigate(`/profile/${user._id}`);
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/profile/${user._id}/delete`, {
      withCredentials: true,
    });
    setUser(null);
    navigate("/");
  };

  if (fetchingUser || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h6" align="center">
              Edit your personal information
            </Typography>
            <Box
              component="form"
              onSubmit={handleEdit}
              noValidate
              sx={{ mt: 1 }}
            >
              {image ? (
                <Avatar
                  alt="Avatar"
                  src={image}
                  sx={{ width: 125, height: 125 }}
                  className="editAvatar"
                />
              ) : (
                <Avatar
                  alt="Avatar"
                  src="/images/user.png"
                  sx={{ width: 125, height: 125 }}
                  className="editAvatar"
                />
              )}
              <TextField
                margin="normal"
                fullWidth
                id="image"
                name="image"
                type="file"
              />
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                helperText={usernameError ? usernameError : ""}
                error={usernameError ? true : false}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={emailError ? emailError : ""}
                error={emailError ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordError ? passwordError : ""}
                error={passwordError ? true : false}
              />
              <TextField
                margin="normal"
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                helperText={passwordError ? passwordError : ""}
                error={passwordError ? true : false}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: "35%", ml: "35%", width: "30%" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
        <img
          src="/images/garbage.png"
          alt=""
          onClick={handleToggle}
          className="delete"
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <h3>Are you sure you want to delete your account?</h3>
            <Button
              sx={{
                backgroundColor: "#ac6363",
                color: "white",
                width: "25%",
                mb: 2,
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>{" "}
            <Button
              sx={{
                backgroundColor: "#1bae9f",
                color: "white",
                width: "25%",
              }}
            >
              Back
            </Button>
          </Box>
        </Backdrop>
      </ThemeProvider>
      <FooterNavigation />
    </>
  );
}

export default EditProfile;
