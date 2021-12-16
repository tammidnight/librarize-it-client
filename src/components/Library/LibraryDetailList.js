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
import "./Library.css";

function LibraryDetailList(props) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }} className="listBox">
      <List>
        {props.booksCopy.map((elem) => {
          return (
            <div key={elem._id}>
              <ListItem disablePadding>
                <Link
                  to={`/library/${props.id}/book/${elem._id}`}
                  className="cardLink bookLink"
                >
                  <ListItemButton>
                    <ListItemIcon className="listImgIcon">
                      <img src={elem.image} alt="cover" className="listImg" />
                    </ListItemIcon>
                    <ListItemText
                      primary={elem.title}
                      secondary={elem.authors}
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

export default LibraryDetailList;
