import axios from "axios";
import React, { useEffect, useState } from "react";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import LoadingScreen from "../Loading/LoadingScreen";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

function BookOverview() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(`${API_URL}/book-overview`, {
        withCredentials: true,
      });

      let mapping = response.data;

      let mappedBooks = mapping.map((elem) => {
        if (elem.book[0].author) {
          if (elem.book[0].author.length > 0) {
            elem.book[0].authors = elem.book[0].author.join(", ");
          } else {
            elem.book[0].authors = elem.book[0].author;
          }
        }
        return elem;
      });

      let sortedBooks = mappedBooks.sort((a, b) => {
        let keyA = a.avgRating;
        let keyB = b.avgRating;

        if (keyA < keyB) {
          return 1;
        } else if (keyA > keyB) {
          return -1;
        } else {
          return 0;
        }
      });

      setBooks(sortedBooks);
    };

    getData();
  }, []);

  if (!books) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="libraryDiv">
        <h2 className="header">Top rated books</h2>
        <div className="cardDiv">
          {books.map((elem) => {
            return (
              <Card
                sx={{ width: 120, backgroundColor: "#dfe6ed" }}
                className="card"
                key={elem._id}
              >
                <CardMedia
                  component="img"
                  height="50"
                  image={elem.book[0].image}
                  alt="cover"
                />
                <CardContent className="cardContent">
                  <Link to={`/book/${elem._id}`} className="cardLink bookLink">
                    {elem.book[0].title} <br /> {elem.book[0].authors}
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}

export default BookOverview;
