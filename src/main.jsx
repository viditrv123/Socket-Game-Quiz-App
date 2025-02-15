import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Login from "./components/Login"; // Assuming this is a custom component for routing protection
import ProtectedRoute from "./hoc/ProtectedRoutes";
import GameContext from "./context/GameContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login", // URL convention is typically lowercase for routes
    element: <Login />,
  },
]);

const App = () => {
  const [gameData, setGameData] = React.useState({});

  return (
    <React.StrictMode>
      <GameContext.Provider value={{ gameData, setGameData }}>
        <RouterProvider router={router} />
      </GameContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
