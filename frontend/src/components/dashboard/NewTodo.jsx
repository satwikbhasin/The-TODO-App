import React, { useState } from "react";
import { Box, Typography, TextField, Button, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ListPlus, Plus } from "lucide-react";
import { addTodo } from "../../methods/todoOperations";

const NewTodo = () => {
  const theme = useTheme();
  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(todo);
    window.location.reload();
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
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "15px",
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
          value={todo.title}
          onChange={handleChange}
          fullWidth
          sx={{
            marginTop: "20px",
            marginBottom: "15px",
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
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "50%",
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
