const buttonGroup = document.getElementById("button-group"); 
let prevButton = null;

const buttonPressed = (e) => {
  if(e.target.nodeName === 'BUTTON') {
    e.target.classList.add('header-library-buttons__button--active');

    if(prevButton !== null) {
      prevButton.classList.remove('header-library-buttons__button--active');
    }

    prevButton = e.target;
  }
}
buttonGroup.addEventListener("click", buttonPressed);

const listFilms = document.querySelector('.movies-list');

      const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
      console.log(typeof parsed);

      function renderFilms(images) {
        const card = parsed
          .map(image => {
            return `
    <li class="movie-item">
      <img class="boxID" alt="${image.title} movie poster" movieID="${image.id}" movieTitle="${
              image.title + ' ' + image.releaseDate
            }" src="${image.poster}">
      <div class="info">
        <p class="info__title">
          <b>${image.title}</b>
        </p>
        <p class="info__genre">
          <b> ${image.genres} | ${image.releaseDate}</b>
        </p>
      </div>
    </li>`;
          })
          .join('');
        listFilms.innerHTML = card;
}
      
const parsed2 = JSON.parse(localStorage.getItem('QUEUE_KEY'));
      console.log(typeof parsed2);

      function renderFilms2(images) {
        const card = parsed2
          .map(image => {
            return `
    <li class="movie-item">
      <img class="boxID" alt="${image.title} movie poster" movieID="${image.id}" movieTitle="${
              image.title + ' ' + image.releaseDate
            }" src="${image.poster}">
      <div class="info">
        <p class="info__title">
          <b>${image.title}</b>
        </p>
        <p class="info__genre">
          <b> ${image.genres} | ${image.releaseDate}</b>
        </p>
      </div>
    </li>`;
          })
          .join('');
        listFilms.innerHTML = card;
      }



const watchedBtn = document.querySelector("#watched-btn");
watchedBtn.addEventListener("click", renderFilms);

const queueBtn = document.querySelector("#queue-btn");
queueBtn.addEventListener("click", renderFilms2);

