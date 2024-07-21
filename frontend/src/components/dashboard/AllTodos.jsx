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
  Search,
} from "lucide-react";
import { getAllTodos } from "../../methods/todos";

/**
 * Renders a component that displays a list of todos with search functionality and refresh button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSelect - The callback function to be called when a todo is selected.
 * @param {React.Ref} ref - The ref object used to expose the `fetchTodos` function.
 * @returns {JSX.Element} The rendered component.
 */
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
        background: theme.palette.background.glassmorphism,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
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
          <Typography
            fontFamily={theme.typography.heading}
            display="flex"
            alignItems="center"
            gap={1}
          >
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
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <Search size={20} />
              <Typography
                fontFamily={theme.typography.body1}
                sx={{ color: theme.palette.secondary.text }}
              >
                Search Todos
              </Typography>
            </Box>
          }
          fullWidth
          disabled={todos.length === 0}
          value={searchTerm}
          variant="standard"
          onChange={handleSearchChange}
          sx={{
            height: "20%",
            ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
              color: theme.palette.secondary.text,
            },
            ".css-mnn31": {
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
            marginBottom: "5px",
          }}
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
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ChevronRight size={19} color={theme.palette.secondary.icons} />
              <ListItem
                onClick={() => handleSelect(todo)}
                sx={{
                  gap: 1,
                }}
              >
                <Button
                  sx={{
                    backgroundColor:
                      selectedTodo === todo
                        ? theme.palette.secondary.main
                        : "transparent",
                    color:
                      selectedTodo === todo
                        ? theme.palette.secondary.heading
                        : theme.palette.secondary.text,
                    textTransform: "none",
                    justifyContent: "left",
                    width: "100%",
                  }}
                >
                  <Typography
                    fontFamily={theme.typography.body1}
                    sx={{ whiteSpace: "nowrap" }}
                  >
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
