/**
 * @file This file defines the API methods used to interact with the backend todos API.
 */

import todos from "../components/dashboard/todos.json";

/**
 * Retrieves all todos from the local JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of todos.
 */
export const getAllTodos = async () => {
    return todos;
};

/**
 * Adds a new todo to the local JSON file.
 * @param {Object} todo - The todo object to be added.
 * @returns {Promise<void>}
 */
export const addTodo = async (todo) => {
    todo.id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    todos.push(todo);
};

/**
 * Deletes a todo from the local JSON file.
 * @param {string} id - The ID of the todo to be deleted.
 * @returns {Promise<void>}
 */
export const deleteTodo = async (id) => {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
        todos.splice(index, 1);
    }
};

/**
 * Updates a todo in the local JSON file.
 * @param {string} id - The ID of the todo to be updated.
 * @param {Object} updatedTodo - The updated todo object.
 * @returns {Promise<void>}
 */
export const updateTodo = async (id, updatedTodo) => {
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo };
    }
};

/**
 * Retrieves todo statistics from the local JSON file.
 * @returns {Promise<Object>} A promise that resolves to an object containing todo statistics.
 */
export const getTodoStats = async () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const incomplete = total - completed;

    return {
        total,
        completed,
        incomplete
    };
};