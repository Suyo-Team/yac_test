import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: "100%",
    heigh: "100%",
  },
}));

/*
 * Field space containing the users input for the chat
 */
export default function SendField() {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      multiline
      rows="2"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}
