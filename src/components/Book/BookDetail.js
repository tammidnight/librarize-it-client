import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import "./Book.css";
import { useNavigate, useParams } from "react-router";
import { Backdrop, Box, Button, Paper, Rating } from "@mui/material";
import LoadingScreen from "../Loading/LoadingScreen";
import { LibraryContext } from "../../context/library.context";
import Review from "./Review";

function BookDetail() {
  const { oneLibrary, setOneLibrary } = useContext(LibraryContext);
  const [book, setBook] = useState(null);
  const { id, libraryId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [reviewValue, setReviewValue] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let bookResponse = await axios.get(`${API_URL}/book/${id}`, {
        withCredentials: true,
      });
      let libraryResponse = await axios.get(`${API_URL}/library/${libraryId}`, {
        withCredentials: true,
      });
      let ratingResponse = await axios.get(`${API_URL}/book/${id}/rating`, {
        withCredentials: true,
      });

      if (ratingResponse.data) {
        if (ratingResponse.data.review) {
          setReviewValue(ratingResponse.data.review.value);
        }
        if (ratingResponse.data.ratingValue) {
          setValue(ratingResponse.data.ratingValue);
        } else {
          setValue(0);
        }
      } else {
        setValue(0);
      }
      setBook(bookResponse.data);
      setOneLibrary(libraryResponse.data);
    };
    getData();
  }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    await axios.patch(
      `${API_URL}/library/${oneLibrary._id}/book/${id}/delete`,
      {
        withCredentials: true,
      }
    );
    navigate(`/library/${oneLibrary._id}`);
  };

  const handleOnChange = async (event, newValue) => {
    await axios.post(
      `${API_URL}/book/${id}/rating`,
      { ratingValue: newValue },
      {
        withCredentials: true,
      }
    );
    setValue(newValue);
  };

  const handleReview = async (event) => {
    event.preventDefault();
    await axios.post(
      `${API_URL}/book/${id}/rating`,
      { review: event.target.review.value },
      {
        withCredentials: true,
      }
    );
    setReviewValue(event.target.review.value);
  };

  if (book) {
    if (book.author) {
      if (book.author.length > 0) {
        book.authors = book.author.join(", ");
      } else {
        book.authors = book.author;
      }
    }
  }

  if (!book || !oneLibrary) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="bookDetail">
        <img src={book.image} alt="" className="cover" />
        <h4>{book.title}</h4>
        {book.authors ? <h4>{book.authors}</h4> : <h4>test</h4>}
        <h5>Status</h5>
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
          value={value}
          onChange={(event, newValue) => {
            handleOnChange(event, newValue);
          }}
          className="booksRating"
        />
        {reviewValue ? (
          <>
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#dfe6ed", width: "auto" }}
              className="paper"
            >
              {reviewValue}
            </Paper>
            <Review
              book={book}
              text={"Edit your"}
              handleReview={handleReview}
              reviewValue={reviewValue}
            />
          </>
        ) : (
          <Review book={book} text={"Write a"} handleReview={handleReview} />
        )}
      </div>

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
          <h3>
            Are you sure you want to delete this book from {oneLibrary.title}?
          </h3>
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
      <FooterNavigation />
    </>
  );
}

export default BookDetail;