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
import { faComment, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const { getLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const location = useLocation();

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
            <Button onClick={() => navigate("/chats")} color="inherit">
              <FontAwesomeIcon icon={faComment} />
            </Button>
          )}

          <Button onClick={() => navigate("/user")} color="inherit">
            {user ? <FontAwesomeIcon icon={faUser} /> : "Accedi"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
