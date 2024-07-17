import React, { useState } from "react";
import { Box, Typography, TextField, Button, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ListPlus, Plus } from "lucide-react";
import { addTodo } from "../../methods/todos";

const NewTodo = ({ callbacks }) => {
  const { refreshAllTodos, refreshStats } = callbacks;
  const theme = useTheme();
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTodo(todo);
      refreshAllTodos();
      refreshStats();
      setTodo({
        title: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.glassmorphism,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        color: theme.palette.secondary.text,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "15px",
      }}
    >
      <Typography
        variant="heading"
        gutterBottom={true}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <ListPlus size={24} color={theme.palette.secondary.icons} />
        Add New
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={todo.title}
          variant="standard"
          onChange={handleChange}
          sx={{
            height: "20%",
            ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              color: theme.palette.secondary.text,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.text,
            },
            "&:hover .MuiInput-underline:before": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.secondary.misc,
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.secondary.text,
              "&.Mui-focused": {
                color: theme.palette.secondary.text,
              },
            },
            marginBottom: "10%",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "50%",
            fontFamily: theme.typography.body1,
          }}
          disabled={!todo.title}
          startIcon={<Plus size={20} color={theme.palette.secondary.icons} />}
        >
          Add Todo
        </Button>
      </FormControl>
    </Box>
  );
};

export default NewTodo;
