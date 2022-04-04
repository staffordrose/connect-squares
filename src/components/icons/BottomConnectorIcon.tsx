import { Icon } from '@chakra-ui/react';

function BottomConnectorIcon(props: any) {
  return (
    <Icon {...props} viewBox='0 0 8 24' preserveAspectRatio='none'>
      <path fill='white' d='M8 4v16H0V4c0-2.2 1.8-4 4-4s4 1.8 4 4z' />
      <circle fill='currentColor' cx='4' cy='20' r='4' />
    </Icon>
  );
}

export default BottomConnectorIcon;
