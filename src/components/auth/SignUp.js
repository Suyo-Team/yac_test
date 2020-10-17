import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { signUpWithEmailAndPass } from '../../service/auth.service'
import './SignIn.css'

function SignUp({ goToSignIn }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onHandleSubmit = evt => {
    evt.preventDefault()

    if(email !== '' && password !== ''){
        signUpWithEmailAndPass(email, password).then(() => {
            history.replace('/chat')
        })
        .catch(err => {
            console.log(err)
        })
    }    
  }

  return (
    <div className="app">
      <h1>TuttoDev IRC YAC</h1>
      <h4>Register</h4>
      <form className='login-form' onSubmit={onHandleSubmit}>
        <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)} value={email}/>
        <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} value={password}/>
        <button>Register</button>
        <small className='login-form__register' onClick={goToSignIn}>SignIn</small>
      </form>
    </div>
  );
}

export default SignUp;
