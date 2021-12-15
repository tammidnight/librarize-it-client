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
  Backdrop,
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

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={handleClickOpen} size="small">
        {props.text} review
      </Button>{" "}
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

            {props.isSet ? (
              <>
                <img
                  src="/images/garbage.png"
                  alt=""
                  className="reviewDelete"
                  onClick={handleToggle}
                />
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
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
                    <h3>Are you sure you want to delete this review?</h3>
                    <Button
                      sx={{
                        backgroundColor: "#ac6363",
                        color: "white",
                        width: "25%",
                        mb: 2,
                      }}
                      onClick={() => {
                        props.handleReviewDelete();
                        handleClickClose();
                      }}
                    >
                      Delete
                    </Button>
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
              </>
            ) : (
              ""
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

export default Review;
