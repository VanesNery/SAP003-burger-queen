import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDEnaEMDhPJq4e4tVKN_cFmnt--lBMF51c",
    authDomain: "burguer-queen-3e833.firebaseapp.com",
    databaseURL: "https://burguer-queen-3e833.firebaseio.com",
    projectId: "burguer-queen-3e833",
    storageBucket: "burguer-queen-3e833.appspot.com",
    messagingSenderId: "448539984859",
    appId: "1:448539984859:web:b83d6403f0afcb07a69dfe",
    measurementId: "G-FTL09QV7LT"
};

firebase.initializeApp(config);

export default firebase