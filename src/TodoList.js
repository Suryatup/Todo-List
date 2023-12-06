// TodoList.js
import React from 'react';
import Todo from './Todo';
import List from '@mui/material/List';

export default function TodoList({ todoList, toggleComplete }) {
  return (
    <List>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
      ))}
    </List>
  );
}