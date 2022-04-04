import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
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
      </Head>

      <ChakraProvider theme={theme}>
        <VolumeContextProvider>
          <AppBar
            as={title ? 'header' : undefined}
            aria-label={ariaLabel}
            backHref={backHref}
            title={title}
          />
          <Component {...pageProps} key={router.asPath} />
        </VolumeContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
