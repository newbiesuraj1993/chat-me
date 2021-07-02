import firebase from 'firebase/app'
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBl6Z2ehpgrcLeSDoyAKh0pGBcmkojoz0U",
    authDomain: "chat-me-2c0ec.firebaseapp.com",
    projectId: "chat-me-2c0ec",
    storageBucket: "chat-me-2c0ec.appspot.com",
    messagingSenderId: "376292021139",
    appId: "1:376292021139:web:98e46beadb8d654d8bce66"
  }).auth();