import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK7T15DJcKVY35pHuYC-CbreOp_YhE_KI",

  authDomain: "my-money-8ce58.firebaseapp.com",

  projectId: "my-money-8ce58",

  storageBucket: "my-money-8ce58.appspot.com",

  messagingSenderId: "838975488179",

  appId: "1:838975488179:web:cb8e0a1a3fbfa5407e30c6",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
