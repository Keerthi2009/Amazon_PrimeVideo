import firebase from "firebase/app";
import 'firebase/auth';//auth
import 'firebase/database';//database
import 'firebase/storage';//storing images


const firebaseConfig = {
    apiKey: "AIzaSyDt8ogwqA4hUkD3AZzcdfMgUxaXEkYfzT4",
    authDomain: "prime-video-b79e2.firebaseapp.com",
    databaseURL: "https://prime-video-b79e2.firebaseio.com",
    projectId: "prime-video-b79e2",
    storageBucket: "prime-video-b79e2.appspot.com",
    messagingSenderId: "871498879789",
    appId: "1:871498879789:web:6498b6c75f1d22c71c39a4"
  };

  firebase.initializeApp(firebaseConfig);//firebase init
  export default firebase;