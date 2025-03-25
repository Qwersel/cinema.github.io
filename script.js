// Handle the form submission on the operator page
document.getElementById('movie-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const genre = document.getElementById('genre').value;
    const releaseDate = document.getElementById('releaseDate').value;
    const imageUrl = document.getElementById('imageUrl').value;

    if (title && description && genre && releaseDate && imageUrl) {
        const newMovie = {
            title: title,
            description: description,
            genre: genre,
            releaseDate: releaseDate,
            imageUrl: imageUrl
        };

        // Get existing movies from localStorage (if any)
        let movies = JSON.parse(localStorage.getItem('movies')) || [];

        // Add the new movie to the list
        movies.push(newMovie);

        // Save the updated list back to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));

        // Redirect to the catalog page after adding the movie
        window.location.href = 'index.html';
    } else {
        alert("Please fill out all fields.");
    }
});

// Function to load movies on the main page
function loadMovies() {
    const movieCatalog = document.getElementById('movie-catalog');
    movieCatalog.innerHTML = ''; // Clear the catalog first

    // Get movies from localStorage
    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    // Display the movies
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.title}" style="max-width: 100%; height: auto;">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <p class="release-date">Release Date: ${new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p class="genre">Genre: ${movie.genre}</p>
            </div>
        `;
        movieCatalog.appendChild(movieCard);
    });
}

// Load movies when the main page is loaded
if (document.getElementById('movie-catalog')) {
    loadMovies();
}
