import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

/*
 * This component shows a list of all connected users
 */
export default function ListUsers() {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem button>
        <ListItemText> Text for 1 </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText> Text for 2 </ListItemText>
      </ListItem>
    </List>
  );
}
