import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PencilLine, Trash, FilePenLine } from "lucide-react";
import { updateTodo, deleteTodo } from "../../methods/todos";

const UpdateTodo = ({ selectedTodo, callbacks }) => {
  const { refreshAllTodos, refreshStats, handleUpdateOrDeleteTodo } = callbacks;
  const theme = useTheme();
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    completed: false,
  });

  useEffect(() => {
    if (selectedTodo) {
      setUpdatedTodo({
        title: selectedTodo.title,
        completed: selectedTodo.completed,
      });
    }
  }, [selectedTodo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTodo(selectedTodo.id, updatedTodo);
      refreshAllTodos();
      refreshStats();
      handleUpdateOrDeleteTodo();
      setUpdatedTodo({
        title: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(selectedTodo.id);
      refreshAllTodos();
      refreshStats();
      handleUpdateOrDeleteTodo();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!selectedTodo) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.glassmorphism,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          borderRadius: "10px",
          color: theme.palette.secondary.text,
          padding: "15px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            gutterBottom={true}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <PencilLine size={24} color={theme.palette.secondary.icons} />{" "}
            Update Todo
          </Typography>
          <Typography
            variant="body1"
            gutterBottom={true}
            display={"flex"}
            justifyContent={"center"}
          >
            Please select a todo from all todos
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.glassmorphism,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        color: theme.palette.secondary.text,
        padding: "15px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
        {selectedTodo.title}
        <PencilLine size={24} color={theme.palette.secondary.icons} />
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit} fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
            }}
          >
            <TextField
              label="New Title"
              name="title"
              fullWidth
              value={updatedTodo.title}
              onChange={handleChange}
              variant="standard"
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
            <FormControlLabel
              control={
                <Checkbox
                  name="completed"
                  checked={updatedTodo.completed}
                  onChange={handleChange}
                  sx={{
                    flex: { xs: "none", md: 1 },
                    color: theme.palette.secondary.icons,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.icons,
                    },
                  }}
                />
              }
              label="Completed"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              flexGrow: 1,
              gap: "10px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                updatedTodo.title === "" ||
                (updatedTodo.title === selectedTodo.title &&
                  updatedTodo.completed === selectedTodo.completed)
              }
              sx={{
                flex: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.heading,
                width: "50%",
                fontFamily: theme.typography.body1,
              }}
              startIcon={
                <FilePenLine size={20} color={theme.palette.secondary.icons} />
              }
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              sx={{
                flex: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.heading,
                width: "50%",
                fontFamily: theme.typography.body1,
              }}
              startIcon={
                <Trash size={20} color={theme.palette.secondary.icons} />
              }
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </FormControl>
    </Box>
  );
};

export default UpdateTodo;
