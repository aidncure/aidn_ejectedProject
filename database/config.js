import firebase from 'firebase';

import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBtO4KjFJ2_CqGqFPGV-PFGAVw4K0qp0jU",
  authDomain: "aidnpro-7c2db.firebaseapp.com",
  databaseURL: "https://aidnpro-7c2db-default-rtdb.firebaseio.com",
  projectId: "aidnpro-7c2db",
  storageBucket: "aidnpro-7c2db.appspot.com",
  messagingSenderId: "187677015930",
  appId: "1:187677015930:web:12d16213327f1a6e87e0c3",
  measurementId: "G-68HN61Q38K"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth()

export default {
    firebase,
    db,
    auth,
};