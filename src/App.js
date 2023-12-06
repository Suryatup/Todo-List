// App.js
import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const localVal = localStorage.getItem('TODOLIST');
    setTodoList(JSON.parse(localVal));
  }, []);

  useEffect(() => {
    localStorage.setItem('TODOLIST', JSON.stringify(todoList));
  }, [todoList]);

  const handleAddClick = () => {
    const val = inputRef.current.value;
    const tmpToDo = [...todoList];
    tmpToDo.push({ id: uuidv4(), desc: val, complete: false });
    setTodoList(tmpToDo);
    inputRef.current.value = '';
  };

  const toggleComplete = (id) => {
    const tmpToDo = [...todoList];
    const todoElem = tmpToDo.find((todo) => todo.id === id);
    todoElem.complete = !todoElem.complete;
    setTodoList(tmpToDo);
  };

  const clearComplete = () => {
    const tmpToDo = todoList.filter((todo) => !todo.complete);
    setTodoList(tmpToDo);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">TodoList</Typography>
        </Toolbar>
      </AppBar>
      <TodoList todoList={todoList} toggleComplete={toggleComplete} />
      <TextField inputRef={inputRef} />
      <Button variant="contained" onClick={handleAddClick}>
        Add todo
      </Button>
      <Button variant="contained" onClick={clearComplete}>
        Clear complete Todo
      </Button>
      <p>{todoList.filter((todo) => !todo.complete).length} left to do</p>
    </Box>
  );
}

export default App;
