// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsD0lTRmCHqbVDPrLxFyKAK53ytXoxBX4",
  authDomain: "organice-9e1bc.firebaseapp.com",
  databaseURL: "https://organice-9e1bc-default-rtdb.firebaseio.com",
  projectId: "organice-9e1bc",
  storageBucket: "organice-9e1bc.appspot.com",
  messagingSenderId: "200913348373",
  appId: "1:200913348373:web:28a6d56b4af72d6962eb1c",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export default firebase.firestore();
const db = firebase.firestore();

export default db;
