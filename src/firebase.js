import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
var config = require('./firebase_config.json');

const firebaseConfig = {
    apiKey: config["apiKey"],
    authDomain: config["authDomain"],
    projectId: config["projectId"],
    storageBucket: config["storageBucket"],
    messagingSenderId: config["messagingSenderId"],
    appId: config["appId"]
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
