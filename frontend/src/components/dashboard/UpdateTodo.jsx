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

const UpdateTodo = ({ selectedTodo }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTodo(selectedTodo.id, updatedTodo);
    setUpdatedTodo({
      title: "",
      completed: false,
    });
    window.location.reload();
  };

  const handleDelete = () => {
    deleteTodo(selectedTodo.id);
    window.location.reload();
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
          boxShadow:
            "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
          borderRadius: "10px",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.text,
          overflow: "hidden",
          padding: "10px",
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
            <PencilLine size={24} color={theme.palette.icons.main} /> Update
            Todo
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
        height: "40%",
        left: "0",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        padding: "10px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
        {selectedTodo.title}
        <PencilLine size={24} color={theme.palette.icons.main} />
      </Typography>
      <FormControl component="form" onSubmit={handleSubmit} fullWidth>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="New Title"
            name="title"
            value={updateTodo.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ flex: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="completed"
                checked={updatedTodo.completed}
                onChange={handleChange}
                sx={{
                  flex: 1,
                  color: theme.palette.icons.main,
                  "&.Mui-checked": {
                    color: theme.palette.icons.main,
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
            flexDirection: "row",
            flexGrow: 1,
            gap: "10px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={selectedTodo === updateTodo}
            sx={{
              flex: 1,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.text,
              borderRadius: "10px",
            }}
            startIcon={
              <FilePenLine size={20} color={theme.palette.icons.main} />
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
              borderRadius: "10px",
            }}
            startIcon={<Trash size={20} color={theme.palette.icons.main} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default UpdateTodo;
