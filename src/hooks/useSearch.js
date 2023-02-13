
import { useState, useEffect, useRef } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === "") {
      setError("You must to put some name of a  movie");
      return;
    }
    if (search.length < 3) {
      setError("To search a movie you need to put more than 3 letters");
      return;
    }
    if (search.length > 3) {
      setError("");
      return;
    }
    setError(null);
  }, [search]);
  return { search, setSearch, error };
}
