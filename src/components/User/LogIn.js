import {
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  createTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../context/error.context";
import "./User.css";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function LogIn(props) {
  const { error } = useContext(ErrorContext);
  let username = null;
  let password = null;

  if (error) {
    if (error.username) {
      username = error.username;
    } else if (error.password) {
      password = error.password;
    }
  }

  return (
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
            To re-enter the book world
            <br />
            please log in
          </Typography>
          <Box
            component="form"
            onSubmit={props.onLogIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              helperText={username ? username : ""}
              error={username ? true : false}
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
              helperText={password ? password : ""}
              error={password ? true : false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: "35%", ml: "35%", width: "30%" }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item margin="auto">
                <Link to="/signup" className="link">
                  {"Don't have an account? Sign Up here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LogIn;
