import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Container, Heading, Flex, Button, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { tmdbClient } from '../lib/tmdb';
import { Loading, ErrorMessage, MovieGrid } from '../components';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['popular-movies', page],
    queryFn: () => tmdbClient.getPopularMovies(page),
  });

  if (isLoading) {
    return (
      <Container size="4" style={{ padding: '2rem 0' }}>
        <Loading message="Cargando películas populares..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="4" style={{ padding: '2rem 0' }}>
        <ErrorMessage
          message={`Error al cargar las películas: ${error.message}`}
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  const totalPages = data?.total_pages || 1;
  const currentPage = data?.page || 1;

  return (
    <Container size="4" style={{ padding: '3rem 0' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, var(--violet-2) 0%, var(--violet-3) 100%)',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--violet-6)'
      }}>
        <Heading
          size="9"
          mb="4"
          style={{
            background: 'linear-gradient(135deg, var(--violet-11) 0%, var(--violet-9) 50%, var(--pink-9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold',
            letterSpacing: '-0.02em'
          }}
        >
          Películas Populares
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
          Descubre las películas más populares del momento. Explora, guarda en tu lista y encuentra tu próxima película favorita.
        </Text>
      </div>

      <MovieGrid movies={data?.results || []} />

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
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
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
              onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
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
    </Container>
  );
}
