/* eslint-disable react-hooks/exhaustive-deps */
/* import external modules */
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useRef, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

/* import internal modules */
import useStyles from './styles'
import ChatMessage from '../ChatMessage'
import { CircularProgress } from '@material-ui/core'
import { addMessageRoomApi, getRoomMessagesApi } from '../../apis/rooms'

const Chat = ({ roomId }) => {
  /* Start Firebase advance */
  const spaceMessages = useRef()
  const messagesRoomRef = getRoomMessagesApi(roomId)
  const query = messagesRoomRef.orderBy('createdAt')
  const [messagesRoom] = useCollectionData(query, { idField: 'id' })
  /* End Firebase advance */

  const classes = useStyles()
  const [message, setMessage] = useState('')
  const userInfo = useSelector((state) => state.user.user)
  const flagSendMessage = useSelector((state) => state.rooms.flagSendMessage)

  useEffect(() => {
    if (userInfo && flagSendMessage) {
      addMessageRoomFunction(roomId, userInfo.nickname, message)
    }
  }, [flagSendMessage])

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const addMessageRoomFunction = (roomId, nickname, message) => {
    if (roomId && nickname && message) {
      addMessageRoomApi(roomId, nickname, message)
        .then((docRef) => {
          setMessage('')
          spaceMessages.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    }
  }

  /** Start Other form for detect firestore realtime changes
   *
   * const [messagesRoom, setMessagesRoom] = useState([])
   *
   * useEffect(() => {
   *     getRoomMessagesFuncion(roomId)
   * }, [])
   *
   *
   * const getRoomMessagesFuncion = (roomId) => {
   *   if (userInfo) {
   *     getRoomMessagesApi(roomId).onSnapshot(
   *       (snapshot) => {
   *
   *         const allMessagesRoom = []
   *         snapshot.forEach((doc) => allMessagesRoom.push(doc.data()))
   *
   *         setMessagesRoom(allMessagesRoom)
   *       },
   *       (error) => console.error(error)
   *     )
   *   }
   * }
   *
   * End Other form for detect firestore realtime changes
   */

  return (
    <>
      {messagesRoom ? (
        messagesRoom.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            nicknameMessage={message.sender}
            nicknameRedux={userInfo.nickname}
          />
        ))
      ) : (
        <center>
          <CircularProgress color="secondary" />
        </center>
      )}

      <span ref={spaceMessages}></span>

      <form className={classes.root} autoComplete="off">
        <center>
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
        </center>
      </form>
    </>
  )
}

export default Chat
