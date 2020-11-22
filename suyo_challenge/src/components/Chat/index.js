/* eslint-disable react-hooks/exhaustive-deps */
/* import external modules */
import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'

/* import internal modules */
import useStyles from './styles'
import { getRoomMessagesApi } from '../../apis/rooms'

const Chat = ({ roomName, roomId }) => {
  const classes = useStyles()
  const [message, setMessage] = useState('')

  useEffect(() => {
    getRoomMessagesFuncion(roomId)
  }, [])

  const getRoomMessagesFuncion = async (roomId) => {
    await getRoomMessagesApi(roomId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
        })
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
  }

  const handleChange = (event) => {
    setMessage(event.target.value)
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
