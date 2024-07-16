import Cookies from 'js-cookie';

const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
const authToken = `Token ${Cookies.get('todoApp-authToken')}`;

export const getAllTodos = async () => {
    try {
        const response = await fetch(backendUrl + 'todos/', {
            method: 'GET',
            headers: {
                'Authorization': authToken,
            },
        });
        if (!response.ok) {
            throw new Error(response);
        }
        const todos = await response.json();
        return todos;
    } catch (error) {
        throw new Error('Failed to fetch todos:', error);
    }
};

export const addTodo = async (todo) => {
    try {
        const response = await fetch(backendUrl + 'todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) {
            throw new Error(response);
        }
    } catch (error) {
        throw new Error('Failed to add todo:', error);
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await fetch(backendUrl + `todos/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': authToken,
            }
        });
        if (!response.ok) {
            throw new Error(response);
        }
    } catch (error) {
        throw new Error('Failed to delete todo:', error);
    }
};

export const updateTodo = async (id, updatedTodo) => {
    try {
        const response = await fetch(backendUrl + `todos/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
            },
            body: JSON.stringify(updatedTodo),
        });
        if (!response.ok) {
            throw new Error(response);
        }
    } catch (error) {
        throw new Error('Failed to update todo:', error);
    }
};

export const getTodoStats = async () => {
    try {
        const response = await fetch(backendUrl + 'todos/stats/', {
            method: 'GET',
            headers: {
                'Authorization': authToken,
            },
        });
        if (!response.ok) {
            throw new Error(response);
        }
        const stats = await response.json();
        return stats;
    } catch (error) {
        throw new Error('Failed to fetch todo stats:', error);
    }
};