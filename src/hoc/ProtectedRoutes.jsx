import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <Routes>
      <Route
        {...rest}
        element={isAuthenticated ? element : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
