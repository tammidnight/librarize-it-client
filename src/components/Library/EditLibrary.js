import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Backdrop,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/user.context";
import FooterNavigation from "../FooterNavigation";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Library.css";
import { API_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router";
import { ErrorContext } from "../../context/error.context";
import { LibraryContext } from "../../context/library.context";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function EditLibrary() {
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser } = useContext(FetchingUserContext);
  const { error, setError } = useContext(ErrorContext);
  const { library, setLibrary } = useContext(LibraryContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleEditLibrary = async (event) => {
    event.preventDefault();
    try {
      let newLibrary = {
        title: event.target.title.value,
        description: event.target.description.value,
        publicLibrary: event.target.publicLibrary.checked,
      };

      let response = await axios.patch(
        `${API_URL}/library/${library._id}`,
        newLibrary,
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
      navigate(`/library/${response.data._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleDelete = async () => {
    await axios.delete(`${API_URL}/library/${library._id}/delete`, {
      withCredentials: true,
    });
    setUser(null);
    navigate(`/profile/${user._id}/library-overview`);
  };

  if (fetchingUser || !user) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" align="center">
              Create your own library
            </Typography>
            <img src="/images/library.png" alt="" className="library" />
            <Box
              component="form"
              onSubmit={handleEditLibrary}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of your library"
                name="title"
                autoFocus
                helperText={error ? error : ""}
                error={error ? true : false}
              />
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                multiline
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Make library public"
                name="publicLibrary"
                id="publicLibrary"
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
            <h3>Are you sure you want to delete this library?</h3>
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
    </div>
  );
}

export default EditLibrary;
