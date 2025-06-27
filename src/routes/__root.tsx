import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Theme, Container, Flex, Heading, Button, Badge } from '@radix-ui/themes';
import { MagnifyingGlassIcon, BookmarkIcon, HomeIcon } from '@radix-ui/react-icons';
import { useWatchlist } from '../hooks/useWatchlist';

function RootComponent() {
  const { watchlistCount } = useWatchlist();

  return (
    <Theme
      appearance="dark"
      accentColor="violet"
      grayColor="mauve"
      radius="large"
      scaling="100%"
      panelBackground="solid"
    >
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, var(--gray-1) 0%, var(--gray-2) 100%)',
        color: 'var(--gray-12)'
      }}>
        {/* Header */}
        <header style={{
          background: 'rgba(var(--gray-2-rgb), 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--gray-6)',
          padding: '1.5rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <Container size="4">
            <Flex justify="between" align="center">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Heading
                  size={{ initial: '5', sm: '7' }}
                  style={{
                    background: 'linear-gradient(135deg, var(--violet-11) 0%, var(--violet-9) 50%, var(--pink-9) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 'bold',
                    letterSpacing: '-0.02em'
                  }}
                >
                  <span className="hidden-mobile">🎬 Explorador de Películas</span>
                  <span className="mobile-only">🎬 Películas</span>
                </Heading>
              </Link>

              <Flex gap={{ initial: '1', sm: '3' }} align="center">
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="3"
                    className="nav-button"
                  >
                    <HomeIcon />
                    <span className="hidden-mobile">Inicio</span>
                  </Button>
                </Link>

                <Link to="/search">
                  <Button
                    variant="ghost"
                    size="3"
                    className="nav-button"
                  >
                    <MagnifyingGlassIcon />
                    <span className="hidden-mobile">Buscar</span>
                  </Button>
                </Link>

                <Link to="/watchlist">
                  <Button
                    variant="ghost"
                    size="3"
                    className="nav-button"
                    style={{ position: 'relative' }}
                  >
                    <BookmarkIcon />
                    <span className="hidden-mobile">Mi Lista</span>
                    {watchlistCount > 0 && (
                      <Badge
                        size="1"
                        color="violet"
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          minWidth: '20px',
                          height: '20px',
                          fontSize: '11px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {watchlistCount > 99 ? '99+' : watchlistCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Container>
        </header>

        {/* Main Content */}
        <main>
          <Outlet />
        </main>

        {/* Footer */}
        <footer style={{
          background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
          borderTop: '1px solid var(--gray-6)',
          padding: '3rem 0',
          marginTop: '6rem'
        }}>
          <Container size="4">
            <Flex justify="center" align="center">
              <p style={{
                color: 'var(--gray-11)',
                margin: 0,
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                Datos proporcionados por{' '}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--violet-11)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--violet-9)'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--violet-11)'}
                >
                  The Movie Database (TMDB)
                </a>
              </p>
            </Flex>
          </Container>
        </footer>
      </div>

      {/* Development tools */}
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </Theme>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  // Ensure client-side rendering
  notFoundComponent: () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Página no encontrada</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--gray-11)' }}>
          La página que buscas no existe.
        </p>
        <Link to="/">
          <Button size="3" color="violet">
            Volver al inicio
          </Button>
        </Link>
      </div>
    )
  }
});
