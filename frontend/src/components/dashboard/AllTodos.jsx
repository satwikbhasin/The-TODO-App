import { React, useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { List as ListIcon, CheckCheck, RefreshCcw } from "lucide-react";
import { getAllTodos } from "../../methods/todoOperations";

const AllTodos = ({ onSelect }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  const fetchTodos = async () => {
    setIsRotating(true);
    try {
      const todos = await getAllTodos();
      setTodos(todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setTimeout(() => {
        setIsRotating(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "40%",
        height: "80vh",
        boxShadow:
          "0 -1px 8px rgba(242, 97, 63, 0.5), 1px 0 8px rgba(242, 97, 63, 0.5)",
        borderRadius: "10px",
        left: "0",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        padding: "15px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={2}
      >
        <Box flexGrow={1} display="flex" justifyContent="center">
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <ListIcon size={24} color={theme.palette.icons.main} /> All
          </Typography>
        </Box>
        <IconButton
          onClick={fetchTodos}
          sx={{
            transition: "transform 0.5s",
            transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          <RefreshCcw size={24} color={theme.palette.icons.main} />
        </IconButton>
      </Box>
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Todos"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: "15px" }}
        />
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <List>
          {filteredTodos.map((todo, index) => (
            <ListItem
              key={index}
              onClick={() => onSelect(todo)}
              sx={{ width: "100%", display: "block" }}
            >
              <Typography variant="body1">
                {todo.title.length > 20
                  ? `${todo.title.substring(0, 30)}...`
                  : todo.title}
                {todo.completed && (
                  <CheckCheck size={19} color={theme.palette.icons.main} />
                )}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AllTodos;
