import React from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function Todo({ todo, toggleComplete }) {
  return (
    <ListItem >
      <Checkbox style={{color:'white'}}
        checked={todo.complete}
        onChange={() => {
          toggleComplete(todo.id);
        }}
      />
      <Typography>{todo.desc}</Typography>
    </ListItem>
  );
}