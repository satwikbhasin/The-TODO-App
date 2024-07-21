import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../AuthContext";
import { useTheme } from "@emotion/react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Renders a login component with username and password fields.
 *
 * @component
 * @returns {JSX.Element} The rendered login component.
 */
const Login = () => {
  const { login } = useAuth();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials. Please try again.");
    }
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
      default:
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: { xs: "70%", md: "40%" },
        height: "40%",
        padding: "20px",
        background: theme.palette.background.glassmorphism,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
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
            ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              color: theme.palette.secondary.text,
            },
            ".css-mnn31": {
              color: theme.palette.secondary.text,
            },
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
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                  sx={{ color: theme.palette.secondary.text }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
          sx={{
            height: "20%",
            ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              color: theme.palette.secondary.text,
            },
            ".css-mnn31": {
              color: theme.palette.secondary.text,
            },
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
          sx={{ mt: 3, fontFamily: theme.typography.body1 }}
        >
          Login
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

export default Login;
