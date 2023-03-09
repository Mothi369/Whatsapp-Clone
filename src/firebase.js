import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyB6vLLZENl33jHWNdwZLFeqDuJZJtDs9go",
  authDomain: "whatsapp-clone-firebase-46a65.firebaseapp.com",
  projectId: "whatsapp-clone-firebase-46a65",
  storageBucket: "whatsapp-clone-firebase-46a65.appspot.com",
  messagingSenderId: "298515563896",
  appId: "1:298515563896:web:b53a0566a335565883348d"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db