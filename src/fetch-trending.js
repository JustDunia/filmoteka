import axios from 'axios';
import {idToGenereTranslate} from './helpers';

const gallery = document.querySelector('.gallery');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';
let page = 1;


// Zapytanie do API TMDB zwraca obiekt odpowiedzi
const fetchTrendingMovies = async () => {
  const table = await axios.get(
    `
https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  console.log(table);
  return table;
};

function renderTrendingMovies(response) {
  const markupList = response.data.results
    .map(
      image => `<div class="box">
      <div class="box-shadow">
      <image class="boxID" alt="${image.title} movie poster" movieID=${
        image.id
      } movieTitle="${
        image.title + ' ' + Number.parseInt(image.release_date)
      }" src="https://image.tmdb.org/t/p/w500${image.poster_path}"       
      <div><p class = "font"><b>${image.title}</b></p>
      <p class = "font-info"> ${image.genre_ids
        .map(element => idToGenereTranslate(element))
        .join(`, `)}  
     | ${Number.parseInt(image.release_date)}</p> 
     </div>
     </div>
     </div>
   `
    )
    .join(``);

  gallery.insertAdjacentHTML('beforeend', markupList);
}

function loadMovieDataOnStart() {
  gallery.innerHTML = '';
  fetchTrendingMovies()
    .then(function (response) {
      // handle success
      renderTrendingMovies(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}



window.onload = loadMovieDataOnStart;
