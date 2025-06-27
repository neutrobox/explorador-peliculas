import { useState, useEffect, useCallback } from 'react';
import type { Movie } from '../types/tmdb';

const WATCHLIST_KEY = 'movie-explorer-watchlist';
const WATCHLIST_VERSION_KEY = 'movie-explorer-watchlist-version';
const CURRENT_VERSION = '1.0';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    try {
      const version = localStorage.getItem(WATCHLIST_VERSION_KEY);
      const stored = localStorage.getItem(WATCHLIST_KEY);

      if (stored && version === CURRENT_VERSION) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate that each item has the required Movie properties
          const validMovies = parsed.filter(item =>
            item &&
            typeof item.id === 'number' &&
            typeof item.title === 'string'
          );
          setWatchlist(validMovies);
        }
      } else if (version !== CURRENT_VERSION) {
        // Clear old version data
        localStorage.removeItem(WATCHLIST_KEY);
        localStorage.setItem(WATCHLIST_VERSION_KEY, CURRENT_VERSION);
      }
    } catch (error) {
      console.error('Error loading watchlist from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(WATCHLIST_KEY);
      localStorage.setItem(WATCHLIST_VERSION_KEY, CURRENT_VERSION);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save watchlist to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      localStorage.setItem(WATCHLIST_VERSION_KEY, CURRENT_VERSION);
    } catch (error) {
      console.error('Error saving watchlist to localStorage:', error);
      // If storage is full, try to clear and save again
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        try {
          localStorage.clear();
          localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
          localStorage.setItem(WATCHLIST_VERSION_KEY, CURRENT_VERSION);
        } catch (retryError) {
          console.error('Failed to save watchlist even after clearing storage:', retryError);
        }
      }
    }
  }, [watchlist, isLoaded]);

  const addToWatchlist = useCallback((movie: Movie) => {
    setWatchlist(prev => {
      // Check if movie is already in watchlist
      if (prev.some(item => item.id === movie.id)) {
        return prev;
      }
      // Add to the beginning of the list (most recent first)
      return [movie, ...prev];
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  }, []);

  const isInWatchlist = useCallback((movieId: number): boolean => {
    return watchlist.some(movie => movie.id === movieId);
  }, [watchlist]);

  const toggleWatchlist = useCallback((movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }, [isInWatchlist, removeFromWatchlist, addToWatchlist]);

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
  }, []);

  const getWatchlistMovie = useCallback((movieId: number): Movie | undefined => {
    return watchlist.find(movie => movie.id === movieId);
  }, [watchlist]);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    getWatchlistMovie,
    watchlistCount: watchlist.length,
    isLoaded,
  };
};
