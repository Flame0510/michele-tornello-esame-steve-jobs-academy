import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hook/useLocalStorage";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const { getLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const hour = new Date().getHours();
  const welcome =
    hour < 14 ? "Buongiorno" : hour < 20 ? "Buon Pomeriggio" : "Buonsera";

  return (
    <Container component="main" className="home-page">
      {user ? (
        <Box mt={5}>
          <Typography variant="h4">{user && welcome}</Typography>
          <Typography variant="h5" color="secondary">
            {user.username}
          </Typography>
        </Box>
      ) : (
        <Box mt={5}>
          <Typography variant="h4">{welcome}</Typography>
        </Box>
      )}

      <Button
        onClick={() => navigate(user ? "/chats" : "/signin")}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Inizia a chattare!
      </Button>
    </Container>
  );
};

export default Home;
