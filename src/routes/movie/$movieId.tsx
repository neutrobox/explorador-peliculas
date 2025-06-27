import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  Card,
  AspectRatio,
  Separator,
  Grid
} from '@radix-ui/themes';
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  StarIcon,
  ClockIcon,
  CalendarIcon
} from '@radix-ui/react-icons';
import { tmdbClient, getBackdropUrl, getPosterUrl } from '../../lib/tmdb';
import { useWatchlist } from '../../hooks/useWatchlist';
import { Loading, ErrorMessage, CastList } from '../../components';

export const Route = createFileRoute('/movie/$movieId')({
  component: MovieDetails,
});

function MovieDetails() {
  const { movieId } = Route.useParams();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Get movie details
  const { data: movie, isLoading: movieLoading, error: movieError } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => tmdbClient.getMovieDetails(parseInt(movieId)),
  });

  // Get movie credits
  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => tmdbClient.getMovieCredits(parseInt(movieId)),
    enabled: !!movie,
  });

  if (movieLoading) {
    return (
      <Container size="4" style={{ padding: '2rem 0' }}>
        <Loading message="Cargando detalles de la película..." />
      </Container>
    );
  }

  if (movieError || !movie) {
    return (
      <Container size="4" style={{ padding: '2rem 0' }}>
        <ErrorMessage
          message="Error al cargar los detalles de la película"
        />
      </Container>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const isWatchlisted = isInWatchlist(movie.id);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  return (
    <div>
      {/* Backdrop Header */}
      {backdropUrl && (
        <div style={{
          position: 'relative',
          height: '50vh',
          minHeight: '400px',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'end'
        }}>
          <Container size="4" style={{ padding: '2rem 0' }}>
            <Flex
              align={{ initial: 'center', md: 'end' }}
              direction={{ initial: 'column', md: 'row' }}
              gap={{ initial: '4', md: '6' }}
            >
              {/* Poster */}
              {posterUrl && (
                <div style={{ flexShrink: 0 }}>
                  <AspectRatio
                    ratio={2/3}
                    style={{
                      width: window.innerWidth < 768 ? '150px' : '200px'
                    }}
                  >
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-3)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }}
                    />
                  </AspectRatio>
                </div>
              )}

              {/* Title and basic info */}
              <div style={{
                color: 'white',
                flex: 1,
                textAlign: window.innerWidth < 768 ? 'center' : 'left'
              }}>
                <Heading
                  size={{ initial: '6', md: '8' }}
                  mb="2"
                  style={{ color: 'white' }}
                >
                  {movie.title}
                </Heading>

                {movie.tagline && (
                  <Text
                    size={{ initial: '3', md: '4' }}
                    style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}
                    mb="3"
                  >
                    {movie.tagline}
                  </Text>
                )}

                <Flex
                  gap={{ initial: '2', md: '4' }}
                  align="center"
                  justify={{ initial: 'center', md: 'start' }}
                  mb="4"
                  wrap="wrap"
                >
                  <Flex align="center" gap="1">
                    <StarIcon color="orange" />
                    <Text size={{ initial: '2', md: '3' }} weight="medium" style={{ color: 'white' }}>
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </Flex>

                  <Flex align="center" gap="1">
                    <CalendarIcon />
                    <Text size={{ initial: '2', md: '3' }} style={{ color: 'white' }}>{year}</Text>
                  </Flex>

                  <Flex align="center" gap="1">
                    <ClockIcon />
                    <Text size={{ initial: '2', md: '3' }} style={{ color: 'white' }}>{runtime}</Text>
                  </Flex>
                </Flex>

                <Button
                  size={{ initial: '2', md: '3' }}
                  onClick={() => toggleWatchlist(movie)}
                  variant={isWatchlisted ? "solid" : "outline"}
                  style={{
                    backgroundColor: isWatchlisted ? 'var(--blue-9)' : 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white'
                  }}
                >
                  {isWatchlisted ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                  <span className="hidden-mobile">
                    {isWatchlisted ? 'En mi lista' : 'Añadir a mi lista'}
                  </span>
                </Button>
              </div>
            </Flex>
          </Container>
        </div>
      )}

      {/* Main Content */}
      <Container size="4" style={{ padding: '2rem 0' }}>
        <Grid columns={{ initial: '1', lg: '3' }} gap="6">
          {/* Main Info */}
          <div style={{ gridColumn: window.innerWidth >= 1024 ? 'span 2' : 'span 1' }}>
            {/* Overview */}
            <Card size="3" mb="4">
              <Heading size="5" mb="3">Sinopsis</Heading>
              <Text size="3" style={{ lineHeight: '1.6' }}>
                {movie.overview || 'No hay sinopsis disponible.'}
              </Text>
            </Card>

            {/* Cast */}
            {credits && credits.cast.length > 0 && (
              <Card size="3">
                <Heading size="5" mb="3">Reparto Principal</Heading>
                {creditsLoading ? (
                  <Loading message="Cargando reparto..." size="2" minHeight="200px" />
                ) : (
                  <CastList cast={credits.cast} />
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card size="3">
              <Heading size="4" mb="4">Información</Heading>

              {/* Genres */}
              {movie.genres.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <Text size="2" weight="medium" color="gray" mb="2" as="div">
                    Géneros
                  </Text>
                  <Flex gap="2" wrap="wrap">
                    {movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="soft">
                        {genre.name}
                      </Badge>
                    ))}
                  </Flex>
                </div>
              )}

              <Separator size="4" my="3" />

              {/* Release Date */}
              <div style={{ marginBottom: '1rem' }}>
                <Text size="2" weight="medium" color="gray" mb="1" as="div">
                  Fecha de estreno
                </Text>
                <Text size="3">
                  {movie.release_date ?
                    new Date(movie.release_date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'No disponible'
                  }
                </Text>
              </div>

              {/* Runtime */}
              <div style={{ marginBottom: '1rem' }}>
                <Text size="2" weight="medium" color="gray" mb="1" as="div">
                  Duración
                </Text>
                <Text size="3">{runtime}</Text>
              </div>

              {/* Rating */}
              <div style={{ marginBottom: '1rem' }}>
                <Text size="2" weight="medium" color="gray" mb="1" as="div">
                  Calificación
                </Text>
                <Flex align="center" gap="2">
                  <StarIcon color="orange" />
                  <Text size="3" weight="medium">
                    {movie.vote_average.toFixed(1)}/10
                  </Text>
                  <Text size="2" color="gray">
                    ({movie.vote_count.toLocaleString()} votos)
                  </Text>
                </Flex>
              </div>

              {/* Status */}
              <div>
                <Text size="2" weight="medium" color="gray" mb="1" as="div">
                  Estado
                </Text>
                <Text size="3">{movie.status}</Text>
              </div>
            </Card>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
