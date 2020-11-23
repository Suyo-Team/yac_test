import { HANDLE_GET_ROOMS, HANDLE_SET_SEND_MESSAGE } from '../types/types'

export const setRooms = (rooms) => ({
  type: HANDLE_GET_ROOMS,
  payload: { rooms },
})

export const setSendMessage = () => ({
  type: HANDLE_SET_SEND_MESSAGE,
  payload: {},
})
