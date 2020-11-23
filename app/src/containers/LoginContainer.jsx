import React from 'react'
import LoginComponent from '../components/auth-form/login/Login'
import { signIn  } from '../services/auth'

export default function LoginContainer(){
    const handleLogin = async (data) => {
        try{
            await signIn(data)
        } catch(e) {
            alert(e)
        }
    }
    return (
        <LoginComponent tryLogin={handleLogin} />
    )
}