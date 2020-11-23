import { app } from '../utils/mfirebase'

export async function signOut(){
    await app.auth().signOut()
}
export async function signIn({ email, password }){
    await app.auth().signInWithEmailAndPassword(email, password)
}