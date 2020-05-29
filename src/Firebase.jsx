  import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAnEybiiEOvw_MzyZBnMXXMUkXf8g9Pbhk",
    authDomain: "chat-e707c.firebaseapp.com",
    databaseURL: "https://chat-e707c.firebaseio.com",
    projectId: "chat-e707c",
    storageBucket: "chat-e707c.appspot.com",
    messagingSenderId: "967236795224",
    appId: "1:967236795224:web:24132f60899684ed3a032d",
    measurementId: "G-SFKHE7234P"
  };
  // Initialize Firebase
  const firebaseConf = firebase.initializeApp(firebaseConfig);
export default firebaseConf;