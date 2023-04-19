import axios from 'axios';
import Pagination from 'tui-pagination';
import { idToGenereTranslate } from './helpers';

const listFilms = document.querySelector('.movies-list');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';

let currentPage = 1;
let totalItems = 0;

const fetchTrendingMovies = async page => {
  const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
  return response.data;
};

function renderFilms(images) {
  const card = images
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
            <b> ${image.genre_ids
              .map(element => idToGenereTranslate(element))
              .join(`, `)} | ${Number.parseInt(image.release_date)}
          </b></p>
        </div>
      </li>`;
    })
    .join('');
  listFilms.innerHTML = card;
}

const pagination = new Pagination(document.getElementById('tui-pagination-container'), {
  totalItems: totalItems,
  itemsPerPage: 20,
  visiblePages: 5,
  page: currentPage,
  centerAlign: false,
  
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    disabledPage: '<span class="tui-page-btn tui-is-disabled">{{page}}</span>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
  // onPageMove: async function (event, page) {
  //   currentPage = page;
  //   console.log('currentPage:', currentPage); // check that currentPage is being updated correctly
  //   const response = await fetchTrendingMovies(currentPage);
  //   totalItems = response.total_results;
  //   console.log('totalItems:', totalItems); // check that totalItems is being updated correctly
  //   renderFilms(response.results);
  //   pagination.reset(totalItems);
  // },
});

pagination.on('afterMove', async function (eventData) {
  console.log(`Page moved to ${eventData.page}`);
  currentPage = eventData.page;
  console.log('currentPage:', currentPage); // check that currentPage is being updated correctly
  const response = await fetchTrendingMovies(currentPage);
  totalItems = response.total_results;
  console.log('totalItems:', totalItems); // check that totalItems is being updated correctly
  renderFilms(response.results);
  
});

// initial load
fetchTrendingMovies(currentPage).then(response => {
  totalItems = response.total_results;
  pagination.reset(totalItems);
  renderFilms(response.results);
  console.log('currentPage:', currentPage);
});
