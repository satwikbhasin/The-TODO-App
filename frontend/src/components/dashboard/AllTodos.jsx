import {
  React,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {
  List as ListIcon,
  CheckCheck,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { getAllTodos } from "../../methods/todos";

const AllTodos = forwardRef(({ onSelect }, ref) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleSelect = (todo) => {
    setSelectedTodo(todo);
    onSelect(todo);
  };

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

  useImperativeHandle(ref, () => ({
    fetchTodos,
  }));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        borderRadius: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.text,
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: { xs: "40vh", md: "80vh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Box flexGrow={1} display="flex" justifyContent="center">
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <ListIcon size={24} color={theme.palette.secondary.icons} /> All
          </Typography>
        </Box>
        <IconButton
          onClick={fetchTodos}
          sx={{
            transition: "transform 0.5s",
            transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          <RefreshCcw size={24} color={theme.palette.secondary.icons} />
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
          disabled={todos.length === 0}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <List>
          {filteredTodos.map((todo, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ChevronRight size={19} color={theme.palette.secondary.icons} />
              <ListItem
                key={index}
                onClick={() => handleSelect(todo)}
                sx={{
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    backgroundColor:
                      selectedTodo === todo
                        ? theme.palette.primary.main
                        : "transparent",
                    textTransform: "none",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "nowrap" }}>
                    {todo.title.length > 20
                      ? `${todo.title.substring(0, 30)}...`
                      : todo.title}
                    {todo.completed && (
                      <CheckCheck
                        size={19}
                        color={theme.palette.secondary.icons}
                      />
                    )}
                  </Typography>
                </Button>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
});

export default AllTodos;
