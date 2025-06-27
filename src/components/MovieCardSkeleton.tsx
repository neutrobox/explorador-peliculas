import { Card, AspectRatio, Flex } from '@radix-ui/themes';

export function MovieCardSkeleton() {
  return (
    <Card size="2" style={{ height: '100%' }}>
      {/* Poster Skeleton */}
      <AspectRatio ratio={2/3}>
        <div
          className="loading-pulse"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--gray-4)',
            borderRadius: 'var(--radius-2)',
          }}
        />
      </AspectRatio>

      {/* Content Skeleton */}
      <div style={{ padding: '0.75rem' }}>
        {/* Title */}
        <div
          className="loading-pulse"
          style={{
            height: '1.2rem',
            backgroundColor: 'var(--gray-4)',
            borderRadius: 'var(--radius-1)',
            marginBottom: '0.5rem',
          }}
        />
        <div
          className="loading-pulse"
          style={{
            height: '1.2rem',
            width: '70%',
            backgroundColor: 'var(--gray-4)',
            borderRadius: 'var(--radius-1)',
            marginBottom: '0.75rem',
          }}
        />

        {/* Year and Rating */}
        <Flex justify="between" align="center" mb="2">
          <div
            className="loading-pulse"
            style={{
              height: '1rem',
              width: '3rem',
              backgroundColor: 'var(--gray-4)',
              borderRadius: 'var(--radius-1)',
            }}
          />
          <div
            className="loading-pulse"
            style={{
              height: '1rem',
              width: '2.5rem',
              backgroundColor: 'var(--gray-4)',
              borderRadius: 'var(--radius-1)',
            }}
          />
        </Flex>

        {/* Overview lines */}
        <div className="hidden-mobile">
          <div
            className="loading-pulse"
            style={{
              height: '0.9rem',
              backgroundColor: 'var(--gray-4)',
              borderRadius: 'var(--radius-1)',
              marginBottom: '0.25rem',
            }}
          />
          <div
            className="loading-pulse"
            style={{
              height: '0.9rem',
              backgroundColor: 'var(--gray-4)',
              borderRadius: 'var(--radius-1)',
              marginBottom: '0.25rem',
            }}
          />
          <div
            className="loading-pulse"
            style={{
              height: '0.9rem',
              width: '60%',
              backgroundColor: 'var(--gray-4)',
              borderRadius: 'var(--radius-1)',
            }}
          />
        </div>
      </div>
    </Card>
  );
}

interface MovieGridSkeletonProps {
  count?: number;
}

export function MovieGridSkeleton({ count = 20 }: MovieGridSkeletonProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem',
      width: '100%'
    }}>
      {Array.from({ length: count }, (_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
