import React from "react";
import { Grid } from "@material-ui/core";
import ChatSpace from "../components/ChatSpace";
import ListUsers from "../components/ListUsers";

/*
 * Page chat, this page is a container for the chat components
 */
function Chat() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={10}>
        <ChatSpace />
      </Grid>
      <Grid item xs={2}>
        <ListUsers />
      </Grid>
    </Grid>
  );
}

export default Chat;
