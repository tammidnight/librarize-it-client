import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LibraryDetailGrid(props) {
  return (
    <>
      {props.booksCopy.map((elem) => {
        return (
          <Card
            sx={{ width: 120, backgroundColor: "#dfe6ed" }}
            className="card"
            key={elem._id}
          >
            <CardMedia
              component="img"
              height="50"
              image={elem.image}
              alt="books"
            />
            <CardContent className="cardContent">
              <Link
                to={`/library/${props.id}/book/${elem._id}`}
                className="cardLink bookLink"
              >
                {elem.title} <br /> {elem.authors}
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export default LibraryDetailGrid;
