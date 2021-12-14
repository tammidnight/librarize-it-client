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

function Review(props) {
  const [review, setReview] = useState(false);
  const handleClickOpen = () => {
    setReview(true);
  };
  const handleClickClose = () => {
    setReview(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={handleClickOpen} size="small">
        {props.text} review
      </Button>

      <Dialog open={review} onClose={handleClickClose}>
        <Box component="form" onSubmit={props.handleReview} noValidate>
          <DialogTitle>
            {props.text} review for {props.book.title}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="review"
              label="Review"
              type="text"
              fullWidth
              variant="standard"
              margin="normal"
              multiline
              defaultValue={props.reviewValue}
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

export default Review;
