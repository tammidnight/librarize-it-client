import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FooterNavigation from "../FooterNavigation";
import { API_URL } from "../../config";
import LoadingScreen from "../Loading/LoadingScreen";
import { UserContext } from "../../context/user.context";
import BookOverviewList from "./BookOverviewList";
import BookOverviewGrid from "./BookOverviewGrid";

function BookOverview() {
  const { user, setUser } = useContext(UserContext);
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

  const handleView = async () => {
    let response = await axios.patch(
      `${API_URL}/view`,
      { grid: !user.grid },
      { withCredentials: true }
    );
    setUser(response.data);
  };

  if (!books || !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="bookOverviewDiv">
        <h2 className="bookHeader">
          Top rated books{" "}
          {user.grid ? (
            <img
              src="/images/list.png"
              alt=""
              className="gridList"
              onClick={handleView}
            />
          ) : (
            <img
              src="/images/grid.png"
              alt=""
              className="gridList"
              onClick={handleView}
            />
          )}
        </h2>

        <div className="bookDiv">
          {user.grid ? (
            <BookOverviewGrid books={books} />
          ) : (
            <BookOverviewList books={books} />
          )}
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}

export default BookOverview;
