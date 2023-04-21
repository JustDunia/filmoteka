import { exportData } from "./movie-details";

const watchButton = document.querySelector('.watch');
const quequeButton = document.querySelector('.que');

function addToWatched() {
    let watched = localStorage.getItem('WATCH_KEY');
    movieDataToJSON = JSON.stringify(exportData);

    if (watched === null) {
        watched = [];
        watched.push(movieDataToJSON);
        return localStorage.setItem('WATCH_KEY', watched)
    }
    
    const arrayWatched = watched.split(',');

    if (watched.includes(exportData.id)) {
        return
    } else {
        arrayWatched.push(movieDataToJSON)
        return localStorage.setItem('WATCH_KEY', arrayWatched);
    };
};

function addToQuequed() {
    let quequed = localStorage.getItem('QUEQUE_KEY');
    movieDataToJSON = JSON.stringify(exportData);

    if (quequed === null) {
        quequed = [];
        quequed.push(movieDataToJSON);
        return localStorage.setItem('QUEQUE_KEY', quequed)
    }
    
    const arrayQuequed = quequed.split(',');

    if (quequed.includes(exportData.id)) {
        return
    } else {
        arrayQuequed.push(movieDataToJSON)
        return localStorage.setItem('QUEQUE_KEY', arrayQuequed);
    };
};

watchButton.addEventListener('click', addToWatched);
quequeButton.addEventListener('click', addToQuequed);