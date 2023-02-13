import "./App.css";
import { useRef } from "react";
import { Movies } from "./components/movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useEffect } from "react";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Search your movie</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="search"
            onChange={handleChange}
            value={search}
            placeholder="Avengers, Star wars, Matrix..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
