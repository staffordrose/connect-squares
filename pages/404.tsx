import type { NextPage } from 'next';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import useSound from 'use-sound';
import { PressableLink } from '@/components';
import { useVolumeContext } from '@/context';

const Error: NextPage = () => {
  const { isMuted } = useVolumeContext();
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.625 });

  return (
    <Flex
      flexDir='column'
      gap={4}
      justifyContent='center'
      alignItems='center'
      w='100%'
      maxW={1280}
      minH={['calc(100vh - 80px - 56px)', 'calc(100vh - 96px - 56px)']}
      mx='auto'
      px={[4, null, 6]}
      py={[8, null, 12]}
    >
      <Box as='header'>
        <Heading
          as='h1'
          lineHeight={1}
          textAlign='center'
          fontSize='128px'
          color='cyan.900'
        >
          404
        </Heading>

        <Heading
          as='h2'
          lineHeight={1}
          textAlign='center'
          fontSize='2xl'
          color='cyan.900'
        >
          Page not found
        </Heading>
      </Box>

      <Flex
        as='main'
        flexDir='column'
        gap={6}
        justifyContent='center'
        alignItems='center'
      >
        <Text textAlign='center'>{`Sorry! The page you are looking for doesn't exist or is temporarily unavailable.`}</Text>

        <PressableLink
          href='/'
          fontSize='2xl'
          color='cyan.50'
          bg='cyan.500'
          onClick={() => {
            !isMuted && playClick();
          }}
        >
          Homepage
        </PressableLink>
      </Flex>
    </Flex>
  );
};

export default Error;
