import { extendTheme } from '@chakra-ui/react';

const theme = {
  colors: {
    brown: {
      '50': '#fbfaf5',
      '100': '#f9efc4',
      '200': '#f3da8d',
      '300': '#e0b45a',
      '400': '#c88933',
      '500': '#ad691b',
      '600': '#8f4f11',
      '700': '#6e3b0f',
      '800': '#4b290d',
      '900': '#321909',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Roboto", sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        minW: 360,
        minH: '100vh',
        bg: 'cyan.100',
        bgGradient: 'linear(to-tr, cyan.100, cyan.200)',
      },
    },
  },
};

export default extendTheme(theme);
