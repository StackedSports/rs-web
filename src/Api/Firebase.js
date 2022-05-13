// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDFlp9FvmB1udDCplWhuCeysmG9kMn1MJo',
    authDomain: 'stacked-messenger.firebaseapp.com',
    projectId: 'stacked-messenger',
    storageBucket: 'stacked-messenger.appspot.com',
    messagingSenderId: '687153377531',
    appId: '1:687153377531:web:9c3e5b80730f2b1b6f005e',
    measurementId: 'G-RL89MVQCCD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFirestore(app)
export const functions = getFunctions(app)