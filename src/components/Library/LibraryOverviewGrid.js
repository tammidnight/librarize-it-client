import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LibraryOverviewGrid(props) {
  return (
    <>
      {props.library.map((elem) => {
        return (
          <Card
            sx={{ width: 100, backgroundColor: "#dfe6ed" }}
            className="card"
            key={elem._id}
          >
            <CardMedia
              component="img"
              height="75"
              image="/images/library.png"
              alt="library"
            />
            <CardContent className="cardContent">
              <Link to={`/library/${elem._id}`} className="cardLink">
                <Typography>{elem.title}</Typography>
              </Link>
              <Link to={`/library/${elem._id}/edit`}>
                <img
                  src="/images/pencil.png"
                  alt="settings"
                  className="pencil"
                />
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export default LibraryOverviewGrid;
