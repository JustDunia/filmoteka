import { debounce } from 'debounce';
import axios from 'axios';
import { idToGenereTranslate } from './helpers';
import Pagination from 'tui-pagination';

const listFilms = document.querySelector('.movies-list');
const API_KEY = '4e9fa3fc2487236fdff94602c5bb9552';
const imagesForm = document.querySelector('#header-form');
const DEBOUNCE_DELAY = 300;
let searchMore = '';
const spinner = document.querySelector('.sk-chase');

let currentPage = 1;
let totalItems = 0;

const fetchSearchMovies = async (query, page) => {
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
         image.title
       } | ${
         isNaN(Number.parseInt(image.release_date))
           ? 'No year info'
           : Number.parseInt(image.release_date)
       }" src="https://image.tmdb.org/t/p/w500${image.poster_path}"
        <div class="info">
          <p class="info__title">
            <b>${image.title}</b>
          </p>
          <p class="info__genre">
            <b> ${image.genre_ids.map(element => idToGenereTranslate(element)).join(`, `)} | ${
         isNaN(Number.parseInt(image.release_date))
           ? 'No year info'
           : Number.parseInt(image.release_date)
       }
          </b></p>
        </div>
      </li>`;
    })
    .join('');
  listFilms.insertAdjacentHTML(
    'beforeend',
    card.replaceAll(
      'https://image.tmdb.org/t/p/w500null',
      'https://mateuszwoj-bit.github.io/GOIT-team-project-ice/squoosh-how1-desktop.b9f13a59.png',
    ),
  );
  spinner.classList.add('hidden');
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
    fetchSearchMovies(searchQuery.value, 1).then(response => {
      console.log(response);
      totalItems = response.data.total_results;
      pagination.reset(totalItems);
      renderFilms(response);
      console.log('currentPage:', currentPage);
    });
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
  });

  pagination.on('afterMove', async function (eventData) {
    console.log(`Page moved to ${eventData.page}`);
    currentPage = eventData.page;
    console.log('currentPage:', currentPage); // check that currentPage is being updated correctly
    const response = await fetchSearchMovies(searchQuery.value, currentPage);
    totalItems = response.total_results;
    console.log('totalItems:', totalItems); // check that totalItems is being updated correctly
    listFilms.innerHTML = [] + [];
    renderFilms(response);
  });
}
imagesForm.addEventListener('submit', searchFilms);
