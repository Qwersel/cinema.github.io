// Load movies from local storage or use default data
function loadMovies() {
  let movies = JSON.parse(localStorage.getItem('movies'));
  if (!movies) {
      movies = [
          {
              "id": 1,
              "title": "Movie 1",
              "description": "A thrilling action movie with lots of suspense and excitement.",
              "genre": "Action",
              "releaseDate": "2025-06-15",
              "image": "images/movie1.jpg"
          },
          {
              "id": 2,
              "title": "Movie 2",
              "description": "A romantic comedy that will warm your heart.",
              "genre": "Comedy, Romance",
              "releaseDate": "2025-07-01",
              "image": "images/movie2.jpg"
          },
          {
              "id": 3,
              "title": "Movie 3",
              "description": "An animated adventure that takes you on a magical journey.",
              "genre": "Animation, Adventure",
              "releaseDate": "2025-08-10",
              "image": "images/movie3.jpg"
          }
      ];
      localStorage.setItem('movies', JSON.stringify(movies));
  }
  return movies;
}

// Function to render the movie catalog
function renderCatalog() {
  const movieCatalog = document.getElementById('movie-catalog');
  movieCatalog.innerHTML = ''; // Clear the catalog first

  const movies = loadMovies();

  movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      movieCard.innerHTML = `
          <img src="${movie.image}" alt="${movie.title}">
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

// Function to handle movie form submission
document.getElementById('movie-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const genre = document.getElementById('genre').value;
  const releaseDate = document.getElementById('releaseDate').value;
  const image = document.getElementById('image').value;

  if (title && description && genre && releaseDate && image) {
      // Get the existing movies from localStorage
      const movies = loadMovies();

      // Create a new movie object
      const newMovie = {
          id: movies.length + 1,
          title: title,
          description: description,
          genre: genre,
          releaseDate: releaseDate,
          image: image
      };

      // Add the new movie to the movies array
      movies.push(newMovie);

      // Save the updated movie list to localStorage
      localStorage.setItem('movies', JSON.stringify(movies));

      // Clear the form inputs
      document.getElementById('movie-form').reset();

      // Show success message
      document.getElementById('success-message').textContent = "Movie added successfully!";
      
      // Re-render the catalog with the new movie
      renderCatalog();
  }
});

// Initial rendering of the catalog
renderCatalog();
