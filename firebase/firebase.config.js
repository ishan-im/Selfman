// Import the functions you need from the SDKs you need


import { getAuth, GoogleAuthProvider,onAuthStateChanged,signInWithPopup, } from "firebase/auth";

import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';







// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDec6LnV-4fkAEpTIZYpqPAF-qP2I900g4",
    authDomain: "selfura-86221.firebaseapp.com",
    projectId: "selfura-86221",
    storageBucket: "selfura-86221.appspot.com",
    messagingSenderId: "685783761547",
    appId: "1:685783761547:web:0ba7497ba61f0bab3b8a8e",
    measurementId: "G-DD123CTYF5"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);


//auth

export const auth =  getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});


export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);



export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);


//firestore

export const db = getFirestore(firebaseApp);







  
 

