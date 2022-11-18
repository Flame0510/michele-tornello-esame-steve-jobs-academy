import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Slide, TextField } from "@mui/material";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const { getLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const [sideSearchVisibility, setSideSearchVisibility] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchValueRef = useRef();

  const location = useLocation();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  useEffect(() => {
    setSearchValue("");
  }, [location]);

  useEffect(() => {
    //(!sideSearchVisibility && searchValue) && setSideSearchVisibility(true);
    setSideSearchVisibility(Boolean(searchValue));
  }, [searchValue]);

  const handleSearch = (value: string) => {
    //sideSearchVisibility && !value && setSideSearchVisibility(false);

    setSearchValue(value);
  };

  const SideSearch = () =>
    useMemo(
      () => (
        <Box
          className="side-search"
          sx={{ color: "#fff", bgcolor: "secondary.main" }}
          style={{
            justifyContent: "center",

            width: isMobile ? "100%" : "30%",
            height: "100%",

            textAlign: "center",

            padding: "16px",

            position: "absolute",
            right: searchValue ? 0 : "100%",

            transition: "0.3s",
          }}
        >
          <Typography variant="h5">
            Risultati per: {searchValue && searchValue}
          </Typography>
        </Box>
      ),
      [searchValue]
    );

  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={() => navigate("/")} color="inherit">
              <FontAwesomeIcon icon={faHome} />
            </Button>
          </Typography>

          {user && (
            <Button onClick={() => navigate("/favourites")} color="inherit">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          )}

          {useMemo(
            () =>
              user ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Cerca..."
                    inputProps={{ "aria-label": "search" }}
                    onChange={({ target: { value } }) => handleSearch(value)}
                  />
                </Search>
              ) : null,
            [location]
          )}

          <Button onClick={() => navigate("/user")} color="inherit">
            {user ? <FontAwesomeIcon icon={faUser} /> : "Accedi"}
          </Button>
        </Toolbar>
      </AppBar>
      <SideSearch />
    </Box>
  );
};

export default Navbar;
