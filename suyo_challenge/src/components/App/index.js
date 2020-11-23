/* import external modules */
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CircularProgress, CssBaseline, ThemeProvider } from '@material-ui/core'

/* import internal modules */
import '../../firebaseConfig'
import theme from '../commons/Theme'
import Router from '../../components/Router'
import { persistor, store } from '../../redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<CircularProgress color="secondary" />}
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
