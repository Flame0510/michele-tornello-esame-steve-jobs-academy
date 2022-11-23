import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Chat.scss";

import { useLocalStorage } from "../../hook/useLocalStorage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Message } from "../../models/message";
import { User } from "../../models/users";

const Chat = () => {
  const location = useLocation();

  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();

  const { id: userId } = getLocalStorageItem("user");

  const { users } = getLocalStorageItem("users");
  const { messages } = getLocalStorageItem("messages");

  console.log(users);

  const { id } = useParams();

  const user2Id = Number(id);

  const user2 = users && users.find(({ id }: Partial<User>) => id === user2Id);

  const [chatMessages, setChatMessages] = useState<Message[]>(messages);

  let chatInputRef = useRef();

  const getMessages = () =>
    messages &&
    setChatMessages(
      messages.filter(
        ({ sender, receiver }: Partial<Message>) =>
          (sender === userId && receiver === user2Id) ||
          (sender === user2Id && receiver == userId)
      )
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log(event.currentTarget.firstElementChild?.nodeValue);

    const message = data.get("message");

    if (message) {
      console.log(message);

      messages.push({
        sender: userId,
        receiver: user2Id,
        message: String(message),
      });

      setLocalStorageItem("messages", { messages });

      event.currentTarget.firstElementChild!.querySelector("input")!.value = "";

      const chatElement = document.querySelector(".chat") as HTMLElement;
      chatElement?.scrollTo({ top: chatElement.offsetHeight });

      getMessages();
    }
  };

  useEffect(() => {
    getMessages();
  }, [location]);

  useEffect(() => {
    const getMessageInterval = setInterval(() => {
      getMessages();
    }, 1000);

    clearInterval(getMessageInterval);
  }, []);

  return (
    <Box
      className="chat-container"
      style={{
        backgroundImage: `url(${require("../../assets/chat-background.jpg")})`,
      }}
    >
      {user2Id ? (
        user2 ? (
          <Box className="chat-content-container">
            <Box
              className="chat-top-bar-container"
              sx={{ bgcolor: "secondary.main" }}
            >
              <Link to={`/user/${user2.id}`} className="chat-top-bar">
                <Typography variant="h5" className="chat-top-bar-user">
                  {user2.username}
                </Typography>
              </Link>
            </Box>
            <Box className="chat">
              {chatMessages &&
                chatMessages.map(({ sender, message }) => (
                  <div
                    className={`chat-message-container ${
                      sender === userId ? "sender" : "receiver"
                    }`}
                  >
                    <div className="chat-message">{message}</div>
                  </div>
                ))}
            </Box>
            <Box
              className="chat-bottom-bar-container"
              sx={{
                bgcolor: "secondary.main",
              }}
            >
              <Box
                className="chat-bottom-bar"
                component="form"
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  className="chat-bottom-bar-input"
                  margin="normal"
                  fullWidth
                  id="message"
                  label="Inserisci il messaggio..."
                  name="message"
                  autoComplete="message"
                  autoFocus
                  color="secondary"
                  variant="filled"
                  ref={(el) => chatInputRef}
                />

                <button
                  type="submit"
                  className="chat-bottom-bar-send-btn .css-dbjfzs"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box className="chat-error-message-container">
            <Typography variant="h5" className="chat-error-message">
              Non ci sono utenti
            </Typography>
          </Box>
        )
      ) : (
        <Box className="chat-error-message-container">
          <Typography variant="h5" className="chat-error-message">
            Clicca su un utente ed inizia a chattare!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
