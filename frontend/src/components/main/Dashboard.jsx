import React, { useState, useRef } from "react";
import { Container, Box } from "@mui/material";
import AllTodos from "../dashboard/AllTodos";
import AddTodo from "../dashboard/NewTodo";
import TodoStats from "../dashboard/TodoStats";
import UpdateTodo from "../dashboard/UpdateTodo";

/**
 * Dashboard component represents the main dashboard of the application.
 * It displays a list of todos, todo statistics, and provides functionality to add, update, and delete todos.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the dashboard.
 */
const Dashboard = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const allTodosRef = useRef(null);
  const statsRef = useRef(null);

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  const refreshAllTodos = () => {
    if (allTodosRef.current) {
      allTodosRef.current.fetchTodos();
    }
  };

  const refreshStats = () => {
    if (statsRef.current) {
      statsRef.current.fetchStats();
    }
  };

  const handleUpdateOrDeleteTodo = (todo) => {
    setSelectedTodo(null);
  };

  const callbacks = {
    refreshAllTodos,
    refreshStats,
    handleUpdateOrDeleteTodo,
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "center", md: "stretch" },
        flexDirection: { xs: "column", md: "row" },
        marginTop: { xs: "20px", md: "40px" },
        marginBottom: { xs: "20px", md: "40px" },
        gap: { xs: 5, md: 10 },
        width: "100%",
        height: { xs: "auto", md: "max-content" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: { xs: "80%", md: "40%" },
          height: "100%",
        }}
      >
        <AllTodos onSelect={handleSelect} ref={allTodosRef} />
      </Box>
      <Box
        sx={{
          width: { xs: "80%", md: "40%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 4 },
            flexDirection: { xs: "column-reverse", md: "column" },
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <AddTodo callbacks={callbacks} />
          <TodoStats ref={statsRef} />
          <UpdateTodo
            selectedTodo={selectedTodo}
            callbacks={callbacks}
            handleUpdateOrDeleteTodo={handleUpdateOrDeleteTodo}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
