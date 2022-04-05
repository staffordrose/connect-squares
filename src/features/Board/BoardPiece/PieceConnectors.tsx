import { Box, Flex } from '@chakra-ui/react';
import { BottomConnectorIcon, TopConnectorIcon } from '@/components';

interface PieceConnectorsProps {
  count: number;
  rotate: number;
  relRotate: number;
}

const PieceConnectors = ({
  count,
  rotate,
  relRotate,
  ...props
}: PieceConnectorsProps) => {
  return (
    <Flex
      {...props}
      position='absolute'
      top={rotate === 0 ? (relRotate === 180 ? '-5%' : 0) : undefined}
      right={rotate === 90 ? (relRotate === 180 ? '-5%' : 0) : undefined}
      bottom={rotate === 180 ? (relRotate === 180 ? '-5%' : 0) : undefined}
      left={rotate === 270 ? (relRotate === 180 ? '-5%' : 0) : undefined}
      zIndex={1}
      gap='12.5%'
      justifyContent='center'
      w='100%'
      h={relRotate === 180 ? '15%' : '12.5%'}
      sx={{
        transformOrigin:
          rotate === 90
            ? `100% 100%`
            : rotate === 270
            ? relRotate === 180
              ? `15% 100%`
              : `12.5%  100%`
            : '',
        transform:
          rotate === 90
            ? relRotate === 180
              ? `rotate(90deg) translateX(85%) translateY(100%)`
              : `rotate(90deg) translateX(87.5%) translateY(100%)`
            : rotate === 270
            ? `rotate(90deg) translateX(0%) translateY(100%)`
            : '',
        transition: 'top 0.3s, right 0.3s, bottom 0.3s, left 0.3s',
      }}
    >
      {[...Array(count)].map((_, i) => (
        <Box
          key={i}
          position='relative'
          w='6.25%'
          h='100%'
          sx={{
            bg: relRotate === 0 || relRotate === 180 ? 'transparent' : 'white',
            transition: 'background-color 0.3s',
          }}
        >
          <TopConnectorIcon
            position='absolute'
            w='100%'
            h='100%'
            sx={{
              transform:
                relRotate === 0 && (rotate === 180 || rotate === 270)
                  ? `rotate(180deg)`
                  : '',
              opacity: relRotate === 0 ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />

          <BottomConnectorIcon
            position='absolute'
            w='100%'
            h='100%'
            color='cyan.800'
            sx={{
              transform:
                relRotate === 180 && (rotate === 0 || rotate === 90)
                  ? `rotate(180deg)`
                  : '',
              opacity: relRotate === 180 ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default PieceConnectors;
