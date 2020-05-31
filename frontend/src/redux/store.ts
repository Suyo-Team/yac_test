import { applyMiddleware, createStore, Store, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';

import userReducer, { userInitialState } from '../reducers/user/reducer';
import chatReducer, { chatInitialState } from '../reducers/chat/reducer';
import rootSaga from './saga';

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
});

const initialStates = {
  userReducer: userInitialState,
  chatReducer: chatInitialState,
};

export type AppState = ReturnType<typeof rootReducer>;

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (context, initialState = initialStates) => {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const { persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      applyMiddleware(sagaMiddleware)
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      bindMiddleware([sagaMiddleware])
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
