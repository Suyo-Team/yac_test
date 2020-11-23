import React from 'react'
import ChatListContainer from '../containers/ChatListContainer'
import ChatNew from '../components/conversation/chat-new/ChatNew'
import ChatContentContainer from '../containers/ChatContentContainer'
import './style.css'

export default function ChatPage () {
  return (
    <div className='chat__page__root'>
      <ChatListContainer />
      <ChatNew />
      <ChatContentContainer />
    </div>
  )
}
