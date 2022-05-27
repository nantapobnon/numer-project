const firebase=require('firebase');
const firebaseConfig = {
  };
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
module.exports=db;
