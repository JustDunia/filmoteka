import { exportData } from "./movie-details";
import { idToGenereTranslate } from './helpers';

const watchButton = document.querySelector('.watch');
const queueButton = document.querySelector('.que');
const url = "https://image.tmdb.org/t/p/w500";

function addToWatched() {
    const movieDetailsToSave = {
        title: exportData.title,
        id: exportData.id,
        releaseDate: Number.parseInt(exportData.release_date),
        genres: exportData.genres
            .map(genre => idToGenereTranslate(genre.id))
            .join(', '),
        poster: url + exportData.poster_path,
        vote: exportData.vote_average.toFixed(1),
        popularity: exportData.popularity.toFixed(1),
        org_title: exportData.original_title,
        about: exportData.overview,
    };

    const watched = localStorage.getItem('WATCH_KEY');

    if (!watched) {
        localStorage.setItem('WATCH_KEY', JSON.stringify([movieDetailsToSave]));
        return
    }

    const savedMovies = JSON.parse(watched);

    if (watched.includes(exportData.id)) {
        return
    } else {
        localStorage.setItem('WATCH_KEY', JSON.stringify([...savedMovies, movieDetailsToSave]));
    };
};

function addToQueued() {
    const movieDetailsToSave = {
        title: exportData.title,
        id: exportData.id,
        releaseDate: Number.parseInt(exportData.release_date),
        genres: exportData.genres
            .map(genre => idToGenereTranslate(genre.id))
            .join(', '),
        poster: url + exportData.poster_path,
        vote: exportData.vote_average.toFixed(1),
        popularity: exportData.popularity.toFixed(1),
        org_title: exportData.original_title,
        about: exportData.overview,
    };

    const queued = localStorage.getItem('QUEUE_KEY');

    if (!queued) {
        localStorage.setItem('QUEUE_KEY', JSON.stringify([movieDetailsToSave]));
        return
    }

    const savedMovies = JSON.parse(queued);

    if (queued.includes(exportData.id)) {
        return
    } else {
        localStorage.setItem('QUEUE_KEY', JSON.stringify([...savedMovies, movieDetailsToSave]));
    };
};

watchButton.addEventListener('click', addToWatched);
queueButton.addEventListener('click', addToQueued);

//odczytywanie danych z localStorage
const getDataW = localStorage.getItem('WATCH_KEY');
const getDataQ = localStorage.getItem('QUEUE_KEY');
const parsedDataW = JSON.parse(getDataW);
const parsedDataQ = JSON.parse(getDataQ);

const testW = parsedDataW.map(movie => movie.title)
console.log(testW);
const testQ = parsedDataQ.map(movie => movie.title)
console.log(testQ);
