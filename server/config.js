const firebase=require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCiSEdjzq_QecmnqL6GJZWJ0wRFp7KP0aw",
    authDomain: "numer-baccc.firebaseapp.com",
    projectId: "numer-baccc",
    storageBucket: "numer-baccc.appspot.com",
    messagingSenderId: "427079120842",
    appId: "1:427079120842:web:03d93351ef697a29680133",
    measurementId: "G-9NY78NKT2J"
  };
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
module.exports=db;
