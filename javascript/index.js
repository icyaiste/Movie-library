import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { movieArray } from "./display.js";
import { searchMovie } from "./functions.js";
import { db } from "./config.js";

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


document.getElementById('searchbtn').addEventListener("click", () => {
    searchMovie();
});

export { db, getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where, initializeApp }