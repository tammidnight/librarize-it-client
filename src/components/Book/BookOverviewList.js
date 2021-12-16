import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

function BookOverviewList(props) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }} className="listBox">
      <List>
        {props.books.map((elem) => {
          return (
            <div key={elem._id}>
              <ListItem disablePadding>
                <Link to={`/book/${elem._id}`} className="cardLink bookLink">
                  <ListItemButton>
                    <ListItemIcon className="listImgIcon">
                      <img
                        src={elem.book[0].image}
                        alt="cover"
                        className="listImg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={elem.book[0].title}
                      secondary={elem.book[0].authors}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Box>
  );
}

export default BookOverviewList;
