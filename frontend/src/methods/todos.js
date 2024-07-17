/**
 * @file This file defines the API methods used to interact with the backend todos API.
 */

import Cookies from 'js-cookie';

const backendUrl = process.env.REACT_APP_BACKEND_API_URL;
const authToken = `Token ${Cookies.get('todoApp-authToken')}`;

/**
 * Retrieves all todos from the backend API.
 * @returns {Promise<Array>} A promise that resolves to an array of todos.
 * @throws {Error} If the request fails or the response is not successful.
 */
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

/**
 * Adds a new todo to the backend API.
 * @param {Object} todo - The todo object to be added.
 * @throws {Error} If the request fails or the response is not successful.
 */
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

/**
 * Deletes a todo from the backend API.
 * @param {string} id - The ID of the todo to be deleted.
 * @throws {Error} If the request fails or the response is not successful.
 */
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

/**
 * Updates a todo in the backend API.
 * @param {string} id - The ID of the todo to be updated.
 * @param {Object} updatedTodo - The updated todo object.
 * @throws {Error} If the request fails or the response is not successful.
 */
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

/**
 * Retrieves todo statistics from the backend API.
 * @returns {Promise<Object>} A promise that resolves to an object containing todo statistics.
 * @throws {Error} If the request fails or the response is not successful.
 */
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