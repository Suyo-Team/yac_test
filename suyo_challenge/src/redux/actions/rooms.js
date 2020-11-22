import { HANDLE_GET_ROOMS } from '../types/types'

export const setRooms = (rooms) => ({
  type: HANDLE_GET_ROOMS,
  payload: { rooms },
})
