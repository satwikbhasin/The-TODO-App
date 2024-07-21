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

/**
 * Renders the main application router.
 *
 * @returns {JSX.Element} The rendered AppRouter component.
 */
const AppRouter = () => {
  const { isLoggedIn, loading } = useAuth();
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircleDashed
          size={48}
          style={{ animation: "spin 5s linear infinite" }}
          color={theme.palette.secondary.text}
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
