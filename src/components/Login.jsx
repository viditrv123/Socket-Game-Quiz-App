import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e?.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        {
          userName: email,
          password,
        }
      );
      if (response.data) {
        const user = response.data.user;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login Error: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          border: "1px solid #ccc",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={login} style={{ width: "100%" }}>
          {/* Email Field */}
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => login()}
          >
            Login
          </Button>

          <Grid2 container>
            <Grid2 item xs>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Typography>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
