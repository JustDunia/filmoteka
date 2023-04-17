import axios from 'axios';
import { idToGenereTranslate } from './helpers';
const listFilms = document.querySelector('.movies-list');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';
const imagesForm = document.querySelector('#header-form');
// const filmBox = document.getElementById('#header-form__input');
const DEBOUNCE_DELAY = 300;
let searchMore = '';

const fetchSearchMovies = async query => {
  const table = await axios.get(
    `
    https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
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
            <b>Views</b></br> ${image.genre_ids
              .map(element => idToGenereTranslate(element))
              .join(`, `)}
     | ${Number.parseInt(image.release_date)}
          </p>
          
        </div>
      </li>`;
    })
    .join('');
  listFilms.insertAdjacentHTML('beforeend', card);
}

function searchFilms(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  searchMore = searchQuery.value;
  page = 1;

  listFilms.innerHTML = '';

  {
    fetchSearchMovies(searchQuery.value)
      .then(images => {
        renderFilms(images);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
imagesForm.addEventListener('input', searchFilms);
// imagesForm.addEventListener('input', debounce(searchFilms, DEBOUNCE_DELAY));