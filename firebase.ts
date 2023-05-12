// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6mp2bGm68tOKgXLxAXsU0Ja4q5bClcOA',
  authDomain: 'strawberry-ai-2cca2.firebaseapp.com',
  projectId: 'strawberry-ai-2cca2',
  storageBucket: 'strawberry-ai-2cca2.appspot.com',
  messagingSenderId: '111173280836',
  appId: '1:111173280836:web:62c2610629d4d4b2380811',
  measurementId: 'G-EHQD7MGKYL',
}

// Initialize Firebase
export const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export { db }
