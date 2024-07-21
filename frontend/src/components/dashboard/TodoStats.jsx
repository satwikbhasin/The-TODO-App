import {
  React,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { BarChart2, Sigma, CheckCheck, CircleSlash } from "lucide-react";
import { getTodoStats } from "../../methods/todos";

/**
 * Represents a component for displaying statistics of todo items.
 *
 * @component
 * @param {Object} props - The props object containing the component's properties.
 * @param {React.Ref} ref - The ref object used to expose the fetchStats function.
 * @returns {JSX.Element} The JSX element representing the TodoStats component.
 */
const TodoStats = forwardRef((props, ref) => {
  const theme = useTheme();
  const [stats, setStats] = useState({ total: 0, completed: 0, incomplete: 0 });

  const fetchStats = async () => {
    try {
      const stats = await getTodoStats();
      setStats(stats);
    } catch (error) {
      console.error("Failed to fetch todo stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchStats,
  }));

  return (
    <Box
      sx={{
        padding: "15px",
        backgroundColor: theme.palette.background.glassmorphism,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        color: theme.palette.secondary.text,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="heading"
        gutterBottom={true}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        sx={{ marginBottom: "20px" }}
      >
        <BarChart2 size={24} color={theme.palette.secondary.icons} />
        Stats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          gap: { xs: 1, lg: 5 },
        }}
      >
        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Sigma size={19} color={theme.palette.secondary.icons} />
          Total = {stats.total}
        </Typography>
        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <CheckCheck size={19} color={theme.palette.secondary.icons} />
          Completed = {stats.completed}
        </Typography>
        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <CircleSlash size={19} color={theme.palette.secondary.icons} />
          Incomplete = {stats.incomplete}
        </Typography>
      </Box>
    </Box>
  );
});

export default TodoStats;
