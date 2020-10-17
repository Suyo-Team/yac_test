import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPass } from '../../service/auth.service'
import './SignIn.css'

function SignIn({ goToRegister }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onHandleSubmit = evt => {
    evt.preventDefault()
    
    if(email !== '' && password !== ''){
        signInWithEmailAndPass(email, password).then(() => {
            history.replace('/chat')
        })
        .catch(err => {
            console.log('error: ' + err)
        })
    }    
  }

  return (
    <div className="app">
      <h1>TuttoDev IRC YAC</h1>
      <h4>SignIn</h4>
      <form className='login-form' onSubmit={onHandleSubmit}>
        <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email}/>
        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}/>
        <button>Enter IRC</button>
        <small className='login-form__register' onClick={goToRegister}>Register</small>
      </form>
    </div>
  );
}

export default SignIn;
