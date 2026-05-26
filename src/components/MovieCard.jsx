import React from "react";

function MovieCard({ movie, movieDetails }) {
  return (
    <button
      type="button"
      className="movie-card"
      onClick={() => movieDetails(movie.imdbID)}
    >
      <img src={movie.Poster} alt={movie.Title} />

      <div className="movie-card-text">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </button>
  );
}

export default MovieCard;