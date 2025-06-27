import { Card, Text, Flex, Avatar, ScrollArea } from '@radix-ui/themes';
import type { Cast } from '../types/tmdb';
import { getImageUrl } from '../lib/tmdb';

interface CastListProps {
  cast: Cast[];
  maxItems?: number;
}

export function CastList({ cast, maxItems = 10 }: CastListProps) {
  const displayCast = cast.slice(0, maxItems);

  if (displayCast.length === 0) {
    return (
      <Text color="gray" size="3">
        No hay información del reparto disponible
      </Text>
    );
  }

  return (
    <ScrollArea scrollbars="horizontal" style={{ width: '100%' }}>
      <Flex gap="4" style={{ minWidth: 'max-content', paddingBottom: '1rem' }}>
        {displayCast.map((actor) => (
          <Card key={actor.id} size="2" style={{ minWidth: '150px', maxWidth: '150px' }}>
            <Flex direction="column" align="center" gap="3">
              <Avatar
                size="5"
                src={getImageUrl(actor.profile_path, 'w200') || undefined}
                fallback={actor.name.charAt(0)}
                radius="medium"
              />
              
              <div style={{ textAlign: 'center' }}>
                <Text size="3" weight="medium" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.3',
                  marginBottom: '0.25rem'
                }}>
                  {actor.name}
                </Text>
                
                <Text size="2" color="gray" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.3'
                }}>
                  {actor.character}
                </Text>
              </div>
            </Flex>
          </Card>
        ))}
      </Flex>
    </ScrollArea>
  );
}
