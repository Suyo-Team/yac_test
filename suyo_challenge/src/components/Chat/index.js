/* eslint-disable react-hooks/exhaustive-deps */
/* import external modules */
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'

/* import internal modules */
import useStyles from './styles'
import { addMessageRoomApi, getRoomMessagesApi } from '../../apis/rooms'

const Chat = ({ roomName, roomId }) => {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const userInfo = useSelector((state) => state.user.user)
  const flagSendMessage = useSelector((state) => state.rooms.flagSendMessage)

  useEffect(() => {
    getRoomMessagesFuncion(roomId)
  }, [])

  useEffect(() => {
    if (userInfo && flagSendMessage) {
      addMessageRoomFunction(roomId, userInfo.nickname, message)
    }
  }, [flagSendMessage])

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const getRoomMessagesFuncion = async (roomId) => {
    if (userInfo) {
      await getRoomMessagesApi(roomId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data())
          })
        })
        .catch((error) => {
          console.log('Error getting documents: ', error)
        })
    }
  }

  const addMessageRoomFunction = (roomId, nickname, message) => {
    if (roomId && nickname && message) {
      addMessageRoomApi(roomId, nickname, message)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }

  return (
    <form className={classes.root} autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Text message"
        multiline
        rows={4}
        placeholder="Text message here"
        variant="outlined"
        value={message}
        onChange={handleChange}
      />
    </form>
  )
}

export default Chat
