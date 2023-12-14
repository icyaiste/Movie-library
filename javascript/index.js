import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {displayMovies,movieArray, movieContainer} from "./display.js";

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

async function addMovie(movieArray) {
    let title = document.getElementById('titleInput').value;
    let genre = document.getElementById('genreInput').value;
    let year = document.getElementById('yearInput').value;

    for (let i = 0; i < movieArray.length; i++) {
        let newMovie = movieArray[i];
        if (newMovie.title === title) {
            console.log('Movie with the same title already exists!');
            return; // Exit the function if a duplicate is found
        }
    }
    console.log('Movie is added to the collection');
    await addDoc(collection(db, 'Movies'),
        {
            title: title,
            genre: genre,
            year: year,
            watched: false
        });
    location.reload();
}

document.getElementById('addbtn').addEventListener('click', () => {
    addMovie(movieArray);

});


await displayMovies();
//console.log(movieArray);


async function deleteMovie(movieId) {
    await deleteDoc(doc(db, 'Movies', movieId));
    location.reload();// Function som uppdaterar sidan direkt efter

}

async function updateWatched(movieId, currentWatchedValue, watchedbtn) {
    const selectedMovie = doc(db, 'Movies', movieId);
    //console.log(selectedMovie);
    if (currentWatchedValue == true) {
        currentWatchedValue = false;
        watchedbtn.innerText = "Watch";
    } else if (currentWatchedValue == false) {
        currentWatchedValue = true;
        watchedbtn.innerText = "Watched";
    }

    //const updateWatchedValue = !currentWatchedValue;   //Simplified if statement
    await updateDoc(selectedMovie, // Update the movie document in Firestore with the new watched value
        {
            watched: currentWatchedValue
        });
    return currentWatchedValue;
}

async function searchMovie() {
    let title = document.getElementById('searchInput').value;

    const foundMovies = await getDocs(
        query(collection(db, 'Movies'), where('title', '==', title))
    );

    let results = [];

    foundMovies.forEach((movie) => {
        const foundMovie = movie.data();
        results.push(foundMovie);
    });

    results.forEach((foundMovie) => {
        movieContainer.innerHTML = `<h1>${foundMovie.title}</h1> <h3>${foundMovie.genre}</h3> <h3>${foundMovie.year}</h3>`;
    });
}

document.getElementById('searchbtn').addEventListener("click", () => {
    searchMovie();
});

export{db,getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where,initializeApp}