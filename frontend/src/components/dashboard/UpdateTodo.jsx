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
import { updateTodo, deleteTodo } from "../../methods/todoOperations";

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
          // boxShadow:
          //   "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
          borderRadius: "10px",
          backgroundColor: theme.palette.secondary.main,
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
            Please select a todo from the left menu
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        padding: "15px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
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
              value={updatedTodo.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                flex: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.secondary.misc,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.secondary.misc,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.secondary.misc,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.secondary.text,
                  "&.Mui-focused": {
                    color: theme.palette.secondary.text,
                  },
                },
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
                color: theme.palette.secondary.text,
                width: "50%",
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
                color: theme.palette.secondary.text,
                width: "50%",
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
