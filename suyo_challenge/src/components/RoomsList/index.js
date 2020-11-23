/* eslint-disable react-hooks/exhaustive-deps */
/* import external modules */
import { Fragment, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

/* import internal modules */
import Room from '../Room'
import { getRoomsApi } from '../../apis/rooms'
import { setRooms } from '../../redux/actions/rooms'

const RoomsList = () => {
  const dispatch = useDispatch()
  const roomsListRedux = useSelector((state) => state.rooms.rooms)

  useEffect(() => {
    getRoomsFunction()
  }, [])

  const getRoomsFunction = async () => {
    let roomsList = []

    await getRoomsApi()
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          roomsList.push(doc.data())
        })
      })
      .catch((error) => {
        console.error('Error getting documents: ', error)
      })

    dispatch(setRooms(roomsList))
  }

  const renderRoomsList = roomsListRedux.map((room, index) => {
    return <Room room={room} key={index} />
  })

  return (
    <Fragment>
      <center>
        <Typography variant="h4" component="h2" color="textSecondary">
          Rooms
        </Typography>
      </center>
      {renderRoomsList}
    </Fragment>
  )
}

export default RoomsList
