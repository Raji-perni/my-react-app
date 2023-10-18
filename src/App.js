// src/App.js
import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/1/todos';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (title) => {
    if (title.trim() === '') return;
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  return (
    <div>
      <input type="text" placeholder="Add new task..." onKeyDown={(e) => e.key === 'Enter' && addTodo(e.target.value)} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
};

export default App;
