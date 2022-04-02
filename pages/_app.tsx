import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/common/theme';
import { VolumeContextProvider } from '@/context';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <VolumeContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} key={router.asPath} />
      </ChakraProvider>
    </VolumeContextProvider>
  );
}

export default MyApp;
