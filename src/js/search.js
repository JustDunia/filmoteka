let searchMore = '';
const imagesForm = document.querySelector('#search-form');
const fetchSearchMovies = async query => {
  const table = await axios.get(
    `
    https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
  console.log(table);
  return table;
};

function searchFilms(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  searchMore = searchQuery.value;
  page = 1;

  document.getElementById('load-more').style.display = 'none';
  const onClick = () => {
    setTimeout(() => {
      document.getElementById('load-more').style.display = 'block';
    }, 3000);
  };
  onClick();

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
imagesForm.addEventListener('submit', searchFilms);
