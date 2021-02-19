import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from "firebase";
import db from "./firebase";
import Todo from "./Todo";
import "./bootstrap.min.css";
import "./App.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

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
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todos }))
        );
      });
  }, []);


  const addTodo = (event) => {
    event.preventDefault(); //

    db.collection("todos").add({
      todos: input,
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
      <h1 className="h1">My Note App</h1>
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
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add To Do
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <div>
            <Todo key={todo.id} text={todo} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
