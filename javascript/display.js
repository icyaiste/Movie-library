//Hämtar och visar alla filmer i databasen

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from "./config.js";

let movieArray = [];

let movieContainer = document.querySelector('.movie-container');

async function displayMovies() {
    const movieList = await getDocs(collection(db, 'Movies'));

    movieList.forEach(addedMovie => {
        const movie = addedMovie.data();
        //console.log(movie);
        let movieElem = document.createElement('section');
        movieElem.innerHTML = `<h1>${movie.title}</h1> <h3>${movie.genre}</h3> <h3>${movie.year}</h3>`
        movieContainer.appendChild(movieElem);
        movieArray.push(movie);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete";
        movieElem.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", () => deleteMovie(addedMovie.id));

        let watchedbtn = document.createElement('button');
        watchedbtn.innerText = "Watch";
        movieElem.appendChild(watchedbtn);
        let currentWatchedValue = false;
        watchedbtn.addEventListener("click", async () => {
            currentWatchedValue = await updateWatched(addedMovie.id, currentWatchedValue, watchedbtn);
        });
    });
}
await displayMovies();

export { displayMovies, movieContainer, movieArray }