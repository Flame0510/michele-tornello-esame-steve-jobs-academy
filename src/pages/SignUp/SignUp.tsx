import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { users } from "../../users";
import { User } from "../../models/users";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../../hook/useLocalStorage";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { setLocalStorageItem } = useLocalStorage();

  const [snackbarVisibility, setSnackbarVisibility] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarTimeout, setSnackbarTimeout] = useState<number>(2000);
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

  const showSnackbar = (
    message: string,
    severity: AlertColor,
    timeout?: number
  ) => {
    setSnackbarVisibility(true);
    setSnackbarMessage(message);
    setSnackbarTimeout(timeout || 2000);
    setSnackbarSeverity(severity);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");

    if (username && password) {
      const user =
        users.length && users.find((user: User) => user.username === username);

      if (!user) {
        users.push({ username, password } as User);

        showSnackbar("Credenziali corrette!", "success", 2000);
        navigate("/signin");
      } else {
        showSnackbar(
          "Username già utilizzato, inseriscine un altro",
          "error",
          2000
        );
      }
    } else {
      showSnackbar("Completa tutti i campi!", "info", 2000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrati
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="secondary"
              autoComplete="current-password"
            />

            <Snackbar
              open={snackbarVisibility}
              autoHideDuration={snackbarTimeout}
              onClose={() => setSnackbarVisibility(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => navigate("/signin")}
                  variant="body2"
                  color="secondary"
                >
                  {"Hai già un account? Accedi"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
