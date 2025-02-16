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
    <Box
      sx={{
        height: "100vh",
        width: "100wh",
        backgroundColor: "#121212",
        margin: 0,
        paddingTop: 8,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #333", // Dark border for the form container
            padding: "2rem",
            borderRadius: "8px",
            justifyContent: "center",
            paddingTop: 8,
            backgroundColor: "#1e1e1e", // Dark background color for the box
          }}
        >
          <Typography component="h1" variant="h5" color="white">
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
              sx={{
                backgroundColor: "#333", // Dark background for input
                color: "#fff", // White text
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#444", // Dark border color by default
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF4081", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF4081", // Border color when focused
                  },
                },
                "& .MuiFormLabel-root": {
                  color: "#FF4081", // Label color in dark mode
                },
                "& .Mui-focused .MuiFormLabel-root": {
                  color: "#FF4081", // Label color when focused
                },
              }}
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
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#444",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(29, 218, 248)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(29, 218, 248)",
                  },
                },
                "& .MuiFormLabel-root": {
                  color: "rgb(29, 218, 248)",
                },
                "& .Mui-focused .MuiFormLabel-root": {
                  color: "rgb(29, 218, 248)",
                },
              }}
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: " #FF4081",
                "&:hover": {
                  backgroundColor: " #FF80AB",
                },
              }}
              onClick={() => login()}
            >
              Login
            </Button>

            <Grid2 container>
              <Grid2 item xs>
                <Typography variant="body2" color="white">
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/register")}
                    sx={{ color: "#FF4081" }}
                  >
                    Register
                  </Button>
                </Typography>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
