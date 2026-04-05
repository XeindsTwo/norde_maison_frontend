import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchOverlaySearchField from "@/components/SearchOverlay/components/SearchOverlaySearchField.jsx";

const DEBOUNCE_MS = 800;

const SearchHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const currentQuery = searchParams.get("q") || "";

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback((value) => {
    setQuery(value);
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        const params = new URLSearchParams(searchParams);
        params.set("q", value.trim());
        params.delete("page");
        setSearchParams(params);
      } else {
        const params = new URLSearchParams(searchParams);
        params.delete("q");
        params.delete("page");
        setSearchParams(params);
      }
    }, DEBOUNCE_MS);
  }, [searchParams, setSearchParams]);

  return (
    <div className="search-result__header">
      <SearchOverlaySearchField
        inputRef={inputRef}
        query={query}
        setQuery={handleChange}
      />
    </div>
  );
};

export default SearchHeader;