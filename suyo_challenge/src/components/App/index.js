/* import external modules */
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { PersistGate } from 'redux-persist/integration/react'

/* import internal modules */
import '../../firebaseConfig'
import Router from '../../components/Router'
import { persistor, store } from '../../redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<h3>Loading...</h3>} persistor={persistor}>
        <CssBaseline />
        <Router />
      </PersistGate>
    </Provider>
  )
}

export default App
