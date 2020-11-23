import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import firebase from 'firebase/app'
import rootReducer from './store/reducer/rootReducer'

import './index.css'
import App from './App'

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(getFirestore)))
const rrfConfig = {
  userProfile: '',
  useFirestoreForProfile: true
}
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
