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

//let movieList = [];
async function displayMovies() {
    const movieList = await getDocs(collection(db, 'Movies'));

    let movieContainer = document.querySelector('.movie-container');

    movieList.forEach(addedMovie => {
        const movie = addedMovie.data();
        //console.log(movie);
        let movieElem = document.createElement('div');
        movieElem.innerHTML = `<h1>${movie.title}</h1> <h3>${movie.genre}</h3> <h3>${movie.year}</h3>`
        movieContainer.appendChild(movieElem);

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Delete movie";
        movieElem.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", () => deleteMovie(addedMovie.id));
    });
}
await displayMovies();

async function addMovie() {
    let title = titleInput.value;
    let genre = genreInput.value;
    let year = yearInput.value;

    
if (movieList.some(movie => movie.title === title)) {
        console.log('Movie with the same title already exists!');
        return;
    }
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
    addMovie();
});

async function deleteMovie(movieId) {
    await deleteDoc(doc(db, 'Movies', movieId));
    location.reload();
    // Lägga till function som uppdaterar sidan direkt efter
}







// function searchMovie(movie) {
//     getDocs(collection(db, 'Movies', movie));
// }

//searchBtn.addEventListener('click', () => searchMovie(movie.title));