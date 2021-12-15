import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import "./Book.css";
import { useNavigate, useParams } from "react-router";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import LoadingScreen from "../Loading/LoadingScreen";
import { LibraryContext } from "../../context/library.context";
import Review from "./Review";
import { Link } from "react-router-dom";
import EditAuthor from "./EditAuthor";

const statusOptions = ["Not started", "In progress", "Abandoned", "Completed"];

function BookDetail() {
  const { oneLibrary, setOneLibrary } = useContext(LibraryContext);
  const [book, setBook] = useState(null);
  const { id, libraryId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [reviewValue, setReviewValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [authorValue, setAuthorValue] = useState(null);

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

      if (bookResponse.data.author) {
        setAuthorValue(bookResponse.data.author);
      }

      if (ratingResponse.data) {
        if (ratingResponse.data.review) {
          setReviewValue(ratingResponse.data.review.value);
        }
        if (ratingResponse.data.ratingValue) {
          setValue(ratingResponse.data.ratingValue);
        } else {
          setValue(0);
        }
        if (ratingResponse.data.status) {
          setStatusValue(ratingResponse.data.status);
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
      {
        review: event.target.review.value,
        publicReview: event.target.publicReview.checked,
      },
      {
        withCredentials: true,
      }
    );
    setReviewValue(event.target.review.value);
  };

  const handleReviewDelete = async () => {
    await axios.patch(
      `${API_URL}/book/${id}/review`,
      {},
      {
        withCredentials: true,
      }
    );
    setReviewValue(null);
  };

  const handleAuthor = async (event) => {
    event.preventDefault();
    await axios.patch(
      `${API_URL}/book/${id}`,
      { author: event.target.author.value },
      {
        withCredentials: true,
      }
    );
    setAuthorValue(event.target.author.value);
  };

  const handleStatus = async (event, status) => {
    await axios.post(
      `${API_URL}/book/${id}/rating`,
      { status },
      {
        withCredentials: true,
      }
    );
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
        <h4 className="heading">{book.title}</h4>

        <h4 className="heading">{authorValue}</h4>
        <EditAuthor
          book={book}
          authorValue={authorValue}
          handleAuthor={handleAuthor}
        />

        <Autocomplete
          disablePortal
          id="status"
          options={statusOptions}
          size="small"
          sx={{ width: 200 }}
          className="statusInput"
          defaultValue={statusValue}
          renderInput={(params) => <TextField {...params} label="Status" />}
          onChange={(event, status) => {
            handleStatus(event, status);
          }}
        />
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
        <br />
        {reviewValue ? (
          <>
            <Paper
              elevation={3}
              sx={{ backgroundColor: "#dfe6ed", width: "70%" }}
              className="paper"
            >
              {reviewValue}
            </Paper>
            <Review
              book={book}
              text={"Edit your"}
              handleReview={handleReview}
              reviewValue={reviewValue}
              handleReviewDelete={handleReviewDelete}
              isSet="true"
            />
          </>
        ) : (
          <Review book={book} text={"Write a"} handleReview={handleReview} />
        )}
      </div>

      <Link to={`/library/${oneLibrary._id}`}>
        <img src="/images/left-arrow.png" alt="back" className="back"></img>
      </Link>

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
