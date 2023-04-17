const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.mod');

let isModalOpen;

function modalToggle() {
  modal.classList.toggle('hidden');
  backdrop.classList.toggle('hidden');
  isModalOpen = modal.classList.contains('hidden') ? false : true;
  handleModalClosing();
}

function checkForEscape(e) {
  if (e.key === 'Escape') {
    modalToggle();
  }
}

function handleModalClosing() {
  if (isModalOpen) {
    window.addEventListener('keydown', checkForEscape);
  } else {
    window.removeEventListener('keydown', checkForEscape);
  }
}

backdrop.addEventListener('click', modalToggle);

function idToGenereTranslate(genID) {
  for (let id of idForNameGeneres) {
    if (id.id === genID) {
      return id.name;
    }
  }
}

const idForNameGeneres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

export { idToGenereTranslate, modalToggle };
