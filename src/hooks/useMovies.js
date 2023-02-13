import { useRef, useState } from "react";
import { searchMovies } from "../services/movies";


export function useMovies({ search }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef()

  const getMovies = async () => {

    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search

      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }

  }
  return { movies, getMovies, loading }

}