import { createFileRoute } from '@tanstack/react-router';
import { Container, Heading, Text, Flex, Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon, BookmarkIcon } from '@radix-ui/react-icons';
import { Link } from '@tanstack/react-router';
import { useWatchlist } from '../hooks/useWatchlist';
import { MovieGrid } from '../components';

export const Route = createFileRoute('/watchlist')({
  component: Watchlist,
});

function Watchlist() {
  const { watchlist, watchlistCount } = useWatchlist();

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
          Mi Lista de Películas
        </Heading>

        <Flex
          align="center"
          justify="center"
          gap="3"
          style={{
            backgroundColor: 'var(--violet-3)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-4)',
            border: '1px solid var(--violet-6)',
            display: 'inline-flex'
          }}
        >
          <BookmarkIcon width="20" height="20" color="var(--violet-9)" />
          <Text
            size="4"
            weight="bold"
            style={{ color: 'var(--violet-11)' }}
          >
            {watchlistCount} {watchlistCount === 1 ? 'película guardada' : 'películas guardadas'}
          </Text>
        </Flex>
      </div>

      {watchlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
          borderRadius: 'var(--radius-5)',
          border: '1px solid var(--gray-6)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--violet-3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              border: '2px solid var(--violet-6)'
            }}>
              <BookmarkIcon width="40" height="40" color="var(--violet-9)" />
            </div>

            <Text
              size="6"
              weight="bold"
              align="center"
              mb="3"
              style={{ color: 'var(--gray-12)' }}
            >
              Tu lista está vacía
            </Text>

            <Text
              color="gray"
              size="4"
              align="center"
              style={{
                maxWidth: '500px',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}
            >
              Explora películas y añádelas a tu lista personal para verlas más tarde.
              Puedes añadir películas haciendo clic en el ícono de marcador.
            </Text>

            <Flex gap="4" justify="center">
              <Link to="/">
                <Button
                  size="3"
                  color="violet"
                  style={{
                    borderRadius: 'var(--radius-3)',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, var(--violet-9) 0%, var(--violet-10) 100%)',
                    boxShadow: '0 4px 12px rgba(var(--violet-9-rgb), 0.3)'
                  }}
                >
                  Ver Películas Populares
                </Button>
              </Link>

              <Link to="/search">
                <Button
                  variant="soft"
                  size="3"
                  color="violet"
                  style={{
                    borderRadius: 'var(--radius-3)',
                    fontWeight: '500'
                  }}
                >
                  <MagnifyingGlassIcon />
                  Buscar Películas
                </Button>
              </Link>
            </Flex>
          </div>
        </div>
      ) : (
        <>
          <MovieGrid
            movies={watchlist}
            emptyMessage="No hay películas en tu lista"
          />

          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
            borderRadius: 'var(--radius-4)',
            border: '1px solid var(--gray-6)',
            textAlign: 'center'
          }}>
            <Text
              size="4"
              weight="medium"
              mb="3"
              style={{ color: 'var(--gray-11)' }}
            >
              ¿Buscas más películas para añadir a tu lista?
            </Text>
            <Link to="/search">
              <Button
                variant="soft"
                size="3"
                color="violet"
                style={{
                  borderRadius: 'var(--radius-3)',
                  fontWeight: '500'
                }}
              >
                <MagnifyingGlassIcon />
                Buscar más películas
              </Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}
