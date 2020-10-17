import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Message from "./Message";

export default function PersonalMessage(props) {
  const { message } = props;
  return (
    <Grid container justify="flex-end">
      <Grid item lg={4}>
        <Paper variant="outlined">
          <Message message={message} align="left" />
        </Paper>
      </Grid>
    </Grid>
  );
}
