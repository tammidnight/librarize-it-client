import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import LoadingScreen from "../Loading/LoadingScreen";
import "./Library.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Backdrop,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    background: { default: "#c3cfd9" },
    primary: { main: "#1bae9f", contrastText: "white" },
  },
  typography: {
    fontFamily: "M PLUS Rounded 1c, sans-serif",
  },
});

function LibraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oneLibrary, setOnelIbrary] = useState(null);
  const [books, setBooks] = useState(null);
  let mappedBooks = "";

  useEffect(() => {
    const getData = async () => {
      let libraryResponse = await axios.get(`${API_URL}/library/${id}`, {
        withCredentials: true,
      });
      setOnelIbrary(libraryResponse.data);
      setBooks(libraryResponse.data.books);
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

  const handleAdd = async (event) => {
    event.preventDefault();
    let newBook = {
      isbn: event.target.isbn.value,
      library: id,
    };
    let bookResponse = await axios.post(`${API_URL}/add-book`, newBook, {
      withCredentials: true,
    });
    navigate(`/book/${bookResponse.data._id}`);
  };

  if (books) {
    mappedBooks = books.map((elem) => {
      if (elem.author.length > 0) {
        elem.authors = elem.author.join(", ");
      }
      return elem;
    });
  }

  if (!oneLibrary || !books) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="libraryHeader">
        <img src="/images/library.png" alt="library" width="75px" />
        <div className="libraryDetails">
          <h3>{oneLibrary.title}</h3>
          <Link to={`/library/${id}/edit`}>
            <img
              src="/images/pencil.png"
              alt="pencil"
              width="15px"
              height="15px"
            />
          </Link>
        </div>
      </div>
      <hr
        height="1px"
        borderwidth="0"
        color="#6e6e6e"
        backgroundcolor="#6e6e6e"
        width="90%"
      />
      <div className="books">
        {mappedBooks.map((elem) => {
          return (
            <Card
              sx={{ width: 100, backgroundColor: "#dfe6ed" }}
              className="card"
              key={elem._id}
            >
              <CardMedia
                component="img"
                height="50"
                image="/images/books.png"
                alt="books"
              />
              <CardContent className="cardContent">
                <Link to={`/book/${elem._id}`} className="cardLink bookLink">
                  {elem.title} <br /> {elem.authors}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="isbn"
                label="ISBN"
                name="isbn"
                autoFocus
              />
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#1bae9f",
                  color: "white",
                  width: "30%",
                  mb: 2,
                }}
              >
                Search
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
    </div>
  );
}

export default LibraryDetail;
