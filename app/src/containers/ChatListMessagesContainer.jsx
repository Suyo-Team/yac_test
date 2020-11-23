import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import ChatListMessagesComponent from '../components/conversation/chat-list-messages/ChatListMessages'

function ChatListMessagesContainer ({ messages, nickname, onChangeMessages }) {
  useEffect(() => {
    onChangeMessages()
  }, [messages])
  return (
    <ChatListMessagesComponent nickname={nickname} messages={messages} />
  )
}
const mapStateProps = (state) => {
  return {
    nickname: state.authReducer.isAuth.nickname,
    messages: state.firestore.ordered.messages,
    chatSelected: state.selectedChatReducer.chatSelected
  }
}

export default compose(
  connect(mapStateProps, null),
  firestoreConnect((props) => {
    if (JSON.stringify(props.chatSelected) === '{}' || !props.chatSelected) {
      return []
    }
    return [
      {
        collection: 'chats',
        doc: props.chatSelected.id,
        subcollections: [
          {
            collection: 'messages',
            orderBy: ['time']
          }
        ],
        storeAs: 'messages'
      }
    ]
  })
)(ChatListMessagesContainer)
