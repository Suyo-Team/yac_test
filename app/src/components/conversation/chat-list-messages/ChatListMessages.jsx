import React from 'react'
import ChatMessages from '../chat-messages/ChatMessages'
import './style.css'

export default function ChatListMessages({ messages, nickname }) {
  return (
    <div className="chat__list__messages__root">
        <ul>
          {
            Array.isArray(messages) && messages.map((message) => {
              let own = message.sender !== nickname
              return(
                <BoxMessage key={message.id} ownMessages={own} color={own? '#36404a': '#4c3fb5'} {...message} />
              )
            })
          }
        </ul>

    </div>
  );
}
const BoxMessage = ({ownMessages, color, ...rest}) => ( 
    <li style={{display:'flex', justifyContent: ownMessages && 'flex-end'}}>
      <ChatMessages ownMessages={ownMessages} color={color} {...rest} />
    </li>
)