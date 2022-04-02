import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { Piece } from '@/common/types';
import { toTitleCase } from '@/common/utils';
import { Header } from '@/components';
import { Board } from '@/features';

const Level: NextPage<{
  category: string;
  levelNum: number;
  level: Piece[];
}> = ({ category, levelNum, level }) => {
  const onComplete = () => {
    if (typeof window !== 'undefined') {
      const lsLevels = localStorage.getItem('cs-levels');
      let levels = lsLevels ? JSON.parse(lsLevels) : {};

      levels[category] = levels?.[category]
        ? levels[category]
        : [...Array(100)].map(() => null);

      levels[category][levelNum - 1] = new Date();
      localStorage.setItem('cs-levels', JSON.stringify(levels));
    }
  };

  const categoryTitle = toTitleCase(category);

  return (
    <>
      <Head>
        <title>
          Level {levelNum} | {categoryTitle} | Connect Squares
        </title>
        <meta
          name='description'
          content={`Complete level ${levelNum} to advance!`}
        />
      </Head>

      <Header
        aria-label={`Go back to ${categoryTitle} category`}
        backHref={`/${category}`}
        title={`${categoryTitle} ${levelNum}`}
      />

      <Box
        as='main'
        w='100%'
        maxW={1280}
        mx='auto'
        px={[4, null, 6]}
        py={[8, null, 12]}
      >
        <Board
          level={level}
          onComplete={onComplete}
          nextHref={levelNum < 100 ? `/${category}/${levelNum + 1}` : undefined}
        />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fs = require('fs');
  const path = require('path');

  const category = context?.params?.category;
  const levelNum =
    typeof context?.params?.level === 'string'
      ? parseInt(context.params.level)
      : 1;

  let level = [];

  if (category) {
    try {
      level = fs.readFileSync(
        path.join(process.cwd(), `/public/levels/${category}/${levelNum}.json`),
        'utf8'
      );
      level = JSON.parse(level);
    } catch (error: any) {
      console.log('getServerSideProps error: ', error);
    }
  }

  if (!level.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
      levelNum,
      level,
    },
  };
};

export default Level;
