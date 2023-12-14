//Funktioner för att lägga till,söka, ta bort och uppdatera om man har redan sett filmen 

import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from "./config.js";
import { movieContainer } from "./display.js";

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

export { searchMovie, deleteMovie, updateWatched, addMovie }