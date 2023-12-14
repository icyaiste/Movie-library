//Allt med firebase finns här

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDGeZ2D21ft5KmdqZ1aLvcxsSlPo_stAJM",
    authDomain: "movie-library-3fba3.firebaseapp.com",
    projectId: "movie-library-3fba3",
    storageBucket: "movie-library-3fba3.appspot.com",
    messagingSenderId: "196173258434",
    appId: "1:196173258434:web:81291ba2c9971cb847e55b"
};

const app = initializeApp(firebaseConfig); // Initierar och ansluter mot Firebase
const db = getFirestore(app); // Ansluter och hämtar vår databas

export { db, firebaseConfig }