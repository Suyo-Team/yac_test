import React from "react";

/*Components */
import MessageShow from './MessageShow'

const MessagesList = ( { recieveMessage} ) => (
      <div>{recieveMessage && recieveMessage.map((data, i) => <MessageShow key={i} data={data}/>) } </div>
);

export default MessagesList;
