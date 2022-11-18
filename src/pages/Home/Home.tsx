import { Box, Container, Typography } from "@mui/material";
import { useLocalStorage } from "../../hook/useLocalStorage";
import "./Home.scss";

const Home = () => {
  const { getLocalStorageItem } = useLocalStorage();

  const user = getLocalStorageItem("user");

  const hour = new Date().getHours();
  const welcome =
    hour < 14 ? "Buongiorno" : hour < 20 ? "Buon Pomeriggio" : "Buonsera";

  return (
    <Container component="main" className="home-page">
      {user ? (
        <Box my={5}>
          <Typography variant="h4">{user && welcome}</Typography>
          <Typography variant="h5" color="error">
            {user.username}
          </Typography>
        </Box>
      ) : (
        <Box my={5}>
          <Typography variant="h4">Home</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home;
