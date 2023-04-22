import Pagination from 'tui-pagination';
import '../sass/main.scss';

let currentPage = 1;
let totalItems = 0;

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

 pagination.reset(totalItems);