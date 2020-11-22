/* import external modules */
import { combineReducers } from 'redux'

/* import internal modules */
import user from './user'
import rooms from './rooms'

const rootReducer = combineReducers({
  user: user,
  rooms: rooms,
})

export default rootReducer
