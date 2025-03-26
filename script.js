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

        let movies = JSON.parse(localStorage.getItem('movies')) || [];
        movies.push(newMovie);
        localStorage.setItem('movies', JSON.stringify(movies));

        window.location.href = 'index.html';
    } else {
        alert("Please fill out all fields.");
    }
});


// Function to load movies on the main page
function loadMovies() {
    const movieCatalog = document.getElementById('movie-catalog');

    // Preserve existing HTML (static cards) before appending new ones
    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.title}">
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

if (document.getElementById('movie-catalog')) {
    loadMovies();
}
