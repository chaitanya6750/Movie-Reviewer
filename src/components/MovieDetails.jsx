import React from "react";

function MovieDetails({ selectedMovie }) {
  return (
    <div className="details">
      <h2>{selectedMovie.Title}</h2>

      <img
        src={selectedMovie.Poster}
        alt={selectedMovie.Title}
      />

      <p>
        <b>Year:</b> {selectedMovie.Year}
      </p>

      <p>
        <b>Genre:</b> {selectedMovie.Genre}
      </p>

      <p>
        <b>IMDB Rating:</b> {selectedMovie.imdbRating}
      </p>

      <p>{selectedMovie.Plot}</p>
    </div>
  );
}

export default MovieDetails;