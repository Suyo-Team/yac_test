import { combineReducers } from 'redux';
import auth from './auth.reducers';
import auth_login from './auth.reducers';

const rootReducer = combineReducers({
  auth_login,
  auth
})

export default rootReducer