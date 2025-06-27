import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Container, Heading, Flex, Button, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { tmdbClient } from '../lib/tmdb';
import type { SearchFilters as SearchFiltersType } from '../types/tmdb';
import { Loading, ErrorMessage, MovieGrid, SearchFilters } from '../components';

// Define search params schema
type SearchParams = {
  query?: string;
  genre?: string;
  year?: string;
  minRating?: string;
  maxRating?: string;
  page?: string;
};

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      query: search.query as string,
      genre: search.genre as string,
      year: search.year as string,
      minRating: search.minRating as string,
      maxRating: search.maxRating as string,
      page: search.page as string,
    };
  },
  component: Search,
});

function Search() {
  const navigate = useNavigate({ from: '/search' });
  const searchParams = Route.useSearch();

  // Convert search params to filters
  const filtersFromParams: SearchFiltersType = {
    query: searchParams.query || '',
    genre: searchParams.genre ? parseInt(searchParams.genre) : undefined,
    year: searchParams.year ? parseInt(searchParams.year) : undefined,
    minRating: searchParams.minRating ? parseFloat(searchParams.minRating) : undefined,
    maxRating: searchParams.maxRating ? parseFloat(searchParams.maxRating) : undefined,
  };

  const [filters, setFilters] = useState<SearchFiltersType>(filtersFromParams);
  const [page, setPage] = useState(parseInt(searchParams.page || '1'));

  // Update filters when search params change
  useEffect(() => {
    setFilters(filtersFromParams);
    setPage(parseInt(searchParams.page || '1'));
  }, [searchParams]);

  const hasActiveFilters = filters.query || filters.genre || filters.year ||
                          filters.minRating !== undefined || filters.maxRating !== undefined;

  // Query for search results
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['search-movies', filters, page],
    queryFn: async () => {
      if (filters.query) {
        return tmdbClient.searchMovies(filters.query, page);
      } else if (hasActiveFilters) {
        return tmdbClient.discoverMovies(filters, page);
      }
      return null;
    },
    enabled: Boolean(hasActiveFilters),
  });

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // Update URL with new search params
    const searchParams: Record<string, string> = {};

    if (filters.query) searchParams.query = filters.query;
    if (filters.genre) searchParams.genre = filters.genre.toString();
    if (filters.year) searchParams.year = filters.year.toString();
    if (filters.minRating !== undefined) searchParams.minRating = filters.minRating.toString();
    if (filters.maxRating !== undefined) searchParams.maxRating = filters.maxRating.toString();

    navigate({
      search: searchParams,
    });

    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate({
      search: {
        ...searchParams,
        page: newPage.toString(),
      },
    });
  };

  const totalPages = data?.total_pages || 1;
  const currentPage = data?.page || 1;

  return (
    <Container size="4" style={{ padding: '3rem 0' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--violet-2) 0%, var(--violet-3) 100%)',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--violet-6)'
      }}>
        <Heading
          size="9"
          mb="3"
          style={{
            background: 'linear-gradient(135deg, var(--violet-11) 0%, var(--violet-9) 50%, var(--pink-9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold',
            letterSpacing: '-0.02em'
          }}
        >
          Buscar Películas
        </Heading>
        <Text
          size="4"
          color="gray"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}
        >
          Encuentra películas por título, género, año o calificación. Usa los filtros para refinar tu búsqueda.
        </Text>
      </div>

      <SearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
      />

      {/* Results */}
      {isLoading && hasActiveFilters && (
        <Loading message="Buscando películas..." />
      )}

      {error && (
        <ErrorMessage
          message={`Error en la búsqueda: ${error.message}`}
          onRetry={() => refetch()}
        />
      )}

      {!hasActiveFilters && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
          borderRadius: 'var(--radius-4)',
          border: '1px solid var(--gray-6)',
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <Text
              size="6"
              weight="bold"
              style={{
                color: 'var(--gray-11)',
                marginBottom: '1rem',
                display: 'block'
              }}
            >
              🎬
            </Text>
            <Text color="gray" size="4" align="center" style={{ lineHeight: '1.6' }}>
              Usa los filtros de arriba para buscar películas
            </Text>
          </div>
        </div>
      )}

      {data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              marginTop: '4rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
              borderRadius: 'var(--radius-4)',
              border: '1px solid var(--gray-6)'
            }}>
              <Flex justify="center" align="center" gap="4">
                <Button
                  variant="soft"
                  color="violet"
                  size="3"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  style={{
                    borderRadius: 'var(--radius-3)',
                    fontWeight: '500'
                  }}
                >
                  <ChevronLeftIcon />
                  Anterior
                </Button>

                <div style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--violet-3)',
                  borderRadius: 'var(--radius-3)',
                  border: '1px solid var(--violet-6)'
                }}>
                  <Text size="3" weight="bold" style={{ color: 'var(--violet-11)' }}>
                    Página {currentPage} de {totalPages}
                  </Text>
                </div>

                <Button
                  variant="soft"
                  color="violet"
                  size="3"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  style={{
                    borderRadius: 'var(--radius-3)',
                    fontWeight: '500'
                  }}
                >
                  Siguiente
                  <ChevronRightIcon />
                </Button>
              </Flex>
            </div>
          )}
        </>
      )}

      {data && data.results.length === 0 && hasActiveFilters && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
          borderRadius: 'var(--radius-4)',
          border: '1px solid var(--gray-6)',
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <Text
              size="6"
              weight="bold"
              style={{
                color: 'var(--gray-11)',
                marginBottom: '1rem',
                display: 'block'
              }}
            >
              🔍
            </Text>
            <Text color="gray" size="4" align="center" style={{ lineHeight: '1.6' }}>
              No se encontraron películas con los filtros seleccionados
            </Text>
            <Text color="gray" size="3" align="center" style={{ marginTop: '0.5rem' }}>
              Intenta ajustar los filtros o buscar algo diferente
            </Text>
          </div>
        </div>
      )}
    </Container>
  );
}
