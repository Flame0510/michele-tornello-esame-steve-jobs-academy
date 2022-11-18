import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
import "./User.scss";

const User = () => {
  const navigate = useNavigate();
  const { getLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const { username } = user;

  useEffect(() => {
    !user && navigate("/signin");
    console.log(user);
  });

  const logout = () => {
    removeLocalStorageItem("user");
    navigate("/");
  };

  return (
    user && (
      <Container component="main" className="user-page" maxWidth="xs">
        <Box my={5} textAlign={"center"}>
          <Typography variant="h4">
            Ciao{" "}
            <Typography display="inline" variant="h4" color="error">
              {username}
            </Typography>
          </Typography>

          <Button
            onClick={logout}
            variant="contained"
            color="error"
            style={{ marginTop: 16 }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    )
  );
};

export default User;
