/* import external modules */
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import { composeWithDevTools } from 'redux-devtools-extension'

/* import internal modules */
import rootReducer from '../reducers/rootReducer' // Root reducer

const persistConfig = {
  // configuration object for redux-persist
  key: 'root_kuepa_challenge',
  storage, // define which storage to use
  whitelist: ['user', 'rooms'], // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  composeWithDevTools()
)

const persistor = persistStore(store) // used to create the persisted store, persistor will be used in the next step

export { store, persistor }
