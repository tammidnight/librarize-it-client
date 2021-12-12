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

function SignUp(props) {
  const { error } = useContext(ErrorContext);
  let username = null;
  let email = null;
  let password = null;

  if (error) {
    if (error.username) {
      username = error.username;
    } else if (error.email) {
      email = error.email;
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
          <Typography component="h1" variant="h6" align="center">
            To turn the page and get entrance to the magical library please tell
            us some things about you
          </Typography>
          <Box
            component="form"
            onSubmit={props.onSignUp}
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
              autoFocus
              helperText={username ? username : ""}
              error={username ? true : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={email ? email : ""}
              error={email ? true : false}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item margin="auto">
                <Link to="/login" className="link">
                  {"Already have an account? Log In instead"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
