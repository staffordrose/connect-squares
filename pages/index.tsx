import { ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Grid, Heading, Icon, Image, Text } from '@chakra-ui/react';
import type { As } from '@chakra-ui/react';
import { categories } from '@/common/data';
import { XLButtonLink } from '@/components';
import { CatExpertIcon, CatHardIcon, CatNormalIcon } from '@/components';

const categoryIcons: { [category: string]: ReactNode } = {
  Normal: CatNormalIcon,
  Hard: CatHardIcon,
  Expert: CatExpertIcon,
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to Connect Squares</title>
        <meta
          name='description'
          content='Connect Squares is a puzzle game where you connect all blocks via their links. Choose from three categories that increase in difficulty: Normal, Hard and Expert.'
        />
      </Head>

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
          gap={[4, null, 6]}
          w='100%'
          maxW={260}
          mx='auto'
          px={[4, null, 6]}
          py={8}
        >
          {categories.map((category) => (
            <XLButtonLink
              key={category}
              href={`/${category.toLowerCase()}`}
              pl={4}
              justifyContent='flex-start'
              color='cyan.700'
              bg='cyan.100'
              _hover={{ bg: 'cyan.50' }}
            >
              <Icon as={categoryIcons[category] as As} boxSize={12} />
              <Text as='span' ml={4}>
                {category}
              </Text>
            </XLButtonLink>
          ))}
        </Flex>
      </Grid>
    </>
  );
};

export default Home;
