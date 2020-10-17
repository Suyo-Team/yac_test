import React, { useState, useEffect } from 'react'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import useUser, { userState } from '../hooks/useUser'
import { useHistory } from "react-router-dom";

export default function Home () {

    const [isRegister, setIsRegister] = useState(false)
    const user = useUser()
    const history = useHistory()

    useEffect(() => {
        user && history.replace('/chat')
      }, [user])

    const goToRegister = () => {
        setIsRegister(true)
    }

    const goToSignIn = () => {
        setIsRegister(false)
    }

    return (
        <>
        {user === userState.NOT_KNOWN_USER ? <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}><div className='spinner-border text-primary'></div></div> : ''}
        {
        user === userState.LOGGED_USER ? 
            (!isRegister ? <SignIn goToRegister={goToRegister}/> : <SignUp goToSignIn={goToSignIn} />)
            :
            ''
        }        
        </>
    )
}