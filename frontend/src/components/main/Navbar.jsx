import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { CheckCheckIcon } from "lucide-react";
import { Switch } from "@mui/material";
import { useTheme } from "@emotion/react";

const Navbar = ({ toggleTheme }) => {
  const theme = useTheme();
  return (
    <AppBar
      sx={{ backgroundColor: theme.palette.primary.main }}
      position="static"
    >
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <CheckCheckIcon color={theme.palette.secondary.icons} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.secondary.text }}
          flexGrow={1}
        >
          TODO
        </Typography>
        <Switch onChange={toggleTheme} defaultChecked />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
