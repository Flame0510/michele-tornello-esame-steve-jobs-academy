import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

import "./ChatHistory.scss";

import { useLocalStorage } from "../../hook/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/users";
import { Chat } from "../../models/chat";
import SimpleDialog from "../SimpleDialog/SimpleDialog";
import { useEffect, useState } from "react";

const ChatHistory = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { id: userId } = getLocalStorageItem("user");

  const { users } = getLocalStorageItem("users");
  const { chats } = getLocalStorageItem("chats");

  const [userChats, setUserChats] = useState<Chat[]>([]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getChats = () => {
    setUserChats(() =>
      chats.filter(({ user1 }: Partial<Chat>) => user1 === userId)
    );
  };

  const createChat = (id: number) => {
    const chat = chats.find(({ user2 }: Partial<Chat>) => user2 === id);

    if (!chat) {
      chats.push({ user1: userId, user2: id });
      chats.push({ user1: id, user2: userId });
      setLocalStorageItem("chats", { chats });

      getChats();
    }

    navigate(`/chats/${id}`);
    setDialogOpen(false);
  };

  const DialogContent = () => {
    return (
      <List sx={{ pt: 0 }}>
        {users.map(
          ({ id, username }: Partial<User>) =>
            id !== userId && (
              <ListItem autoFocus button onClick={() => id && createChat(id)}>
                <ListItemText primary={username} />
              </ListItem>
            )
        )}
      </List>
    );
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    console.log("userchats", userChats);
  }, [userChats]);

  return (
    <Box
      className="chats-history-container"
      sx={{
        bgcolor: "secondary.main",
      }}
    >
      <Box className="chat-history-top-container">
        <Typography variant="h5" className="chats-history-title">
          Chats
        </Typography>
        {userChats && userChats.length ? (
          userChats.map(({ user1, user2 }: Partial<Chat>) => {
            const user = users.find(
              ({ id }: Partial<User>) => user1 === userId && user2 === id
            );

            return (
              user && (
                <div className="chat-history-user">
                  <Link
                    to={`/chats/${user2}`}
                    className="chat-history-user-link"
                  >
                    {user.username}
                  </Link>
                </div>
              )
            );
          })
        ) : (
          <Typography variant="subtitle1" sx={{ mt: 2, textAlign: "center" }}>
            Non ci sono chat
          </Typography>
        )}
      </Box>

      <button
        className="chat-history-new-chat-btn"
        onClick={() => setDialogOpen(true)}
      >
        Crea Chat
      </button>

      <SimpleDialog
        title="Selezione un utente"
        DialogContent={DialogContent}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </Box>
  );
};

export default ChatHistory;
