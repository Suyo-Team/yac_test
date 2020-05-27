import React from 'react';
import ChatShow from './ChatShow'

const ChatList = ({ClientsOnline}) =>  (
    <div>{ClientsOnline && ClientsOnline.map((clients,i ) => (<ChatShow key = {i} clients={clients} />))}</div>
   );
export default ChatList;