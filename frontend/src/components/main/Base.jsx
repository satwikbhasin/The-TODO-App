import React, { useState } from "react";
import Container from "@mui/material/Container";
import AllTodos from "../dashboard/AllTodos";
import AddTodo from "../dashboard/NewTodo";
import TodoStats from "../dashboard/TodoStats";
import UpdateTodo from "../dashboard/UpdateTodo";

const Base = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "80vh",
          marginTop: "40px",
          maxWidth: "80%",
          maxHeight: "90%",
          minHeight: "90%",
        }}
      >
        <AllTodos onSelect={handleSelect} />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexGrow: 1,
          }}
        >
          <AddTodo />
          <TodoStats/>
          <UpdateTodo selectedTodo={selectedTodo} />
        </Container>
      </Container>
    </div>
  );
};

export default Base;
