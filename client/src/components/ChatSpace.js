import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import UserMessage from "./UserMessage";
import PersonalMessage from "./PersonalMessage";
import SendField from "./SendField";

const useStyles = makeStyles({
  informationBox: {
    overflowY: "scroll",
    height: "83vh",
  },
});

function ChatSpace(props) {
  const messages = [
    {
      from: "yo",
      message: "hey, do you like doctor house?,",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "Uhmmm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?,",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "Uhmmm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?,",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "Uhmmm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?,",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "Uhmmm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
    {
      from: "yo",
      message: "hey, do you like doctor house?,",
      datetime: "2020-10-17T05:36:50.054Z",
    },
    {
      from: "snubb123",
      message: "Uhmmm actually is House MD",
      datetime: "2020-10-17T05:36:53.054Z",
    },
  ];
  const username = "yo";
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.informationBox}>
        {messages.map((message, index) =>
          message.from === username ? (
            <PersonalMessage key={index} message={message} />
          ) : (
            <UserMessage key={index} message={message} />
          )
        )}
      </div>
      <div>
        <SendField />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

const wrapper = connect(mapStateToProps);
const component = wrapper(ChatSpace);

export default component;
