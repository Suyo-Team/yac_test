import firebase from '../firebase/client'

const normalizeUser = user => {
    const { email, uid } = user
  
    return {
      email,
      uid
    }
  }

export const onAuthStateChange = onChange => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onChange(normalizeUser(user))
      } else {
        onChange(null)
      }
    })
  }

export const signUpWithEmailAndPass = (email, pass) => {
    return firebase.auth().createUserWithEmailAndPassword(email, pass)
}

export const signInWithEmailAndPass = (email, pass) => {
  return firebase.auth().signInWithEmailAndPassword(email, pass)
}

export const signOut = () => {
  return firebase.auth().signOut()
}