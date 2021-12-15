import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import { LibraryContext } from "../../context/library.context";
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
  Divider,
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
  const { oneLibrary, setOneLibrary } = useContext(LibraryContext);
  const [books, setBooks] = useState(null);
  const [booksCopy, setBooksCopy] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let libraryResponse = await axios.get(`${API_URL}/library/${id}`, {
        withCredentials: true,
      });
      setOneLibrary(libraryResponse.data);

      let mapping = libraryResponse.data.books;

      let mappedBooks = mapping.map((elem) => {
        if (elem.author) {
          if (elem.author.length > 0) {
            elem.authors = elem.author.join(", ");
          } else {
            elem.authors = elem.author;
          }
        }
        return elem;
      });

      let sortedBooks = mappedBooks.sort((a, b) => {
        let keyA = a.title;
        let keyB = b.title;

        if (keyA < keyB) {
          return -1;
        } else if (keyA > keyB) {
          return 1;
        } else {
          return 0;
        }
      });

      setBooks(sortedBooks);
      setBooksCopy(sortedBooks);
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
    navigate(`/library/${id}/book/${bookResponse.data._id}`);
  };

  const handleSearch = (event) => {
    let word = event.target.value;
    let mappedBooks = books.filter((elem) => {
      return elem.title.toLowerCase().includes(word.toLowerCase());
    });
    setBooksCopy(mappedBooks);
  };

  if (!oneLibrary || !books || !booksCopy) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="libraryDiv">
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
        <Divider variant="middle" />
        <ThemeProvider theme={theme}>
          <div className="textfieldCenter">
            <TextField
              margin="normal"
              required
              id="search"
              label="Search for title"
              name="search"
              autoFocus
              onChange={handleSearch}
              size="small"
              sx={{ width: "85vw" }}
            />
          </div>
        </ThemeProvider>
        <div className="books">
          {booksCopy.map((elem) => {
            return (
              <Card
                sx={{ width: 120, backgroundColor: "#dfe6ed" }}
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
                  <Link
                    to={`/library/${id}/book/${elem._id}`}
                    className="cardLink bookLink"
                  >
                    {elem.title} <br /> {elem.authors}
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
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
                sx={{
                  backgroundColor: "rgba(223, 230, 237, 0.8)",
                  borderRadius: "0.5rem",
                }}
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
    </>
  );
}

export default LibraryDetail;
