import type { NextPage } from 'next';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Header, XLButtonLink } from '@/components';

const Error: NextPage = () => {
  return (
    <>
      <Header aria-label={`Go back to categories`} backHref='/' />

      <Flex
        as='main'
        flexDir='column'
        gap={4}
        justifyContent='center'
        alignItems='center'
        w='100%'
        maxW={1280}
        minH='calc(100vh - 96px - 56px)'
        mx='auto'
        px={[4, null, 6]}
        py={[8, null, 12]}
      >
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

        <Text textAlign='center'>{`Sorry! The page you are looking for doesn't exist or is temporarily unavailable.`}</Text>

        <Box mt={8}>
          <XLButtonLink
            href='/'
            color='cyan.700'
            bg='cyan.100'
            _hover={{
              bg: 'cyan.50',
            }}
          >
            Homepage
          </XLButtonLink>
        </Box>
      </Flex>
    </>
  );
};

export default Error;
