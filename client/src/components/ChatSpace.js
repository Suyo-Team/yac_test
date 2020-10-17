import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import UserMessage from "./UserMessage";
import PersonalMessage from "./PersonalMessage";
import SendField from "./SendField";


const useStyles = makeStyles({
  informationBox: {
    overflowY: "scroll",
    height: "75vh",
  },
});

export default function ChatSpace(props) {
  const messages = [
    {
      from: "yo",
      message: "hey, do you like doctor house?",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "I'm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "I'm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "I'm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "I'm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "I'm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
  ];
  const username = "yo";
  const classes = useStyles(props);

  return (
    <div>
      <div className={classes.informationBox}>
        {messages.map((message) =>
          message.from === username ? (
            <PersonalMessage message={message} />
          ) : (
            <UserMessage message={message} />
          )
        )}
      </div>
      <div>
        <SendField />
      </div>
    </div>
  );
}
