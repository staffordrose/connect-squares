import { Icon } from '@chakra-ui/react';

const MoveXYRotateIcon = (props: any) => (
  <Icon viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M8.1 11c-.1.3-.1.7-.1 1s0 .7.1 1H6v3l-4-4 4-4v3h2.1zM18 16v-3h-2.1c.1-.3.1-.7.1-1s0-.7-.1-1H18V8l4 4-4 4z'
    />
    <circle fill='currentColor' cx='12' cy='12' r='3' />
    <path
      fill='currentColor'
      d='M11 6H8l4-4 4 4h-3v2.1c-.3-.1-.7-.1-1-.1s-.7 0-1 .1V6zM13 18h3l-4 4-4-4h3v-2.1c.3.1.7.1 1 .1s.7 0 1-.1V18z'
    />
  </Icon>
);

export default MoveXYRotateIcon;
