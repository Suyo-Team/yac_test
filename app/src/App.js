import './App.css'
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import LoginContainer from './containers/LoginContainer'
import RegisterContainer from './containers/RegisterContainer'
import ChatPage from './pages/ChatPage'
import PrivateRoute from './components/custome-route/PrivateRoute'
import PublicRoute from './components/custome-route/PublicRoute'
import { app } from './utils/mfirebase'
import { connect } from 'react-redux'
import { signIn } from './store/action/authAction'
import { WhisperSpinner } from 'react-spinners-kit'

const onAuthStateChange = (callback) => {
  return app.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const querySnapshot = await app.firestore().collection('users').where('email', '==', user.email).get()
      let nickname = ''
      let url = ''
      querySnapshot.forEach((doc) => {
        nickname = doc.data().nickname
        url = doc.data().url
      })
      callback({ loggedIn: true, email: user.email, uid: user.uid, update: false, nickname, url })
    } else {
      callback({ loggedIn: false, email: '', uid: '', update: false, nickname: '', url: '' })
    }
    console.log(user)
  })
}

function App ({ signIn, isAuth }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChange(signIn)
    return () => {
      unsubscribe()
    }
  }, [])
  if (isAuth.update) {
    return (
      <div style={{ width: '100%', height: '100vh', backgroundColor: 'white', display: 'flex', placeContent: 'center', placeItems: 'center' }}>
        <WhisperSpinner size={150} color='white' loading />
      </div>
    )
  }
  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute authentification={isAuth.loggedIn} component={ChatPage} path='/chat' exact />
          <PublicRoute authentification={isAuth.loggedIn} restricted component={LoginContainer} path='/' exact />
          <PublicRoute authentification={isAuth.loggedIn} restricted component={LoginContainer} path='/login' exact />
          <PublicRoute authentification={isAuth.loggedIn} restricted component={RegisterContainer} path='/register' exact />
        </Switch>
      </Router>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (info) => dispatch(signIn(info))
  }
}

const mapStateProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth
  }
}
export default connect(mapStateProps, mapDispatchToProps)(App)
