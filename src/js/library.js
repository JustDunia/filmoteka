const messageNoMovies = document.querySelector('.movie__container');
const listFilms = document.querySelector('.movies-list');


const parsed = JSON.parse(localStorage.getItem('WATCH_KEY'));
console.log(typeof parsed);

  // if (parsed === null || parsed === 0 || parsed.length <1 ) {
  //   messageNoMovies.classList.toggle('hidden2');
  //   console.log('wyświetlanie zdjęcia watch');
  // return;
  // }

function renderFilms(parsed11) { 
  
  if (parsed === null || parsed === 0 || parsed.length <1 ) {
    messageNoMovies.classList.toggle('hidden');
    console.log('wyświetlanie zdjęcia watch');
  return;
  }
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

function renderFilms2(parsed12) {
    const card = parsed2
      .map(image => {
        return `
      <li class="movie-item">
        <img class="boxID" alt="${image.title} movie poster" movieID="${image.id}" movieTitle="${image.title + ' ' + image.releaseDate
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

// const watchedBtn = document.querySelector("#watched-btn");
// watchedBtn.addEventListener("click", renderFilms);

// const queueBtn = document.querySelector("#queue-btn");
// queueBtn.addEventListener("click", renderFilms2);

const watchedBtn = document.querySelector('#watched-btn');
const queueBtn = document.querySelector('#queue-btn');

watchedBtn.addEventListener('click', () => {
  if (!watchedBtn.classList.contains('active')) {
    watchedBtn.classList.add('active');
    queueBtn.classList.remove('active');
    renderFilms();
  }
});

queueBtn.addEventListener('click', () => {
  if (!queueBtn.classList.contains('active')) {
    queueBtn.classList.add('active');
    watchedBtn.classList.remove('active');
    renderFilms2(); 
  }
});
