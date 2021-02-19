import React from "react";
import "./Todo.css"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const Todo = ({ text }) => {
  return (
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar>
          <ListItemText primary={text} secondary="Next Deadline" />
        </ListItemAvatar>
      </ListItem>
    </List>
  );
};

export default Todo;
