// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDfxQ4DlWM4pUfjc86YeigrwYZADlzRY4k',
  authDomain: 'suyo-challenge.firebaseapp.com',
  databaseURL: 'https://suyo-challenge.firebaseio.com',
  projectId: 'suyo-challenge',
  storageBucket: 'suyo-challenge.appspot.com',
  messagingSenderId: '619615606519',
  appId: '1:619615606519:web:72bc356c61f9a6ad4625f2',
  measurementId: 'G-202NCMYG1S',
}

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
