import { Grid, Text, Flex } from '@radix-ui/themes';
import type { Movie } from '../types/tmdb';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  emptyMessage?: string;
}

export function MovieGrid({ movies, emptyMessage = 'No se encontraron películas' }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '30vh' }}>
        <Text color="gray" size="4">
          {emptyMessage}
        </Text>
      </Flex>
    );
  }

  return (
    <Grid 
      columns={{ 
        initial: '2', 
        xs: '2',
        sm: '3', 
        md: '4', 
        lg: '5',
        xl: '6'
      }} 
      gap="4"
      width="100%"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
}
