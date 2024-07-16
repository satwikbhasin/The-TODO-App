import { Box, Link } from "@mui/material";
import notFoundImage from "../../assets/images/404.svg";
import { useTheme } from "@emotion/react";
import { Undo2 } from "lucide-react";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <img
        src={notFoundImage}
        alt="404 Not Found"
        style={{ width: "100%", maxWidth: "600px", height: "auto" }}
      />
      <Link
        href="/dashboard"
        underline="none"
        variant="h6"
        color={theme.palette.secondary.text}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Undo2 size="20" />
        Guide Me Back
      </Link>
    </Box>
  );
};

export default NotFound;
