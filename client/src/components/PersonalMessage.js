import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Message from "./Message";

export default function PersonalMessage(props) {
  const { message } = props;
  return (
    <Grid container={12} justify="flex-end">
      <Grid item={12}>
        <Paper variant="outlined">
          <Message message={message} />
        </Paper>
      </Grid>
    </Grid>
  );
}
