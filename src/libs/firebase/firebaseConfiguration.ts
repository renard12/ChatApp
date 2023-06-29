// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDpRNFBNH4Aq2tyCPoDAqDBX0qL080mbf4',
  authDomain: 'chatapp-a38d2.firebaseapp.com',
  projectId: 'chatapp-a38d2',
  storageBucket: 'chatapp-a38d2.appspot.com',
  messagingSenderId: '751069206308',
  appId: '1:751069206308:web:87b4a69917a2c688edc5b1',
  measurementId: 'G-9DSP1D0ZPJ',
};

// Initialize Firebase
const startFirebase = initializeApp(firebaseConfig);

export const authentication = initializeAuth(startFirebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const database = getFirestore();
