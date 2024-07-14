import { React, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { BarChart2, Sigma, CheckCheck, CircleSlash } from "lucide-react";
import { getTodoStats } from "../../methods/todoOperations";

const TodoStats = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({ total: 0, completed: 0, incomplete: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getTodoStats();
        setStats(stats);
      } catch (error) {
        console.error("Failed to fetch todo stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box
      sx={{
        padding: "15px",
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
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
        <BarChart2 size={24} color={theme.palette.icons.main} />
        Stats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Typography
          variant="body1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Sigma size={19} color={theme.palette.icons.main} />
          Total = {stats.total}
        </Typography>
        <Typography
          variant="body1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <CheckCheck size={19} color={theme.palette.icons.main} />
          Completed = {stats.completed}
        </Typography>
        <Typography
          variant="body1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <CircleSlash size={19} color={theme.palette.icons.main} />
          Incomplete = {stats.incomplete}
        </Typography>
      </Box>
    </Box>
  );
};

export default TodoStats;
