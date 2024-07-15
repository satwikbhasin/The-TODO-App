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
import { getTodoStats } from "../../methods/todoOperations";

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
        // boxShadow:
        //   "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
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
          variant="body1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Sigma size={19} color={theme.palette.secondary.icons} />
          Total = {stats.total}
        </Typography>
        <Typography
          variant="body1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <CheckCheck size={19} color={theme.palette.secondary.icons} />
          Completed = {stats.completed}
        </Typography>
        <Typography
          variant="body1"
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
