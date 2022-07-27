// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
    apiKey: "AIzaSyCAiIUNJ6gfXnkxxgFCVqGJrZ74mlDs_zQ",
    authDomain: "pizzahust-c5035.firebaseapp.com",
    databaseURL: "https://pizzahust-c5035-default-rtdb.firebaseio.com",
    projectId: "pizzahust-c5035",
    storageBucket: "pizzahust-c5035.appspot.com",
    messagingSenderId: "617489313223",
    appId: "1:617489313223:web:d113632ae0c73b0041fde2"
});

// Initialize Firebase
export default app;
export const auth = getAuth(app);
/*import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const app= initializeApp  ({
    apiKey: 'AIzaSyBRKoLkB5VVonG35NTu2EWryh3o01CzwCA',
    authDomain: 'pizzahust-d7124.firebaseapp.com',
    databaseURL: "https://pizzahust-c5035-default-rtdb.firebaseio.com",
    projectId: 'pizzahust-d7124',
    storageBucket: 'pizzahust-d7124.appspot.com',
    messagingSenderId: '969729411649',
    appId: '1:969729411649:web:7298cc63bd3caa965e54c0',
    measurementId: '${config.measurementId}'
  });
export default app;
export const auth = getAuth(app);*/

