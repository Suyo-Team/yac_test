import { useState, useEffect } from 'react'
import { onAuthStateChange } from '../service/auth.service'

export const userState = {
  NOT_KNOWN_USER: undefined,
  ERROR: -1,
  LOGGED_USER: null
}

export default function useUser () {
  const [user, setUser] = useState(userState.NOT_KNOWN_USER)

  useEffect(() => {
    onAuthStateChange(user => {
      if(user){
        setUser(user)
      }else{
        setUser(userState.LOGGED_USER)
      }      
    })
  }, [])

  return user
}
