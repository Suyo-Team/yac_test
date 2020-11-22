/* import external modules */
import firebase from 'firebase/app'

export const signUpApi = (email, password) => {
  const docRef = firebase.auth().createUserWithEmailAndPassword(email, password)
  return docRef
}

export const loginApi = (email, password) => {
  const docRef = firebase.auth().signInWithEmailAndPassword(email, password)
  return docRef
}

export const createUserApi = (user) => {
  const docRef = firebase.firestore().collection('users').doc(user.nickname)

  const userDoc = docRef.set({
    ...user,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  return userDoc
}

export const getUserApi = (user) => {
  const docRef = firebase.firestore().collection('users').doc(user.nickname)

  return docRef
}

export const getUserByEmailApi = (userEmail) => {
  const docRef = firebase
    .firestore()
    .collection('users')
    .where('email', '==', userEmail)

  return docRef
}
