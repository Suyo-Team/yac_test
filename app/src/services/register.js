import { app } from '../utils/mfirebase'

export async function registerEmailAndPassword (email, password) {
  return await app.auth().createUserWithEmailAndPassword(email, password)
}

export async function saveInStorage ({ nickname, email, password, uid, url }) {
  const db = app.firestore()
  await db.collection('users').doc(nickname).set({ email, password, nickname, uid, url })
}
export async function searhNickname (nickname) {
  const db = app.firestore()
  return await db.collection('users').doc(nickname).get()
}
