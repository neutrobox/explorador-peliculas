import type { Movie, MovieDetails, Credits, TMDBResponse, Genre, SearchFilters } from '../types/tmdb';

const BEARER_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

if (!BEARER_TOKEN) {
  throw new Error('VITE_TMDB_API_KEY is not defined in environment variables');
}

class TMDBClient {
  private async request<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get popular movies
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.request<TMDBResponse<Movie>>('/movie/popular', { page });
  }

  // Search movies
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.request<TMDBResponse<Movie>>('/search/movie', { query, page });
  }

  // Get movie details
  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.request<MovieDetails>(`/movie/${movieId}`);
  }

  // Get movie credits (cast and crew)
  async getMovieCredits(movieId: number): Promise<Credits> {
    return this.request<Credits>(`/movie/${movieId}/credits`);
  }

  // Get genres list
  async getGenres(): Promise<{ genres: Genre[] }> {
    return this.request<{ genres: Genre[] }>('/genre/movie/list');
  }

  // Discover movies with filters
  async discoverMovies(filters: SearchFilters, page: number = 1): Promise<TMDBResponse<Movie>> {
    const params: Record<string, string | number> = { page };
    
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.year) params.year = filters.year;
    if (filters.minRating) params['vote_average.gte'] = filters.minRating;
    if (filters.maxRating) params['vote_average.lte'] = filters.maxRating;

    return this.request<TMDBResponse<Movie>>('/discover/movie', params);
  }
}

// Image URL helpers
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'original' = 'w500'): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string | null => {
  return getImageUrl(path, 'w500');
};

export const getBackdropUrl = (path: string | null): string | null => {
  return getImageUrl(path, 'w780');
};

export const getThumbnailUrl = (path: string | null): string | null => {
  return getImageUrl(path, 'w300');
};

// Create and export the client instance
export const tmdbClient = new TMDBClient();
