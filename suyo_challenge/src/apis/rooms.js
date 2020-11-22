/* import external modules */
import firebase from 'firebase/app'

export const getRoomsApi = () => {
  const docRef = firebase.firestore().collection('rooms')

  return docRef
}

export const getRoomMessagesApi = (roomId) => {
  const messagesRoomRef = firebase
    .firestore()
    .collection('rooms')
    .doc(roomId)
    .collection('messages')

  return messagesRoomRef
}

export const addMessageRoomApi = (roomId, sender, message) => {
  const messagesRoomRef = firebase
    .firestore()
    .collection('rooms')
    .doc(roomId)
    .collection('messages')
    .add({
      message,
      sender,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

  return messagesRoomRef
}
