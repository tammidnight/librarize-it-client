import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function BookOverviewGrid(props) {
  return (
    <>
      {props.books.map((elem) => {
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
    </>
  );
}

export default BookOverviewGrid;
