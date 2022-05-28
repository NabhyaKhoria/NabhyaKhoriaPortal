import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDAZ4KnudqTEf9WPh4t2iWUvX8163AP3oM",
    authDomain: "nkp-auth.firebaseapp.com",
    projectId: "nkp-auth",
    storageBucket: "nkp-auth.appspot.com",
    messagingSenderId: "918934779538",
    appId: "1:918934779538:web:e7cd117697a4ef5e8b984b"

})
export const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
export default firebaseApp;
