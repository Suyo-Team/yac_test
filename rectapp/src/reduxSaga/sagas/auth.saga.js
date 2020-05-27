import * as io from "socket.io-client";
import { put, call, takeLatest  } from 'redux-saga/effects'


import { 
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../const/actionTypes";

import { apiCall } from '../../services/services.config'

const socket = io.connect("http://localhost:5000");

export function* authSignUp( {payload} ){
  try {
    const {
      username,
      email,
      password,
      passwordConfirmation
    } = payload
    
    const response = yield call(apiCall,
      'registration/', //url
      { 
        username,
        email,
        password1: password,
        password2: passwordConfirmation  
      },        //data
      null,     //headers
      'POST'    // method
    )

    yield put({ type: REGISTER_SUCCESS, payload: response.data })
    window.location.reload()
    console.log('prueba signiin',response.data)

  } catch (error) {

    yield put({ type: REGISTER_FAIL, payload: error })
  }
}

export function* authLogin( {logindata} ){
  try {
    const  {
      username,
      password
    } = logindata
    
    const response = yield call(apiCall,
      'login/', //url
      { 
        username,
        password
      },        //data
      null,     //headers
      'POST'    // method
    )

    socket.emit('CLientADDonline',{username})

    yield put({ type: LOGIN_SUCCESS, logindata: response.data })
    window.location.reload()
  } catch (error) {
    yield put({ type: LOGIN_FAIL, logindata: error })
  }
} 

export function* auth_login(){
  yield takeLatest(LOGIN_START, authLogin) 
}

export function* auth_signup(){
  yield takeLatest(REGISTER_START, authSignUp)
}