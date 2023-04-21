import { exportData } from "./movie-details";
import { idToGenereTranslate } from './helpers';

const watchButton = document.querySelector('.watch');
const quequeButton = document.querySelector('.que');
const url = "https://image.tmdb.org/t/p/w500";

function addToWatched() {
    const movieDetailsToSave = {
        title: exportData.title,
        id: exportData.id,
        releaseDate: Number.parseInt(exportData.release_date),
        genres: exportData.genres
            .map(genre => idToGenereTranslate(genre.id))
            .join(`, `),
        poster: url + exportData.poster_path,
        vote: exportData.vote_average.toFixed(1),
        popularity: exportData.popularity.toFixed(1),
        org_title: exportData.original_title,
        about: exportData.overview,
    };

    let watched = localStorage.getItem('WATCH_KEY');
    movieDataToJSON = JSON.stringify([movieDetailsToSave]);


    if (!watched) {
        localStorage.setItem('WATCH_KEY', movieDataToJSON);
    }

    const arrayWatched = watched.split(',');

    if (watched.includes(exportData.id)) {
        return
    } else {
        arrayWatched.push(movieDataToJSON)
        localStorage.setItem('WATCH_KEY', arrayWatched);
    };
};

function addToQuequed() {
    const movieDetailsToSave = {
        title: exportData.title,
        id: exportData.id,
        releaseDate: Number.parseInt(exportData.release_date),
        genres: exportData.genres
            .map(genre => idToGenereTranslate(genre.id))
            .join(`, `),
        poster: url + exportData.poster_path,
        vote: exportData.vote_average.toFixed(1),
        popularity: exportData.popularity.toFixed(1),
        org_title: exportData.original_title,
        about: exportData.overview,
    };

    let quequed = localStorage.getItem('QUEQUE_KEY');
    movieDataToJSON = JSON.stringify(movieDetailsToSave);

    if (!quequed) {
        localStorage.setItem('QUEQUE_KEY', movieDataToJSON)
    }
    
    const arrayQuequed = quequed.split(',');

    if (quequed.includes(exportData.id)) {
        return
    } else {
        arrayQuequed.push(movieDataToJSON)
        localStorage.setItem('QUEQUE_KEY', arrayQuequed);
    };
};

watchButton.addEventListener('click', addToWatched);
quequeButton.addEventListener('click', addToQuequed);