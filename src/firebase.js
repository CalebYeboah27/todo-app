import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8W6XDIvABxFQZ3MeUVCgCn-pFwwfzo0U",
  authDomain: "todo-app-cp-80ba3.firebaseapp.com",
  projectId: "todo-app-cp-80ba3",
  storageBucket: "todo-app-cp-80ba3.appspot.com",
  messagingSenderId: "751079636674",
  appId: "1:751079636674:web:1b6e6b2fba7cf84cd7055b",
  measurementId: "G-9HJFDDK65T",
});

const db = firebaseApp.firestore();

export default db;
