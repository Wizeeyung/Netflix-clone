// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsdW7drqK1EuCjXYCBiQFWilSEekoZwuk',
  authDomain: 'netflix-cc380.firebaseapp.com',
  projectId: 'netflix-cc380',
  storageBucket: 'netflix-cc380.appspot.com',
  messagingSenderId: '144355800970',
  appId: '1:144355800970:web:2549b01d86e3d9176bba73'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);