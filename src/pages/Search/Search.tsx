import { Box, Container, Typography } from "@mui/material";
import "./Search.scss";

const Search = () => {
  return (
    <Container component="main" className="searchPage">
      <Box my={5}>
        <Typography variant="h4">Search</Typography>
      </Box>
    </Container>
  );
};

export default Search;
