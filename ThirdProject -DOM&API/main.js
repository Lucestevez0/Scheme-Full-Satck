import {api_key} from `./key/key.js`;

const container_movies = document.querySelector('.movies');
const input = document.getElementById('search');
const btn = document.getElementById('search_icon');

btn.addEventListener('click', movie_search());

input.addEventListener('keyup', (e) => {
    
    if (e.key === 'Enter') {
      movie_search();
      return;
    };
});

async function movie_search() {
  const inputValue = input.value;
  if (inputValue != '') {
    clean_movies();
    const movies = await search_movie_name(inputValue);
    movies.forEach(movie => renderMovie(movie));
  };
};

function clean_movies() {
  container_movies.innerHTML = '';
};

async function search_movie_name(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`;
  const fetchResponse = await fetch(url);
  const { results } = await fetchResponse.json();
  return results;
};


async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
  const fetchResponse = await fetch(url);
  const { results } = await fetchResponse.json();
  return results;
}; 

window.onload = async function() {
  const movies = await getMovies();
  movies.forEach(movie => create(movie));
};  
  
function create(movie) {

  const { id, title, poster_path, vote_average, release_date, overview } = movie;
  
  const isFavorited = checkMovieIsFavorited(id);

  const year = new Date(release_date).getFullYear();
  const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  const movie_element = document.createElement('div');
  movie_element.classList.add('movie');
  container_movies.appendChild(movie_element);

  const movie_informations = document.createElement('div');
  movie_informations.classList.add('movie-informations');

  const movie_image_container = document.createElement('div');;
  movie_image_container.classList.add('movie-image');
  const movie_image = document.createElement('img');
  movie_image.src = image;
  movie_image.alt = `${title} Poster`;
  movie_image_container.appendChild(movie_image);
  movie_informations.appendChild(movie_image_container);

  const movie_text = document.createElement('div');
  movie_text.classList.add('movie-text');
  const movie_title = document.createElement('h4');
  movie_title.textContent = `${title} (${year})`;
  movie_text.appendChild(movie_title);
  movie_informations.appendChild(movie_text);

  const informations = document.createElement('div');
  informations.classList.add('movie-informations');
  movie_text.appendChild(informations);

  const rating = document.createElement('div');
  rating.classList.add('rating');
  const star_image = document.createElement('img');
  star_image.src = 'images/star.png';
  star_image.alt = 'Star';
  const movie_rate = document.createElement('span');
  movie_rate.classList.add('movie-rate');
  movie_rate.textContent = vote_average;
  rating.appendChild(star_image);
  rating.appendChild(movie_rate);
  informations.appendChild(rating);

  const favorite = document.createElement('div');
  favorite.classList.add('favorite');
  const favorite_image = document.createElement('img');
  favorite_image.src = isFavorited ? 'images/heart-fill.svg' : 'images/heart.svg';
  favorite_image.alt = 'Heart';
  favorite_image.classList.add('favoriteImage');
  const favorite_text = document.createElement('span');
  favorite_text.classList.add('movie-favorite');
  favorite_text.textContent = 'Favoritar';
  favorite.appendChild(favorite_image);
  favorite.appendChild(favorite_text);
  informations.appendChild(favorite);

  const movie_description = document.createElement('div');
  movie_description.classList.add('movie-description');
  const movieDescription = document.createElement('span');
  movieDescription.textContent = overview;
  movie_description.appendChild(movieDescription);
  
  movie_element.appendChild(movie_informations);
  movie_element.appendChild(movie_description);
};
