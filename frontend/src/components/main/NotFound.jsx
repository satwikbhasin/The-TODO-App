import { Box, Link } from "@mui/material";
import notFoundImage from "../../assets/images/404.svg";
import { useTheme } from "@emotion/react";
import { Undo2 } from "lucide-react";

/**
 * Renders the NotFound component, which displays a 404 error page.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
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
        fontFamily={theme.typography.heading}
      >
        <Undo2 size="20" />
        Guide Me Back
      </Link>
    </Box>
  );
};

export default NotFound;
