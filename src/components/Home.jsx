import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import NavBar from "./NavBar";
import io from "socket.io-client";

const Home = () => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [intervalId, setIntervalId] = useState(null);

  console.log(import.meta.env.VITE_BACKEND_API);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log(import.meta.env.VITE_BACKEND_API);
      console.log(import.meta.env);

      const socketConnection = io(import.meta.env.VITE_BACKEND_API, {
        transports: ["websocket"],
        auth: {
          token,
        },
      });
      setSocket(socketConnection);

      socketConnection.on("connect", () => {
        console.log("Connected to Socket.IO server", socketConnection.id);
      });

      socketConnection.on("QUESTIONS", (data) => {
        console.log("Game started event received:", data);
        setQuestion(data.question);
        setQuestionIndex((prevIndex) => prevIndex + 1);
        resetTimer();
      });

      socketConnection.on("GAME_STARTED", (data) => {
        console.log("Game started event received:", data);
        setQuestionIndex((prevIndex) => prevIndex + 1);
        resetTimer();
      });

      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (questionIndex > 0) {
      if (intervalId) clearInterval(intervalId);

      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [questionIndex]);

  const resetTimer = () => {
    setTimer(10);
  };

  const handlePlayGame = () => {
    if (socket && user) {
      clearInterval(intervalId);
      socket.emit("FIND_GAME", { userId: user.id });
    }
  };

  const handleQuitGame = () => {
    if (socket && user) {
      socket.emit("QUIT_GAME", { userId: user.id });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#121212",
          color: "#fff",
          flex: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {!user ? (
          <>
            {" "}
            <Typography
              sx={{
                fontSize: 32,
                color: "#FFCFEF",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              Hello! Welcome to Fun Game
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                color: "#FFCFEF",
                textAlign: "center",
                marginBottom: 4,
                fontWeight: "bold",
              }}
            >
              Instructions:
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                color: "#FFCFEF",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              1. Login / Register to the account on 2 separate devices.
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                color: "#FFCFEF",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              2. Click "Find game" on both devices to start playing.
            </Typography>
          </>
        ) : questionIndex === 0 ? (
          <>
            <Button
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px 20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#444",
                },
                "&:active": {
                  backgroundColor: "#555",
                },
              }}
              onClick={handlePlayGame}
            >
              Play Game
            </Button>
          </>
        ) : questionIndex > 0 ? (
          <>
            <Typography sx={{ fontSize: 24, marginBottom: 2 }}>
              {question?.question}
            </Typography>
            <ButtonGroup variant="contained" orientation="horizontal">
              {question?.options?.map((option, index) => (
                <Button
                  key={index}
                  sx={{
                    marginBottom: 1,
                    backgroundColor: "#FF4081",
                    color: "#fff",
                  }}
                >
                  {option}
                </Button>
              ))}
            </ButtonGroup>
            <Typography sx={{ fontSize: 18, marginTop: 2 }}>
              Time Left: {timer} seconds
            </Typography>
            <Button
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px 20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#444",
                },
                "&:active": {
                  backgroundColor: "#555",
                },
              }}
              onClick={handleQuitGame}
            >
              Quit Game
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Home;
