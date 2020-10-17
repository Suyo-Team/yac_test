import firebase from '../firebase/client'
const db = firebase.firestore()

export const sendChat = (email, message) => {
    const chat = {
        email,
        message,
        createdAt: new Date()
    }
    return db.collection('chats').add(chat)
}

export const readChats = (callback) => {
    db.collection('chats')
    .orderBy('createdAt', 'asc')
    .onSnapshot(({docs}) => {
        const messages = docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            const { createdAt } = data

            return {
                id,
                ...data,
                createdAt: createdAt.toDate()
            }
        })
        callback(messages)
    })
}