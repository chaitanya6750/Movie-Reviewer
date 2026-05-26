import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import SearchBar from './components/SearchBar'
import MovieDetails from './components/MovieDetails'
import MovieCard from './components/MovieCard';

const API_KEY = "28d57f4d";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);
  const detailsRef = useRef(null);

  const fetchMovies = useCallback(async (searchTerm = search) => {
    const actualSearch = typeof searchTerm === "string" ? searchTerm : search;
    const query = actualSearch.trim();
    if (!query) {
      setMovies([]);
      setError("Please enter a search term.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setMovies([]);
      setError("Unable to load movies. Please try again.");
    }
  }, [search]);

  const movieDetails = async (id) => {
    if (!id) {
      setError("Invalid movie selected.");
      return;
    }

    setLoadingDetails(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error || "Movie details could not be loaded.");
      }
    } catch (err) {
      setError("Unable to load movie details. Please try again.");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (selectedMovie && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedMovie]);

  return (
    <div className="app">
      <h1 style={{ color: "red" }}>Movie Reviewer</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        fetchMovies={fetchMovies}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            movieDetails={movieDetails}
          />
        ))}
      </div>

      {loadingDetails && <div className="loading-message">Loading movie details...</div>}

      {selectedMovie && (
        <div ref={detailsRef} className="details-panel">
          <button className="close-details" onClick={() => setSelectedMovie(null)}>
            Close
          </button>
          <MovieDetails selectedMovie={selectedMovie} />
        </div>
      )}
    </div>
  );
}

export default App;