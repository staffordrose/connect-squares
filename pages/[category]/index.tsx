import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Center, Grid, Spinner } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { categories } from '@/common/data';
import { toTitleCase } from '@/common/utils';
import { Header, XLButton } from '@/components';

const levels = [...Array(100)];

const Category: NextPage<{
  category: string;
}> = ({ category }) => {
  const router = useRouter();

  const [progress, setProgress] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lsLevels = localStorage.getItem('cs-levels');
      let levels = lsLevels ? JSON.parse(lsLevels) : {};

      if (levels?.[category]) {
        setProgress(levels[category]);
      } else {
        setProgress([...Array(100)].map(() => null));
      }
    }
  }, [category]);

  if (!progress.length) {
    return (
      <Center w='100%' h='100vh'>
        <Spinner size='xl' color='cyan.500' speed='0.65s' thickness='4px' />
      </Center>
    );
  }

  const categoryTitle = toTitleCase(category);

  return (
    <>
      <Head>
        <title>{categoryTitle} Levels | Connect Squares</title>
        <meta
          name='description'
          content={`Choose a ${categoryTitle} level to play. You can play up to 100 levels, and they get more difficult as you go!`}
        />
      </Head>

      <Header
        aria-label={`Go back to categories`}
        backHref='/'
        title={categoryTitle}
      />

      <Box
        as='main'
        w='100%'
        maxW={1280}
        mx='auto'
        px={[4, null, 6]}
        py={[8, null, 12]}
      >
        <Grid
          templateColumns={[
            'repeat(3, 1fr)',
            'repeat(auto-fit, minmax(120px, 1fr))',
          ]}
          gap={[4, null, 6]}
          mb={16}
        >
          {levels.map((_, i) => {
            const isCompleted =
              progress[i] && dayjs(progress[i]).isValid() ? true : false;
            const isPrevCompleted = !isCompleted
              ? progress[i - 1] && dayjs(progress[i - 1]).isValid()
                ? true
                : false
              : false;
            const isUnlocked = i === 0 || isCompleted || isPrevCompleted;

            return (
              <XLButton
                key={i}
                color={
                  isCompleted
                    ? 'orange.700'
                    : isUnlocked
                    ? 'yellow.700'
                    : 'cyan.700'
                }
                bg={
                  isCompleted
                    ? 'orange.100'
                    : isUnlocked
                    ? 'yellow.100'
                    : 'cyan.100'
                }
                _hover={{
                  bg: isCompleted
                    ? 'orange.50'
                    : isUnlocked
                    ? 'yellow.50'
                    : 'cyan.100',
                }}
                disabled={!isUnlocked}
                onClick={() => router.push(`/${category}/${i + 1}`)}
              >
                {i + 1}
              </XLButton>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.params?.category as string;

  if (!categories.map((c) => c.toLowerCase()).includes(category)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
    },
  };
};

export default Category;