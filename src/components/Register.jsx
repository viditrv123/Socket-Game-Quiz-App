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

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e?.preventDefault();

    if (!email || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      if (email && password) {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/user/createUser`,
          {
            userName: email,
            password,
          }
        );
        if (response.data) {
          const user = response.data.user;
          console.log(response);

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          setError(
            response.data.message || "Registeration failed. Please try again."
          );
        }
      } else {
        setError("Please enter both userName and Password");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Register Error: ", error);
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
            Register
          </Typography>
          <form onSubmit={login} style={{ width: "100%", color: "black" }}>
            {/* Email Field */}
            <TextField
              label="UserName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black !important",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  color: "black !important",
                  "&:hover fieldset": {
                    borderColor: "#FF4081",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF4081",
                  },
                },
                "& .MuiFormLabel-root": {
                  color: "#FF4081", // Label color
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
                "& .MuiOutlinedInput-root": {
                  borderColor: "#444",
                  backgroundColor: "white",
                  color: "black",

                  "&:hover fieldset": {
                    borderColor: "#FF4081",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF4081",
                  },
                },
                "& .MuiFormLabel-root": {
                  color: "#FF4081",
                },
                "& .Mui-focused .MuiFormLabel-root": {
                  color: "#FF4081",
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
              Register
            </Button>

            <Grid2 container>
              <Grid2 item xs>
                <Typography variant="body2" color="white">
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{ color: "#FF4081" }}
                  >
                    Login
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

export default Register;
