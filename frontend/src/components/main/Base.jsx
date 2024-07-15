import React, { useState, useRef } from "react";
import { Container, Box } from "@mui/material";
import AllTodos from "../dashboard/AllTodos";
import AddTodo from "../dashboard/NewTodo";
import TodoStats from "../dashboard/TodoStats";
import UpdateTodo from "../dashboard/UpdateTodo";

const Base = () => {
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

  const handleUpdateTodo = (todo) => {
    setSelectedTodo(null);
  };

  const callbacks = {
    refreshAllTodos,
    refreshStats,
    handleUpdateTodo
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
        height: { xs: "auto", md: "80vh" },
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 4 },
          width: { xs: "80%", md: "40%" },
          height: "100%",
        }}
      >
        <AddTodo callbacks={callbacks} />
        <TodoStats ref={statsRef} />
        <UpdateTodo
          selectedTodo={selectedTodo}
          callbacks={callbacks}
          handleUpdateTodo={handleUpdateTodo}
        />
      </Box>
    </Container>
  );
};

export default Base;
