import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import "./Todo.css";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = ({ text, id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = (e) => {
    e.preventDefault();
    // Update todo with the new input text

    db.collection("todos").doc(text.id).update({
      todos: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setOpen(false);
  };

  return (
    <>
      <List key={text.id} className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <ListItemText primary={text.todo} secondary="Next Deadline" />
          </ListItemAvatar>
        </ListItem>
        <Modal open={open} onClose={(e) => setOpen(false)}>
          <div className={classes.paper}>
            <h3>Update your to do</h3>
            <form>
              <Input
                placeholder={text.todo}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" onClick={updateTodo}>
                Update Todo
              </Button>
            </form>
          </div>
        </Modal>
        <Button variant="contained" onClick={(e) => setOpen(true)}>
          Edit
        </Button>
        <DeleteForeverIcon
          className="delete"
          onClick={(event) => db.collection("todos").doc(text.id).delete()}
          color="secondary"
        />
      </List>
    </>
  );
};

export default Todo;
