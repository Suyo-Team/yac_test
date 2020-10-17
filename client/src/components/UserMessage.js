import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Message from "./Message";

export default function UserMessage(props) {
  const { message } = props;
  return (
    <Grid container={12}>
      <Grid item={6}>
        <Paper variant="outlined">
          <Message message={message} align="right"/>
        </Paper>
      </Grid>
    </Grid>
  );
}
