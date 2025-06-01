// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCW_6J9Du4v86jGUk9BQtyHG6gzAQGamyk",
    authDomain: "foremweb-de866.firebaseapp.com",
    projectId: "foremweb-de866",
    storageBucket: "foremweb-de866.firebasestorage.app",
    messagingSenderId: "1041044031813",
    appId: "1:1041044031813:web:bef4517841ff9040d8162c"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Export if using modules (not needed for this simple setup)
// export { auth, db, storage };