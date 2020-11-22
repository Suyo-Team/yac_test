/* import external modules */
import { combineReducers } from 'redux'

/* import internal modules */
import user from './user'

const rootReducer = combineReducers({
  user: user,
})

export default rootReducer
