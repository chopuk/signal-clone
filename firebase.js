import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {FIREBASE_API_KEY} from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'signal-clone-40257.firebaseapp.com',
  projectId: 'signal-clone-40257',
  storageBucket: 'signal-clone-40257.appspot.com',
  messagingSenderId: '578525663107',
  appId: '1:578525663107:web:e44f30ebc90a582e6270b6'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export {db, auth}