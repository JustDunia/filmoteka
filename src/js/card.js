import axios from 'axios';
import { idToGenereTranslate } from './helpers';
const listFilms = document.querySelector('.movies-list');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';

let page = 1;

// Zapytanie do API TMDB zwraca obiekt odpowiedzi
const fetchTrendingMovies = async () => {
  const table = await axios.get(
    `
https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`,
  );
  console.log(table);
  return table;
};

function renderFilms(images) {
  const card = images.data.results
    .map(image => {
      return `
      <li class="movie-item">
        <img class="boxID" alt="${image.title} movie poster" movieID=${image.id} movieTitle="${
        image.title + ' ' + Number.parseInt(image.release_date)
      }" src="https://image.tmdb.org/t/p/w500${image.poster_path}"
        <div class="info">
          <p class="info__title">
            <b>${image.title}</b>
          </p>
          <p class="info__genre">
            <b> ${image.genre_ids.map(element => idToGenereTranslate(element)).join(`, `)}
     | ${Number.parseInt(image.release_date)}
          </b></p>
          
        </div>
      </li>`;
    })
    .join('');
  listFilms.insertAdjacentHTML('beforeend', card);
}

function loadMovieDataOnStart() {
  listFilms.innerHTML = '';
  fetchTrendingMovies()
    .then(function (images) {
      // handle success
      renderFilms(images);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

window.onload = loadMovieDataOnStart;
