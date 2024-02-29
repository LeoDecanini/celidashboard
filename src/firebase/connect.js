import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLNZ2roSmdT-wD7PDRA6G96b71eTnxrmw",
  authDomain: "celifinder-47510.firebaseapp.com",
  projectId: "celifinder-47510",
  storageBucket: "celifinder-47510.appspot.com",
  messagingSenderId: "774796136671",
  appId: "1:774796136671:web:acbb6d6d21965dfd24d96a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { auth, app, firestore };
