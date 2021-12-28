// Import the functions you need from the SDKs you need
// import * as firebase from 'expo-firebase-app';
import firebase from 'firebase';
import  'firebase/firestore';
import firestore from 'firebase/firestore'
import storage from 'firebase/storage'
// import * as firestore from '@firebase/auth';
// import '@firebase/firestore';
// import 'firebase/firestore'
// import firestore from '@fir'
// import '@react-native-firebase/database';
// import {database} from '@react-native-firebase/database';
// import database from 'expo-f'
// import databaseURL from '@react-native-firebase/database';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
let app;
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ experimentalForceLongPolling: true });
// const db =  firebase.firest


if (firebase.apps.length===0) {
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app()
}
 
const auth = firebase.auth()
const db = firebase.firestore()
export {auth, db, firestore, firebase, storage};
// export default {
//   auth,
//   db,
//   // firebase,
// }





// import firebase from 'firebase';

// import 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyBtO4KjFJ2_CqGqFPGV-PFGAVw4K0qp0jU",
//   authDomain: "aidnpro-7c2db.firebaseapp.com",
//   databaseURL: "https://aidnpro-7c2db-default-rtdb.firebaseio.com",
//   projectId: "aidnpro-7c2db",
//   storageBucket: "aidnpro-7c2db.appspot.com",
//   messagingSenderId: "187677015930",
//   appId: "1:187677015930:web:12d16213327f1a6e87e0c3",
//   measurementId: "G-68HN61Q38K"
// };

// firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore();
// const auth = firebase.auth()

// export default {
//     firebase,
//     db,
//     auth,
// };