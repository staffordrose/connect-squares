import { Box, Flex } from '@chakra-ui/react';

interface PieceConnectorsProps {
  bottom?: number;
  count: number;
  rotate: number;
}

const PieceConnectors = ({ count, rotate, ...props }: PieceConnectorsProps) => {
  return (
    <Flex
      {...props}
      position='absolute'
      gap='12.5%'
      justifyContent='center'
      w='100%'
      h='50%'
      sx={{
        transformOrigin:
          rotate === 90 ? `100% 100%` : rotate === 270 ? `0% 100%` : `50% 50%`,
        transform:
          rotate === 90
            ? `rotate(90deg) translateX(50%) translateY(100%)`
            : rotate === 180
            ? `rotate(180deg)`
            : rotate === 270
            ? `rotate(270deg) translateX(-50%) translateY(100%)`
            : ``,
      }}
    >
      {[...Array(count)].map((_, i) => (
        <Box key={i} w='6.25%' h='100%' bg='white' boxShadow='xs' />
      ))}
    </Flex>
  );
};

export default PieceConnectors;
