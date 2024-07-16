import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Authentication from "./Authentication";
import Dashboard from "./Dashboard";
import { CircleDashed } from "lucide-react";
import "../../styling/AppRouter.css";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import NotFound from "./NotFound";

const AppRouter = () => {
  const { isLoggedIn, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircleDashed
          size={48}
          style={{ animation: "spin 5s linear infinite" }}
          color={theme.palette.secondary.misc}
        />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/authentication" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/authentication" />}
      />
      <Route
        path="/authentication"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Authentication />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
