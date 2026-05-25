import React from 'react'

export default function MovieDetails({ movie, close }) {
  if (!movie) return null

  return (
    <div className="details-overlay">
      <div className="details-card">
        <button className="close-btn" onClick={close} aria-label="Close details">X</button>

        <img
          src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.Title}
        />

        <div className="details-content">
          <h2>{movie.Title}</h2>

          <p>
            <strong>Year:</strong> {movie.Year}
          </p>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  )
}
