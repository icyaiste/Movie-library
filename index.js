import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


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


//Inputfält
let searchInput = document.getElementById('searchInput');
let titleInput = document.getElementById('titleInput');
let genreInput = document.getElementById('genreInput');
let yearInput = document.getElementById('yearInput')

//Buttons
let searchBtn = document.getElementById('searchbtn');
let addBtn = document.getElementById('addbtn');

let movieArray = []

let movieContainer = document.querySelector('.movie-container');

async function displayMovies() {
    const movieList = await getDocs(collection(db, 'Movies'));

    movieList.forEach(addedMovie => {
        const movie = addedMovie.data();
        //console.log(movie);
        let movieElem = document.createElement('div');
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
//console.log(movieArray);


async function addMovie(movieArray) {
    let title = titleInput.value;
    let genre = genreInput.value;
    let year = yearInput.value;

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

addBtn.addEventListener('click', () => {
    addMovie(movieArray);

});

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

function searchMovie(movie){
let searchValue = searchInput.value;

movieArray.forEach(searchedMovie => {
    if (searchedMovie.title == searchValue) {
        console.log('Movie found:', searchedMovie);
movieContainer.innerHTML = `<h1>${searchedMovie.title}</h1> <h3>${searchedMovie.genre}</h3> <h3>${searchedMovie.year}</h3>`


if (searchedMovie.title !== searchValue)
    console.log('There is no movie with this name');
}

});
}
searchBtn.addEventListener("click", () => {
searchMovie();
});






// function searchMovie(movie) {
//     getDocs(collection(db, 'Movies', movie));
// }

//searchBtn.addEventListener('click', () => searchMovie(movie.title));