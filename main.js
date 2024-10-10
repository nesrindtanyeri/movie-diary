const apiKey = "146c2867b133120789aa9d2e0de77730";
const moviesContainer = document.getElementById("movies-container");
let allMoviesData = [];

document
  .querySelector("#search-movie")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchMovies(allMoviesData);
    }
  });

// Fetch popular movies on load
document.addEventListener("DOMContentLoaded", fetchPopularMovies);

function fetchPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        allMoviesData = data.results; 
        displayMovies(allMoviesData); 
      })
      .catch((error) => console.log("Error fetching movies:", error));
  }

function displayMovies(movies) {
  moviesContainer.innerHTML = ""; // Clear previous movies
  movies.forEach((movie) => {
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

function searchMovies(movies) {
  const input = document.querySelector("#search-movie").value.toLowerCase();
  const allMovies = movies.map((movie) => movie.title.toLowerCase());

<<<<<<< Updated upstream
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
=======
  const modal = document.getElementById("search-modal"); 
  const modalResults = document.getElementById("search-results"); 
  const closeModal = document.querySelector(".close-modal");

  modalResults.innerHTML = ""; 

  let found = false; 
  for (let i = 0; i < allMovies.length; i++) {
    if (allMovies[i].includes(input)) {
      const listItem = document.createElement("li");
      listItem.textContent = movies[i].title; 
      modalResults.appendChild(listItem); 
      found = true;
    }
  }

  if (!found) {
    const listItem = document.createElement("li");
    listItem.textContent = "This movie was not found";
    modalResults.appendChild(listItem);
  }

  modal.classList.remove("hidden");

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
>>>>>>> Stashed changes
}
