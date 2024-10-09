const apiKey = '146c2867b133120789aa9d2e0de77730';
const moviesContainer = document.getElementById('movies-container');



// Fetch popular movies on load
document.addEventListener('DOMContentLoaded', fetchPopularMovies);

function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results));
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieCard = `
            <div class="bg-white rounded shadow-md p-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full">
                <h3 class="text-xl font-bold mt-2">${movie.title}</h3>
                <p>${movie.release_date}</p>
<button onclick="addToFavorites(${movie.id})" class="bg-[#6DC8C8] text-white p-2 mt-2">Add to Favorites</button>

            </div>
        `;
        moviesContainer.innerHTML += movieCard;
    });
}


// Add to favorites
function addToFavorites(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(movie => {
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          favorites.push(movie);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          alert(`${movie.title} added to favorites!`);
      });
}
