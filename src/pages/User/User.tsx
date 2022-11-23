import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
import "./User.scss";

import { User as UserInterface } from "../../models/users";

const User = () => {
  const navigate = useNavigate();
  const { getLocalStorageItem, removeLocalStorageItem } = useLocalStorage();

  const { users } = getLocalStorageItem("users");

  const { id: userLoggedId } = getLocalStorageItem("user");

  const { id } = useParams();

  const userId = Number(id);

  const user = userId
    ? users && users.find(({ id }: Partial<UserInterface>) => id === userId)
    : getLocalStorageItem("user");

  console.log(user);

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
        <Box my={5} className="user-content">
          <Typography variant="h4">
            {user.id === userLoggedId ? "Ciao " : "Utente: "}
            <Typography display="inline" variant="h4">
              {username}
            </Typography>
          </Typography>

          {user.id === userLoggedId ? (
            <button
              onClick={logout}
              className="user-action-btn user-logout-btn"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate(`/chats/${user.id}`)}
              className="user-action-btn user-chat-now-btn"
            >
              Chatta Ora
            </button>
          )}
        </Box>
      </Container>
    )
  );
};

export default User;
