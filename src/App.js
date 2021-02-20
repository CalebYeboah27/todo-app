import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import firebase from "firebase";
import db from "./firebase";
import Todo from "./Todo";
import "./bootstrap.min.css";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 135,
  },
}));
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState(new Date().getDate());

  const classes = useStyles();
  // When the app loads we need to listen to
  // the database and fetch new todos
  // as they get added/removed

  useEffect(() => {
    // this code fires wehn the app.js loads
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data().todos));
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todos,
            date: doc.data().currentDate,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); //

    db.collection("todos").add({
      todos: input,
      currentDate: date,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); // Clear up the input field after clicking submit
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="h1">My Todo App</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
          <Input
            value={input}
            // Chnage the value of the inpit field in the browser
            onChange={(event) => setInput(event.target.value)}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <TextField
          id="datetime-local"
          label="Set deadline"
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <Button
          className="primary-button"
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <div>
            {console.log(todo)}
            <Todo key={todo.id} todo={todo} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
