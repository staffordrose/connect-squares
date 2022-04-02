import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/common/theme';
import { VolumeContextProvider } from '@/context';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <ChakraProvider theme={theme}>
        <VolumeContextProvider>
          <Component {...pageProps} key={router.asPath} />
        </VolumeContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
