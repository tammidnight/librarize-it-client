import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { FetchingUserContext } from "../../context/fetchingUser.context";
import { UserContext } from "../../context/user.context";
import LoadingScreen from "../Loading/LoadingScreen";
import "./User.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import FooterNavigation from "../FooterNavigation";

const Root = styled("div")(
  ({ theme }) => `
      font-size: 12px;
    `
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-size: 14px;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
      width: 300px;
      border: 1px solid #1bae9f;
      background-color: #dfe6ed;
      border-radius: 4px;
      padding: 1px;
      display: flex;
      flex-wrap: wrap;
    
      &:hover {
        border-color: #1bae9f;
      }
    
      &.focused {
        border-color: #1bae9f;
      }
    
      & input {
        background-color: #dfe6ed;
        color: black;
        height: 30px;
        box-sizing: border-box;
        padding: 4px 6px;
        width: 0;
        min-width: 30px;
        flex-grow: 1;
        border: 0;
        margin: 0;
        outline: 0;
      }
    `
);

const Listbox = styled("ul")(
  ({ theme }) => `
      width: 300px;
      margin: 2px 0 0;
      padding: 0;
      position: absolute;
      list-style: none;
      background-color: white;
      overflow: auto;
      max-height: 250px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1;
    
      & li {
        padding: 5px 12px;
        display: flex;
    
        & span {
          flex-grow: 1;
        }
    
        & svg {
          color: transparent;
        }
      }
    
      & li[aria-selected='true'] {
        background-color: white;
        font-weight: 600;
    
        & svg {
          color: #1890ff;
        }
      }
    
      & li[data-focus='true'] {
        background-color: white;
        cursor: pointer;
    
        & svg {
          color: currentColor;
        }
      }
    `
);

const bookGenres = [
  "Action and adventure",
  "Alternate history",
  "Anthology",
  "Art/architecture",
  "Autobiography",
  "Biography",
  "Business/economics",
  "Children's",
  "Classic",
  "Comic book",
  "Coming-of-age",
  "Crime",
  "Crafts/hobbies",
  "Cookbook",
  "Diary",
  "Dictionary",
  "Drama",
  "Encyclopedia",
  "Fairytale",
  "Fantasy",
  "Graphic novel",
  "Guide",
  "Historical fiction",
  "Horror",
  "Health/fitness",
  "History",
  "Home and garden",
  "Humor",
  "Journal",
  "Math",
  "Memoir",
  "Mystery",
  "Paranormal romance",
  "Picture book",
  "Poetry",
  "Political thriller",
  "Philosophy",
  "Prayer",
  "Religion, spirituality, and new age",
  "Romance",
  "Review",
  "Satire",
  "Science fiction",
  "Short story",
  "Suspense",
  "Science",
  "Self help",
  "Sports and leisure",
  "Textbook",
  "True crime",
  "Travel",
  "Thriller",
  "Western",
  "Young adult",
];

function Profile() {
  const { user, setUser } = useContext(UserContext);
  let username = null;
  let createdAt = null;
  let libraries = null;
  let favorites = null;
  let image = null;
  const { fetchingUser, setFetchingUser } = useContext(FetchingUserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        let userResponse = await axios.get(`${API_URL}/user`, {
          withCredentials: true,
        });
        setFetchingUser(false);
        setUser(userResponse.data);
      } catch (err) {
        setFetchingUser(false);
      }
    };

    getData();
  }, []);

  const formateDate = (date) => {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const result = day + "/" + month + "/" + date.getFullYear();
    return result;
  };

  const deleteFavorite = async (event, label) => {
    let userResponse = await axios.patch(
      `${API_URL}/favorites`,
      { label },
      {
        withCredentials: true,
      }
    );
    setUser(userResponse.data);
  };

  function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <CloseIcon
          onClick={(event) => {
            onDelete(event);
            deleteFavorite(event, label);
          }}
        />
      </div>
    );
  }

  Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  const StyledTag = styled(Tag)(
    ({ theme }) => `
        display: flex;
        align-items: center;
        height: 24px;
        margin: 2px;
        line-height: 22px;
        background-color: white;
        border: 1px solid #8dd7cf;
        border-radius: 4px;
        box-sizing: content-box;
        padding: 0 2px 0 5px;
        outline: 0;
        overflow: hidden;
      
        &:focus {
          border-color: #1bae9f;
          background-color: white;
        }
      
        & span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      
        & svg {
          font-size: 12px;
          cursor: pointer;
          padding: 4px;
        }
      `
  );

  if (user) {
    username = user.username;
    createdAt = user.createdAt;
    libraries = user.libraries;
    favorites = user.favorites;
    image = user.image;
  }

  const getDefaultValue = () => {
    if (favorites) {
      return favorites;
    } else {
      return [bookGenres[0]];
    }
  };

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: getDefaultValue(),
    multiple: true,
    options: bookGenres,
    getOptionLabel: (option) => option,
  });

  const getFavorite = async (event) => {
    let newFavorite = event.target.innerText;
    let userResponse = await axios.patch(
      `${API_URL}/favorites`,
      { newFavorite },
      {
        withCredentials: true,
      }
    );
    setUser(userResponse.data);
  };

  const userSince = formateDate(new Date(createdAt));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (fetchingUser) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="profile">
        {image ? (
          <Avatar
            alt="Avatar"
            src={image}
            sx={{ width: 125, height: 125 }}
            className="avatar"
          />
        ) : (
          <Avatar
            alt="Avatar"
            src="/images/user.png"
            sx={{ width: 125, height: 125 }}
            className="avatar"
          />
        )}
        <div className="details">
          <h3>Username: {username}</h3>
          <h4>User since: {userSince}</h4>
          {libraries.length === 1 ? (
            <h4>1 library</h4>
          ) : (
            <h4>{libraries.length} libraries</h4>
          )}

          <Root>
            <div {...getRootProps()} className="favoritesInput">
              <Label {...getInputLabelProps()}>Favorite Genre/s</Label>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option, index) => (
                  <StyledTag label={option} {...getTagProps({ index })} />
                ))}

                <input {...getInputProps()} />
              </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
              <div className="favoritesInput">
                <Listbox {...getListboxProps()}>
                  {groupedOptions.map((option, index) => (
                    <li {...getOptionProps({ option, index })}>
                      <span
                        onClick={(event) => {
                          getFavorite(event);
                        }}
                      >
                        {option}
                      </span>
                      <CheckIcon fontSize="small" />
                    </li>
                  ))}
                </Listbox>
              </div>
            ) : null}
          </Root>
        </div>
      </div>

      <Link to="/settings">
        <img src="/images/pencil.png" alt="settings" className="settings"></img>
      </Link>

      <Link to="/create-library">
        <img
          src="/images/add-library.png"
          alt="create-library"
          className="addlibrary"
        ></img>
      </Link>

      <FooterNavigation />
    </>
  );
}

export default Profile;
