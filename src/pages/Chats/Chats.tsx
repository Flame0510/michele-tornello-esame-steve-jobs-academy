import { Box, Container, Typography } from "@mui/material";
import Chat from "../../components/Chat/Chat";
import ChatHistory from "../../components/ChatHistory/ChatHistory";
import { useLocalStorage } from "../../hook/useLocalStorage";
import "./Chats.scss";

const Chats = () => {
  const { getLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const hour = new Date().getHours();
  const welcome =
    hour < 14 ? "Buongiorno" : hour < 20 ? "Buon Pomeriggio" : "Buonsera";

  return (
    <div
      className="chats-page"
      style={{
        backgroundImage: `url(${require("../../assets/chat-background.jpg")})`,
      }}
    >
      <Box
        className="chats-page-content"
        sx={{
          bgcolor: "secondary.main",
        }}
      >
        <ChatHistory />
        <Chat />
      </Box>
    </div>
  );
};

export default Chats;
