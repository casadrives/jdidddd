import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/debounce';
import { searchAddress } from '../utils/location';

export function useAddressSearch(options = { debounceMs: 300 }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchAddress(searchQuery);
        setSuggestions(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, options.debounceMs),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel?.();
  }, [query, debouncedSearch]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
  };
}