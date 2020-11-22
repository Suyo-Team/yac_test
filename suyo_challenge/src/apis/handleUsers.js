/* import external modules */
import firebase from 'firebase/app'

export const signUp = (email, password) => {
  const docRef = firebase.auth().createUserWithEmailAndPassword(email, password)
  return docRef
}

export const login = (email, password) => {
  const docRef = firebase.auth().signInWithEmailAndPassword(email, password)
  return docRef
}

export const createUser = (user) => {
  const docRef = firebase.firestore().collection('users').doc(user.nickname)

  const userDoc = docRef.set({
    ...user,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  return userDoc
}

export const getUser = (user) => {
  const docRef = firebase.firestore().collection('users').doc(user.nickname)

  return docRef
}
