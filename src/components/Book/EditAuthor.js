import {
  Dialog,
  ThemeProvider,
  Button,
  createTheme,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import React, { useState } from "react";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function EditAuthor(props) {
  const [author, setAuthor] = useState(false);
  const handleClickOpen = () => {
    setAuthor(true);
  };
  const handleClickClose = () => {
    setAuthor(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        sx={{ fontSize: "10px", mb: "2rem" }}
      >
        Edit author
      </Button>

      <Dialog open={author} onClose={handleClickClose}>
        <Box component="form" onSubmit={props.handleAuthor} noValidate>
          <DialogTitle>Edit the author for {props.book.title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="author"
              label="Author"
              type="text"
              fullWidth
              variant="standard"
              margin="normal"
              multiline
              defaultValue={props.authorValue}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClickClose}>
              Submit
            </Button>
            <Button onClick={handleClickClose}>Back</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

export default EditAuthor;
