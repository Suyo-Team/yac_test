import { app } from '../utils/mfirebase'
import firebase from 'firebase/app'

export async function sendMessage (idChat, message) {
  const db = app.firestore()
  const currentTime = firebase.firestore.FieldValue.serverTimestamp()
  await db.collection(`chats/${idChat}/messages`).add({ ...message, time: currentTime })
}

export async function createChatEachUser (data, users) {
  const db = app.firestore()
  const currentTime = new Date()
  const promise = [{}]
  users.forEach((user) => {
    promise.push(db.doc(`users/${user.id}/chats/${currentTime.getMilliseconds()}${data.name_chat.replace(/ /g, '')}`).set({ ...data, time: firebase.firestore.FieldValue.serverTimestamp() }))
  })
  return Promise.all(promise)
}
