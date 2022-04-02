import type { NextPage } from 'next';
import { Flex, Grid, Heading, Image } from '@chakra-ui/react';
import { categories } from '@/common/data';
import { XLButtonLink } from '@/components';

const Home: NextPage = () => {
  return (
    <Grid
      templateRows='auto auto'
      gap={8}
      alignContent='center'
      w='100%'
      minH='calc(100vh - 56px)'
    >
      <Flex
        as='header'
        flexDir='column'
        gap={3}
        justifyContent='center'
        alignItems='center'
        w='100%'
        maxW={1280}
        mx='auto'
        p={[4, null, 6]}
      >
        <Image
          src='/logo.svg'
          alt='Connect Squares Logo'
          width={[160, null, 240]}
          height={[160, null, 240]}
        />

        <Heading as='h1' color='cyan.900'>
          Connect Squares
        </Heading>
      </Flex>

      <Flex
        as='main'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        gap={[4, null, 6]}
        w='100%'
        maxW={1280}
        mx='auto'
        px={[4, null, 6]}
        py={8}
      >
        {categories.map((category) => (
          <XLButtonLink
            key={category}
            href={`/${category.toLowerCase()}`}
            color='cyan.700'
            bg='cyan.100'
            _hover={{ bg: 'cyan.50' }}
          >
            {category}
          </XLButtonLink>
        ))}
      </Flex>
    </Grid>
  );
};

export default Home;
