import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { movieArray } from "./display.js";
import { searchMovie, addMovie } from "./functions.js";
import { db } from "./config.js";

document.getElementById('addbtn').addEventListener('click', () => {
    addMovie(movieArray);
});

document.getElementById('searchbtn').addEventListener("click", () => {
    searchMovie();
});

export { db, getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where, initializeApp }