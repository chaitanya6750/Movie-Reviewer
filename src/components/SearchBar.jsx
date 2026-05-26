import React from "react";

function SearchBar({ search, setSearch, fetchMovies }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;