import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

function App() {

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "28d57f4d";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Do not fetch automatically on mount. Wait for user to search.

  const fetchMovies = async () => {
    if (!search || search.trim().length === 0) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(search)}&apikey=${API_KEY}`
      );

      const data = await response.json();

      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        if (data.Error) setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies. Check your network or API key.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const data = await response.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else if (data.Error) {
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movie details.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchMovies();
  };

  return (
    <div className="app">
      <h1 className="title">Movie Reviewer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search movies"
        />

        <button onClick={fetchMovies} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div style={{ textAlign: "center", marginBottom: 16, color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} close={() => setSelectedMovie(null)} />
      )}

      <div className="movie-container">
        {!loading && movies.length === 0 && (
          (search.trim() === "") ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af" }}>
              Start by entering a movie title above and press Search.
            </p>
          ) : (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#9ca3af" }}>
              No results for "{search}".
            </p>
          )
        )}

        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onSelect={fetchMovieDetails} />
        ))}
      </div>
    </div>
  );
}

export default App;