import {
  Switch,
  IconButton,
  Box,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { CheckCheckIcon, LogOut } from "lucide-react";
import { useTheme } from "@emotion/react";
import { useAuth } from "../../AuthContext";

const Navbar = ({ toggleTheme }) => {
  const { logout, isLoggedIn, currentUser } = useAuth();
  const theme = useTheme();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.primary.main }}
      position="static"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          gap={1}
        >
          <CheckCheckIcon color={theme.palette.secondary.icons} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary.text }}>
            TODO
          </Typography>
          <Switch
            onChange={toggleTheme}
            checked={theme.palette.mode === "dark"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          gap={5}
        >
          {isLoggedIn && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.secondary.text,
              }}
              gap={1}
            >
              <Typography variant="body1" sx={{ cursor: "default" }}>
                {currentUser.username}
              </Typography>
              <IconButton
                variant="contained"
                onClick={handleLogout}
                sx={{ textTransform: "none" }}
              >
                <LogOut />
              </IconButton>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
