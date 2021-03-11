import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyBtsg9INYJ_1z10tldi7pgXGY2soBCnR4Q',
  authDomain: 'huvianchat.firebaseapp.com',
  databaseURL: 'https://huvianchat.firebaseio.com',
  projectId: 'huvianchat',
  storageBucket: 'huvianchat.appspot.com',
  messagingSenderId: '413535360309',
  appId: '1:413535360309:web:bdfb41ca9cd8602d3b687c',
  measurementId: 'G-VFZ58W6G6Y'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default {
  db: firebase.firestore()
}
