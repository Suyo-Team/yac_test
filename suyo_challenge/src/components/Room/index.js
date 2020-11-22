/* import external modules */
import React from 'react'
import { Card, CardActions, CardContent, Typography } from '@material-ui/core'

/* import external modules */
import Chat from '../Chat'
import useStyles from './styles'
import Modal from '../commons/Modal'
import { addMessageRoomApi } from '../../apis/rooms'

const SimpleCard = ({ room }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  const addMessageRoomFunction = (roomId) => {
    addMessageRoomApi(roomId)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h6" component="h2">
          {bull}
          {room.name}
          {bull}
        </Typography>
      </CardContent>
      <CardActions>
        <Modal
          openButtonTitle="Enter"
          actionButtonTitle="Send"
          title={room.name}
          addMessageRoomFunction={() => addMessageRoomFunction(room.id)}
        >
          <Chat roomName={room.name} roomId={room.id} />
        </Modal>
      </CardActions>
    </Card>
  )
}

export default SimpleCard
