import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './authReducer';
import selectedChatReducer from './selectedChatReducer'

const rootReducers = combineReducers({
  authReducer,
  selectedChatReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducers;