import React, { useState } from "react";
import { Box, Typography, TextField, Button, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ListPlus, Plus } from "lucide-react";
import { addTodo } from "../../methods/todoOperations";

const NewTodo = () => {
  const theme = useTheme();
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo({
      title: title,
      completed: false,
    });
    window.location.reload();
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: useTheme().palette.secondary.text,
        padding: "15px",
        overflowY: "hidden",
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
        <ListPlus size={24} color={theme.palette.icons.main} />
        Add New
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{
            marginTop: "20px",
            marginBottom: "15px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.text,
            borderRadius: "10px",
            width: "20%",
          }}
          startIcon={<Plus size={20} color={theme.palette.icons.main} />}
        >
          Add Todo
        </Button>
      </FormControl>
    </Box>
  );
};

export default NewTodo;
