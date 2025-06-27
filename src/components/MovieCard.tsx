import { Link } from '@tanstack/react-router';
import { Card, Text, Flex, Button, AspectRatio } from '@radix-ui/themes';
import { BookmarkIcon, BookmarkFilledIcon, StarIcon } from '@radix-ui/react-icons';
import type { Movie } from '../types/tmdb';
import { getPosterUrl } from '../lib/tmdb';
import { useWatchlist } from '../hooks/useWatchlist';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const isWatchlisted = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <Card
      size="2"
      className="movie-card glow-on-hover"
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
        border: '1px solid var(--gray-6)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Link
        to="/movie/$movieId"
        params={{ movieId: movie.id.toString() }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{ cursor: 'pointer' }}>
          {/* Poster Image */}
          <AspectRatio ratio={2/3} style={{ position: 'relative', overflow: 'hidden' }}>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-3)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => (e.target as HTMLImageElement).style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => (e.target as HTMLImageElement).style.transform = 'scale(1)'}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, var(--gray-4) 0%, var(--gray-5) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-3)',
                }}
              >
                <Text color="gray" size="2" weight="medium">Sin imagen</Text>
              </div>
            )}
            {/* Gradient overlay for better text readability */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
              borderRadius: 'var(--radius-3)',
              pointerEvents: 'none'
            }} />
          </AspectRatio>

          {/* Movie Info */}
          <div style={{ padding: '1rem' }}>
            <Text
              size={{ initial: '2', sm: '3' }}
              weight="bold"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.3',
                marginBottom: '0.75rem',
                color: 'var(--gray-12)'
              }}
            >
              {movie.title}
            </Text>

            <Flex justify="between" align="center" mb="3">
              <Text
                size={{ initial: '1', sm: '2' }}
                color="gray"
                style={{ fontWeight: '500' }}
              >
                {year}
              </Text>
              <Flex
                align="center"
                gap="1"
                style={{
                  backgroundColor: 'var(--amber-3)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-2)',
                  border: '1px solid var(--amber-6)'
                }}
              >
                <StarIcon color="var(--amber-9)" width="12" height="12" />
                <Text
                  size={{ initial: '1', sm: '2' }}
                  weight="bold"
                  style={{ color: 'var(--amber-11)' }}
                >
                  {movie.vote_average.toFixed(1)}
                </Text>
              </Flex>
            </Flex>

            {/* Overview - Only show on larger screens */}
            {movie.overview && (
              <Text
                size="2"
                color="gray"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.5',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem'
                }}
                className="hidden-mobile"
              >
                {movie.overview}
              </Text>
            )}
          </div>
        </div>
      </Link>

      {/* Watchlist Button */}
      <Button
        variant={isWatchlisted ? "solid" : "ghost"}
        size="1"
        color={isWatchlisted ? "violet" : "gray"}
        onClick={handleWatchlistClick}
        className="watchlist-button"
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: isWatchlisted ? 'var(--violet-9)' : 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          padding: 0,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
      >
        {isWatchlisted ? <BookmarkFilledIcon width="16" height="16" /> : <BookmarkIcon width="16" height="16" />}
      </Button>
    </Card>
  );
}
