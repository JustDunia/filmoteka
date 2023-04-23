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

const fetchProvider = async (id = 1771) => {
  const table = await axios.get(
    `
https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=4e9fa3fc2487236fdff94602c5bb9552`,
  );
  console.log(table);
  return table;
};

const fetchGenere = async q => { 
  const table = await axios.get(
    `
https://youtube.googleapis.com/youtube/v3/search?q=${q}&key=AIzaSyB8TTc_5353cPL4Gqfo9xPQBbRH9hfG-YA`,
  );
  return table;
};

function gatherDetailsProv(response) {
  const table = response.data.results.PL;
  console.log('test');
  if (table !== undefined && table.flatrate !== undefined) {
    // console.log(table.flatrate[0].provider_name.includes === "Netflix")
    console.log(table.flatrate[0].provider_name === 'Netflix');
    const NMark = `<a href="https://www.netflix.com/search?q=${exportData.title}" target="_blank" rel="noreferrer noopener"><image class="stream" src="https://www.themoviedb.org/t/p/original${table.flatrate[0].logo_path}" width="50" height="50"></a>   
   `;

    const markupList = table.flatrate
      .filter(image => image.provider_name !== 'Netflix')
      .map(
        image => `<image class="stream" src="https://www.themoviedb.org/t/p/original${image.logo_path}" width="50" height="50">   
   `,
      )
      .join(``);
    overview.insertAdjacentHTML('beforeend', `<p class="mod-ab">STREAM</p>`);
    if (table.flatrate[0].provider_name === 'Netflix') {
      overview.insertAdjacentHTML('beforeend', NMark);
    }
    overview.insertAdjacentHTML('beforeend', markupList);
    document.querySelector('.mod--buttons').classList.remove('mod--buttons-alt');
  } else {
    document.querySelector('.mod--buttons').classList.add('mod--buttons-alt');
  }
}

function gatherDetailsForYt(response) {
  const table = response.data;
  detailsObjectYouTube = {
    snipet: table.items[0].id.videoId,
  };
  console.log(detailsObjectYouTube);
}

var vplayer = document.querySelectorAll('.vplayer');

function YoutubeLoad(q) {
  var vplayer = document.querySelectorAll('.vplayer');

  for (var i = 0; i < vplayer.length; i++) {
    // console.log(vplayer[i].dataset.v);
    var source = 'https://img.youtube.com/vi/' + q + '/sddefault.jpg';

    var image = new Image();
    image.src = source;
    image.addEventListener(
      'load',
      (function () {
        vplayer[i].appendChild(image);
      })(i),
    );

    function LoadYT() {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + q + '?rel=0&showinfo=0');
      vplayer[i].innerHTML = '';
      vplayer[i].appendChild(iframe);
    }
    LoadYT();
  }
}

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
  overview.insertAdjacentHTML('afterbegin', markupList.replaceAll(
    'https://image.tmdb.org/t/p/w500null',
    'https://mateuszwoj-bit.github.io/GOIT-team-project-ice/squoosh-how1-desktop.b9f13a59.png',
  ));
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
    .then(
      fetchProvider(event.target.getAttribute('movieID'))
        .then(function (response) {
          // handle success
          console.log('prov');
          console.log(response);
          gatherDetailsProv(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        }),
    )
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  fetchGenere(event.target.getAttribute('movietitle'))
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(response.data.items[0].id.videoId);
      gatherDetailsForYt(response);
      YoutubeLoad(detailsObjectYouTube.snipet);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });  
}

gallery.onclick = handleDetailClick;
export { exportData };