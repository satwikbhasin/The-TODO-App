import React, { useState } from "react";
import { Box, TextField, Button, Typography, FormControl } from "@mui/material";
import { useAuth } from "../../AuthContext";
import { useTheme } from "@emotion/react";

const Signup = () => {
  const { signup } = useAuth();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(username, password);
      window.location.reload();
    } catch {
      setError("Username already exists");
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setError("");
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        flexDirection: "column",
        width: { xs: "70%", md: "40%" },
        height: "40%",
        padding: "20px",
        borderRadius: "30px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
      }}
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Username"
          variant="standard"
          name="username"
          value={username}
          onChange={handleChange}
          required
          sx={{
            height: "20%",
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.text,
            },
            "&:hover .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.secondary.text,
              "&.Mui-focused": {
                color: theme.palette.secondary.text,
              },
            },
          }}
        />
        <TextField
          label="Password"
          variant="standard"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{
            height: "20%",
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.text,
            },
            "&:hover .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.secondary.text,
              "&.Mui-focused": {
                color: theme.palette.secondary.text,
              },
            },
          }}
        />
        <TextField
          label="Confirm Password"
          variant="standard"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{
            height: "20%",
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.text,
            },
            "&:hover .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.secondary.text,
              "&.Mui-focused": {
                color: theme.palette.secondary.text,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          Sign Up
        </Button>
        <Box sx={{ display: "flex", justifyContent: "center", height: "10px" }}>
          {error && (
            <Typography
              fontSize={10}
              color={theme.palette.secondary.icons}
              sx={{ mt: 1 }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export default Signup;