import { HANDLE_GET_ROOMS, HANDLE_SET_SEND_MESSAGE } from '../types/types'

const initialState = {
  rooms: [],
  flagSendMessage: 0,
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_GET_ROOMS:
      return Object.assign({}, state, { rooms: action.payload.rooms })

    case HANDLE_SET_SEND_MESSAGE:
      return Object.assign({}, state, {
        flagSendMessage: state.flagSendMessage + 1,
      })

    default:
      return state
  }
}

export default User
