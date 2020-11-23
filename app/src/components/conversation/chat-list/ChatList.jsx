import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { selectedChat } from '../../../store/action/selectedChatAction'

import { makeStyles } from '@material-ui/core/styles'
import ChatItem from '../chat-item/ChatItem'
import List from '@material-ui/core/List'

const useStyles = makeStyles(() => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  root: {
    overflowY: 'scroll',
    maxWidth: 350,
    height: '82vh',
    backgroundColor: '#303841',
    gridArea: 'chat-list',
    borderBottomLeftRadius: 15
  }
}))

function ChatList ({ chats, handleOnClick, selectedChat }) {
  const classes = useStyles()
  useEffect(() => {
    Array.isArray(chats) && selectedChat(chats[0])
  }, [chats])
  const chatItem = Array.isArray(chats) && chats.map((chat) => {
    return (
      <ChatItem key={chat.id} handleOnClick={handleOnClick} {...chat} />
    )
  })
  return (
    <List className={classes.root}>
      {chatItem}
    </List>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    selectedChat: (data) => dispatch(selectedChat(data))
  }
}

export default connect(null, mapDispatchToProps)(ChatList)
