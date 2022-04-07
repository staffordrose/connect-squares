import { ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import type { As } from '@chakra-ui/react';
import useSound from 'use-sound';
import { categories } from '@/common/data';
import { PressableLink } from '@/components';
import { CatExpertIcon, CatHardIcon, CatNormalIcon } from '@/components';
import { useVolumeContext } from '@/context';

const categoryIcons: { [category: string]: ReactNode } = {
  Normal: CatNormalIcon,
  Hard: CatHardIcon,
  Expert: CatExpertIcon,
};

const Home: NextPage = () => {
  const { isMuted } = useVolumeContext();
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.625 });

  return (
    <>
      <Head>
        <title>Welcome to Connect Squares</title>
        <meta
          name='description'
          content='Connect Squares is a puzzle game where you connect all blocks via their links. Choose from three categories that increase in difficulty: Normal, Hard and Expert.'
        />
      </Head>

      <Flex
        flexDir='column'
        gap={3}
        justifyContent='space-evenly'
        alignItems='center'
        w='100%'
        maxW={1280}
        minH={['calc(100vh - 80px)', 'calc(100vh - 96px)']}
        mx='auto'
        px={[4, 6]}
        pb={['80px', '96px']}
      >
        <Flex
          as='header'
          flexDir='column'
          gap={3}
          justifyContent='center'
          alignItems='center'
          w='100%'
        >
          <Image
            src='/logo.svg'
            alt='Connect Squares Logo'
            w={[228, 266]}
            h={[177.6, 207.2]}
          />

          <Heading as='h1' color='cyan.900'>
            Connect Squares
          </Heading>
        </Flex>

        <Flex
          as='main'
          flexDir='column'
          justifyContent='center'
          gap={[4, 6]}
          w='100%'
          maxW={[220, 240]}
        >
          {categories.map((category) => (
            <PressableLink
              key={category}
              href={`/${category.toLowerCase()}`}
              pl={4}
              justifyContent='flex-start'
              fontSize='2xl'
              color='cyan.50'
              bg='cyan.500'
              onClick={() => {
                !isMuted && playClick();
              }}
            >
              <Icon as={categoryIcons[category] as As} boxSize={12} />
              <Text as='span' ml={4}>
                {category}
              </Text>
            </PressableLink>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
