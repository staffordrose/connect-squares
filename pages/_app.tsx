import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import theme from '@/common/theme';
import { toTitleCase } from '@/common/utils';
import { AppBar } from '@/components';
import { VolumeContextProvider } from '@/context';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { category, levelNum } = pageProps;

  const categoryTitle = category ? toTitleCase(category) : '';

  const ariaLabel = category
    ? levelNum
      ? `Go back to ${categoryTitle} category`
      : 'Go back to categories'
    : '';
  const backHref = category ? (levelNum ? `/${category}` : '/') : '';
  const title = category
    ? levelNum
      ? `${categoryTitle} ${levelNum}`
      : categoryTitle
    : '';

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='icon'
          href='/favicon-16x16.png'
          sizes='16x16'
          type='image/png'
        />
        <link
          rel='icon'
          href='/favicon-32x32.png'
          sizes='32x32'
          type='image/png'
        />
        <link
          rel='icon'
          href='/android-chrome-192x192.png'
          sizes='192x192'
          type='image/png'
        />
        <link
          rel='icon'
          href='/android-chrome-512-512.png'
          sizes='512x512'
          type='image/png'
        />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </Head>

      <ChakraProvider theme={theme}>
        <VolumeContextProvider>
          <AppBar
            as={title ? 'header' : undefined}
            aria-label={ariaLabel}
            backHref={backHref}
            title={title}
          />
          <LazyMotion features={domAnimation}>
            <AnimatePresence exitBeforeEnter={true}>
              <m.div
                key={router.asPath}
                className='page-wrap'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Component {...pageProps} />
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </VolumeContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
