import axios from 'axios';
import { idToGenereTranslate, modalToggle } from './helpers';

const gallery = document.querySelector('.movie-container');
const overview = document.querySelector('.overview');
const closeModal = document.querySelector('.modalClose');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';

const watchButton = document.querySelector('.watch');
const queueButton = document.querySelector('.que');

const spinner = document.querySelector('.sk-chase');
let exportData;


closeModal.onclick = modalToggle;

// Zapytanie do API TMDB zwraca obiekt odpowiedzi
const fetchDetails = async (id = 1771) => {
  spinner.classList.remove('hidden');
  const table = await axios.get(`

https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
  return table;
};

// Renderowanie zawartości modala
function renderDetails(response) {
  const table = response.data;
  exportData = response.data;
  console.log(table);

  const markupList = `<image class="mod-img" src="https://image.tmdb.org/t/p/w500${
    table.poster_path
  }"><h2 class="mod-title">${table.title.toUpperCase()}</h2>
  <div class="row">
<div class = "columnA">
  <p>Vote / Votes</p>
  <p>Popularity</p>
  <p>Original Title</p>
  </div>
     <div class = "columnB">
     <p><span class="vote-mod">${table.vote_average.toFixed(1)}</span> / ${table.vote_count}</p>
     <p>${table.popularity.toFixed(1)}</p>
     <p>${table.original_title.toUpperCase()}</p>
      
     </div></div>
     <div class="row">
<div class="columnA"><p >Genre</p></div>
<div class="columnB"><p >${table.genres
    .map(element => idToGenereTranslate(element.id))
    .join(`, `)}  
     </p>    </div></div>
     
  <h3 class="mod-about">ABOUT</h3>
      <p class="mod-about-content">${table.overview}</p>
  `;
  overview.insertAdjacentHTML('afterbegin', markupList);
  spinner.classList.add('hidden');
}

//Pobiera informacje z atrybutów plakatu filmu (IMG)
function handleDetailClick(event) {
  console.log(event.target.getAttribute('movieID'));
  console.log(event.target.getAttribute('movietitle'));
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  overview.innerHTML = '';
  modalToggle();
  fetchDetails(event.target.getAttribute('movieID'))
    .then(function (response) {
      // handle success
      renderDetails(response);
      watchButton.innerHTML = 'ADD TO WATCHED';
      watchButton.classList.remove('btn-mod-color');
      queueButton.innerHTML = 'ADD TO QUEUE';
      queueButton.classList.remove('btn-mod-color'); 
        console.log(exportData.title);
      const parsedWatch = JSON.parse(localStorage.getItem('WATCH_KEY'));
      const parsedQue = JSON.parse(localStorage.getItem('QUEUE_KEY'));      
        if (parsedWatch.find(movie => movie.title === exportData.title)) {
          watchButton.innerHTML = 'ADDED TO WATCHED';
          watchButton.classList.add('btn-mod-color');           
      }
      if (parsedQue.find(movie => movie.title === exportData.title)) {
        queueButton.innerHTML = 'ADDED TO QUEUE';
        queueButton.classList.add('btn-mod-color');
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

gallery.onclick = handleDetailClick;
export { exportData };