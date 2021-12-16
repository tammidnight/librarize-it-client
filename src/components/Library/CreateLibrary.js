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
} from "@mui/material";
import React, { useContext } from "react";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/user.context";
import FooterNavigation from "../FooterNavigation";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Library.css";
import { API_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router";
import { ErrorContext } from "../../context/error.context";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function CreateLibrary() {
  const { user, setUser } = useContext(UserContext);
  const { fetchingUser } = useContext(FetchingUserContext);
  const { error, setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleCreateLibrary = async (event) => {
    event.preventDefault();
    try {
      let newLibrary = {
        title: event.target.title.value,
        description: event.target.description.value,
        /*  publicLibrary: event.target.publicLibrary.checked, */
      };

      let response = await axios.post(`${API_URL}/create-library`, newLibrary, {
        withCredentials: true,
      });
      setUser(response.data);
      navigate(`/library/${response.data._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
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
              onSubmit={handleCreateLibrary}
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
              {/*   <FormControlLabel
                control={<Checkbox />}
                label="Make library public"
                name="publicLibrary"
                id="publicLibrary"
              /> */}
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
      </ThemeProvider>
      <FooterNavigation />
    </div>
  );
}

export default CreateLibrary;
