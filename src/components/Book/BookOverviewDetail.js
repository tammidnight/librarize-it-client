import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  createTheme,
  MenuItem,
  Paper,
  Rating,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../../config";
import { UserContext } from "../../context/user.context";
import FooterNavigation from "../FooterNavigation";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Book.css";
import { Link } from "react-router-dom";

const formateDate = (date) => {
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const result = day + "/" + month + "/" + date.getFullYear();
  return result;
};

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function BookOverviewDetail() {
  const { user } = useContext(UserContext);
  const [library, setLibrary] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (user) {
        let libraryResponse = await axios.get(
          `${API_URL}/libraries/${user._id}/${id}`,
          {
            withCredentials: true,
          }
        );

        let bookResponse = await axios.get(`${API_URL}/book/${id}`, {
          withCredentials: true,
        });

        let ratingResponse = await axios.get(`${API_URL}/book/${id}/review`, {
          withCredentials: true,
        });

        if (bookResponse.data.author) {
          if (bookResponse.data.author.length > 0) {
            bookResponse.data.authors = bookResponse.data.author.join(", ");
          } else {
            bookResponse.data.authors = bookResponse.data.author;
          }
        }

        if (ratingResponse.data.length === 1) {
          setRating(ratingResponse.data[0].ratingValue);

          if (ratingResponse.data[0].review) {
            ratingResponse.data[0].review.createdDate = formateDate(
              new Date(ratingResponse.data[0].review.created)
            );
            if (!ratingResponse.data[0].user) {
              ratingResponse.data[0].review.user = "Deleted Account";
            } else if (ratingResponse.data[0].review.publicReview) {
              ratingResponse.data[0].review.user =
                ratingResponse.data[0].user.username;
            } else if (!ratingResponse.data[0].review.publicReview) {
              ratingResponse.data[0].review.user = "Anonymous";
            }
            setReviews(ratingResponse.data[0].review);
          }
        } else {
          let arr = [];
          let reviewArr = [];

          ratingResponse.data.forEach((elem) => {
            arr.push(elem.ratingValue);

            if (elem.review) {
              elem.review.createdDate = formateDate(
                new Date(elem.review.created)
              );
              if (!elem.user) {
                elem.review.user = "Deleted Account";
              } else if (elem.review.publicReview) {
                elem.review.user = elem.user.username;
              } else if (!elem.review.publicReview) {
                elem.review.user = "Anonymous";
              }
              reviewArr.push(elem.review);
            }
          });

          const sum = arr.reduce((a, b) => a + b, 0);
          const avg = sum / arr.length;
          setRating(avg);
          setReviews(reviewArr);
        }

        setLibrary(libraryResponse.data);
        setBook(bookResponse.data);
      }
    };
    getData();
  }, [user]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    let newBook = {
      isbn: book.isbn13 || book.isbn10,
      library: event.target.library.value,
    };
    await axios.post(`${API_URL}/add-book`, newBook, {
      withCredentials: true,
    });

    handleClose();
  };

  if (!user || !library || !book) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="bookDetail">
        <img src={book.image} alt="" className="cover" />
        <h4 className="heading">{book.title}</h4>
        <h4 className="heading">{book.authors}</h4>
        <h6>
          {book.isbn13 ? <>ISBN: {book.isbn13}</> : <>ISBN: {book.isbn10}</>}
          <br />
          Pages: {book.pages}
          <br />
          Published: {book.published}
          <br />
          {book.description ? <>Description: {book.description}</> : ""}
        </h6>
        <Rating
          name="simple-controlled"
          value={rating}
          className="booksRating"
        />
        <br />
        <Accordion sx={{ backgroundColor: "#dfe6ed" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Reviews</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pl: "0", pr: "0" }}>
            {reviews.map((elem, index) => {
              return (
                <Paper
                  elevation={1}
                  sx={{ backgroundColor: "#c3cfd9", borderRadius: "0" }}
                  className="paper"
                  key={index}
                >
                  {elem.user} wrote on {elem.createdDate}:<br />
                  {elem.value}
                </Paper>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>

      <Link to={"/book-overview"}>
        <img src="/images/left-arrow.png" alt="back" className="back"></img>
      </Link>

      <img
        src="/images/hinzufugen.png"
        alt="add-book"
        className="addBook"
        onClick={handleToggle}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Box
              component="form"
              onSubmit={handleAdd}
              noValidate
              sx={{ mt: 1 }}
            >
              <Typography
                sx={{
                  color: "black",
                  backgroundColor: "rgba(223, 230, 237, 0.8)",
                  borderRadius: "0.5rem",
                  mb: "1rem",
                }}
              >
                Select a library to add
              </Typography>
              <Select
                id="library"
                label="Library"
                name="library"
                sx={{
                  width: "50vw",
                  mb: "1rem",
                  backgroundColor: "rgba(223, 230, 237, 0.8)",
                  borderRadius: "0.5rem",
                }}
              >
                {library.map((elem) => {
                  return (
                    <MenuItem key={elem._id} value={elem._id}>
                      {elem.title}
                    </MenuItem>
                  );
                })}
              </Select>

              <br />
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#1bae9f",
                  color: "white",
                  width: "30%",
                  mb: 2,
                }}
              >
                Add
              </Button>
            </Box>
          </ThemeProvider>

          <Button
            sx={{
              backgroundColor: "#dfe6ed",
              color: "black",
              width: "25%",
            }}
            onClick={handleClose}
          >
            Back
          </Button>
        </Box>
      </Backdrop>

      <FooterNavigation />
    </>
  );
}

export default BookOverviewDetail;
