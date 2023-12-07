import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {

  const [open, setOpen] = React.useState(false);

 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


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
    setOpen(true);
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

    <><Box sx={{ flexGrow: 1 }} display="flex" flexDirection="column" alignItems="center">
        <AppBar position="static" color="success">
          <Toolbar style={{justifyContent:'space-between'}}>
            <Typography variant="h4">TodoList</Typography>
            <Typography variant="h4">{todoList.filter((todo) => !todo.complete).length} Left to-do</Typography>

          </Toolbar>
        </AppBar>
       
<br /><br /><br />      
      <Grid container spacing={2}>
        <Grid item xs={8} style={{marginLeft:50}}>
          <Item>

          <TextField inputRef={inputRef} label="input" /><br></br>
          <Button variant="contained" onClick={handleAddClick} style={{margin:20}}>
          Add todo
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This message is added successfully!
        </Alert>
      </Snackbar>
        <Button variant="contained" color="error" onClick={clearComplete}>
          Clear complete Todo
        </Button>
          </Item>
        </Grid>
        <Grid item xs={3} >
          <Item >

          <TodoList todoList={todoList} toggleComplete={toggleComplete} />
          
          </Item>
        </Grid>
      </Grid>
    </Box>

      </>
  );
}

export default App;

