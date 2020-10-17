import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

let firebaseConfig = {
    apiKey: "AIzaSyDbRK7oimMdTPN8brDWnmBVnKez5kgvExE",
    authDomain: "yactuttodev.firebaseapp.com",
    databaseURL: "https://yactuttodev.firebaseio.com",
    projectId: "yactuttodev",
    storageBucket: "yactuttodev.appspot.com",
    messagingSenderId: "135636956622",
    appId: "1:135636956622:web:23b1be3aefa00a23c4e79f"
};

const app = firebase.initializeApp(firebaseConfig)
console.log('firebase inicializado')
export default app