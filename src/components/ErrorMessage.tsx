import { Flex, Text, Button } from '@radix-ui/themes';
import { ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  minHeight?: string;
}

export function ErrorMessage({ 
  message, 
  onRetry,
  minHeight = '50vh' 
}: ErrorMessageProps) {
  return (
    <Flex 
      justify="center" 
      align="center" 
      direction="column"
      gap="4"
      style={{ minHeight }}
    >
      <ExclamationTriangleIcon 
        width="48" 
        height="48" 
        color="var(--red-9)" 
      />
      
      <Text color="red" size="4" align="center" style={{ maxWidth: '400px' }}>
        {message}
      </Text>
      
      {onRetry && (
        <Button onClick={onRetry} variant="soft" color="red">
          <ReloadIcon />
          Reintentar
        </Button>
      )}
    </Flex>
  );
}
