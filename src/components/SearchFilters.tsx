import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  Flex, 
  Text, 
  TextField, 
  Select, 
  Slider, 
  Button,
  Separator 
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { tmdbClient } from '../lib/tmdb';
import type { SearchFilters as SearchFiltersType } from '../types/tmdb';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

export function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);
  
  // Get genres for the dropdown
  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbClient.getGenres(),
  });

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onSearch();
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFiltersType = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onSearch();
  };

  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  return (
    <Card
      size="3"
      className="glass-effect"
      style={{
        marginBottom: '3rem',
        background: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-3) 100%)',
        border: '1px solid var(--gray-6)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Flex direction="column" gap="5">
        {/* Search Query */}
        <div>
          <Text
            size="4"
            weight="bold"
            mb="3"
            as="div"
            style={{
              background: 'linear-gradient(135deg, var(--violet-11) 0%, var(--violet-9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Buscar películas
          </Text>
          <TextField.Root
            placeholder="Escribe el título de una película..."
            value={localFilters.query || ''}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            size="3"
            style={{
              backgroundColor: 'var(--gray-3)',
              border: '2px solid var(--gray-6)',
              borderRadius: 'var(--radius-4)',
              transition: 'all 0.2s ease'
            }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="18" width="18" color="var(--violet-9)" />
            </TextField.Slot>
          </TextField.Root>
        </div>

        <Separator size="4" style={{ backgroundColor: 'var(--violet-6)' }} />

        {/* Filters */}
        <Flex direction={{ initial: 'column', md: 'row' }} gap="6">
          {/* Genre Filter */}
          <div style={{ flex: 1 }}>
            <Text
              size="3"
              weight="bold"
              mb="3"
              as="div"
              style={{ color: 'var(--gray-12)' }}
            >
              Género
            </Text>
            <Select.Root
              value={localFilters.genre?.toString() || 'all'}
              onValueChange={(value) =>
                handleFilterChange('genre', value === 'all' ? undefined : parseInt(value))
              }
            >
              <Select.Trigger
                placeholder="Todos los géneros"
                style={{
                  backgroundColor: 'var(--gray-3)',
                  border: '2px solid var(--gray-6)',
                  borderRadius: 'var(--radius-3)',
                  minHeight: '2.75rem'
                }}
              />
              <Select.Content
                style={{
                  backgroundColor: 'var(--gray-2)',
                  border: '1px solid var(--gray-6)',
                  borderRadius: 'var(--radius-3)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Select.Item value="all">Todos los géneros</Select.Item>
                {genresData?.genres.map((genre) => (
                  <Select.Item key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>

          {/* Year Filter */}
          <div style={{ flex: 1 }}>
            <Text
              size="3"
              weight="bold"
              mb="3"
              as="div"
              style={{ color: 'var(--gray-12)' }}
            >
              Año: <span style={{ color: 'var(--violet-11)', fontWeight: 'bold' }}>
                {localFilters.year || 'Cualquiera'}
              </span>
            </Text>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--gray-3)',
              borderRadius: 'var(--radius-3)',
              border: '1px solid var(--gray-6)'
            }}>
              <Slider
                value={[localFilters.year || currentYear]}
                onValueChange={([value]) => handleFilterChange('year', value)}
                min={minYear}
                max={currentYear}
                step={1}
                color="violet"
              />
              <Flex justify="between" mt="2">
                <Text size="2" color="gray" weight="medium">{minYear}</Text>
                <Text size="2" color="gray" weight="medium">{currentYear}</Text>
              </Flex>
            </div>
          </div>
        </Flex>

        {/* Rating Filter */}
        <div>
          <Text
            size="3"
            weight="bold"
            mb="3"
            as="div"
            style={{ color: 'var(--gray-12)' }}
          >
            Calificación: <span style={{ color: 'var(--violet-11)', fontWeight: 'bold' }}>
              {localFilters.minRating || 0} - {localFilters.maxRating || 10}
            </span>
          </Text>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--gray-3)',
            borderRadius: 'var(--radius-3)',
            border: '1px solid var(--gray-6)'
          }}>
            <Slider
              value={[localFilters.minRating || 0, localFilters.maxRating || 10]}
              onValueChange={([min, max]) => {
                handleFilterChange('minRating', min);
                handleFilterChange('maxRating', max);
              }}
              min={0}
              max={10}
              step={0.1}
              color="violet"
            />
            <Flex justify="between" mt="2">
              <Text size="2" color="gray" weight="medium">0</Text>
              <Text size="2" color="gray" weight="medium">10</Text>
            </Flex>
          </div>
        </div>

        <Separator size="4" style={{ backgroundColor: 'var(--violet-6)' }} />

        {/* Action Buttons */}
        <Flex gap="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            onClick={handleClearFilters}
            size="3"
            style={{
              borderRadius: 'var(--radius-3)',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            <Cross2Icon />
            Limpiar
          </Button>
          <Button
            onClick={handleApplyFilters}
            size="3"
            color="violet"
            style={{
              borderRadius: 'var(--radius-3)',
              fontWeight: '600',
              background: 'linear-gradient(135deg, var(--violet-9) 0%, var(--violet-10) 100%)',
              boxShadow: '0 4px 12px rgba(var(--violet-9-rgb), 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <MagnifyingGlassIcon />
            Buscar
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
