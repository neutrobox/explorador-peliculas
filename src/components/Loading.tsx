import { Flex, Spinner, Text } from '@radix-ui/themes';

interface LoadingProps {
  message?: string;
  size?: '1' | '2' | '3';
  minHeight?: string;
}

export function Loading({ 
  message = 'Cargando...', 
  size = '3',
  minHeight = '50vh' 
}: LoadingProps) {
  return (
    <Flex 
      justify="center" 
      align="center" 
      direction="column"
      gap="3"
      style={{ minHeight }}
    >
      <Spinner size={size} />
      <Text color="gray" size="3">
        {message}
      </Text>
    </Flex>
  );
}
