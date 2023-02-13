import "./App.css";
import { useCallback, useRef } from "react";
import { Movies } from "./components/movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useEffect } from "react";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };
  const handleSort = () => {
    setSort(!sort);
  };
  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(event.target.value);
    debouncedGetMovies(newSearch);
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
          <input type={"checkbox"} onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
