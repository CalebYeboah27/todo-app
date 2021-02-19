import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import "./Todo.css";
import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
} from "@material-ui/core";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "./firebase";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = ({ todo, id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const updateTodo = (e) => {
    e.preventDefault();
    // Update todo with the new input text

    db.collection("todos").doc(todo.id).update({
      todos: input,
      currentDate: date,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setOpen(false);
  };

  console.log(todo.date)

  const day = todo.date.substr(0, 10);
  const time = todo.date.substr(11, 15);

  return (
    <>
      <List key={todo.id} className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <ListItemText primary={todo.todo} secondary={`${day}, ${time} `} />
          </ListItemAvatar>
        </ListItem>
        <div className="edit-icon">
          <CreateRoundedIcon
            className="create-icon"
            onClick={(e) => setOpen(true)}
          />
        </div>
        <div className="delete-icon">
          <DeleteForeverIcon
            className="delete"
            onClick={(event) => db.collection("todos").doc(todo.id).delete()}
            color="secondary"
          />
        </div>
        <Modal open={open} onClose={(e) => setOpen(false)}>
          <div className={classes.paper}>
            <h4>Update your Todo</h4>
            <form>
              <FormControl>
                <Input
                  placeholder={todo.todo}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <TextField
                  id="datetime-local"
                  label="Set deadline"
                  type="datetime-local"
                  placeholder={todo.date}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <Button variant="contained" type="submit" onClick={updateTodo}>
                  Update Todo
                </Button>
              </FormControl>
            </form>
          </div>
        </Modal>
      </List>
    </>
  );
};

export default Todo;
