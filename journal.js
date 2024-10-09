const favoritesContainer = document.getElementById('favorites-container');

// Fetch favorites from localStorage on load
document.addEventListener('DOMContentLoaded', displayFavorites);

function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesContainer.innerHTML = ''; // Clear the container

    favorites.forEach(movie => {
        const movieCard = `
            <div class="bg-white rounded shadow-md p-4">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full">
                <h3 class="text-xl font-bold mt-2">${movie.title}</h3>
                <p>${movie.release_date}</p>
                <textarea id="note-${movie.id}" placeholder="Add notes..." class="border p-2 w-full"></textarea>
                <button onclick="saveNotes(${movie.id})" class="bg-[#6DC8C8] text-white p-2 mt-2">Save Notes</button>
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