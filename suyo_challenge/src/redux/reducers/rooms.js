import { HANDLE_GET_ROOMS } from '../types/types'

const initialState = {
  rooms: [],
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_GET_ROOMS:
      return Object.assign({}, state, { rooms: action.payload.rooms })

    default:
      return state
  }
}

export default User
