const favoritesContainer = document.getElementById('favorites-container');

document.getElementById('navbar-toggle').addEventListener('click', function () {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('hidden');
  });

// Fetch favorites from localStorage on load
document.addEventListener('DOMContentLoaded', displayFavorites);

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesContainer.innerHTML = ''; // Clear the container

    favorites.forEach(movie => {
        const movieCard = `
        <div class="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-auto object-cover rounded-t-lg">
          <div class="mt-4">
            <h3 class="text-lg md:text-xl font-bold">${movie.title}</h3>
            <p class="text-gray-500 text-sm md:text-base">${movie.release_date}</p>
            <button onclick="addToFavorites(${movie.id})" class="bg-[#6DC8C8] hover:bg-[#5ababa] text-white py-2 px-4 mt-4 block w-full text-center rounded-md">Add to Favorites</button>
          </div>
        </div>
      `;
        favoritesContainer.innerHTML += movieCard;
    });
}

// Save notes to localStorage
function saveNotes(movieId) {
    const note = document.getElementById(`note-${movieId}`).value;
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    favorites = favorites.map(movie => {
        if (movie.id === movieId) {
            movie.note = note; // Add note to the movie object
        }
        return movie;
    });

    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Note saved!');
}