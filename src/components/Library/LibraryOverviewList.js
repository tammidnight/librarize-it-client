import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Library.css";

function LibraryOverviewList(props) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360 }} className="listBox">
      <List>
        {props.library.map((elem) => {
          return (
            <div key={elem._id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Link to={`/library/${elem._id}/edit`}>
                      <img
                        src="/images/pencil.png"
                        alt="settings"
                        className="pencil"
                      />
                    </Link>
                  </IconButton>
                }
              >
                <Link to={`/library/${elem._id}`} className="cardLink bookLink">
                  <ListItemButton>
                    <ListItemIcon className="listImgIcon">
                      <img
                        src="/images/library.png"
                        alt="library"
                        className="listImg"
                      />
                    </ListItemIcon>
                    <ListItemText primary={elem.title} />
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

export default LibraryOverviewList;
