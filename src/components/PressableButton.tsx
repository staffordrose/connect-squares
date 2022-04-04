import { MutableRefObject, ReactNode } from 'react';
import { Button, Text } from '@chakra-ui/react';

interface PressableButtonProps {
  innerRef?: MutableRefObject<HTMLButtonElement | null>;
  justifyContent?: string;
  minH?: number;
  pl?: number;
  pr?: number;
  fontSize?: string;
  color?: string;
  bg?: string;
  pressableBg?: string;
  _hover?: { [key: string]: string };
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const PressableButton = ({
  innerRef,
  justifyContent = 'center',
  minH = 16,
  pl = 8,
  pr = 8,
  fontSize = '3xl',
  pressableBg = 'cyan.700',
  _hover,
  disabled,
  onClick,
  children,
  ...props
}: PressableButtonProps) => {
  return (
    <Button
      ref={innerRef}
      variant='unstyled'
      minH={minH}
      borderRadius='xl'
      lineHeight={1}
      fontSize={fontSize}
      bg={pressableBg}
      disabled={disabled}
      _hover={{
        '&:not(:disabled) > span': {
          ..._hover,
          transform: 'translateY(-7.5px)',
        },
      }}
      _active={{
        '&:not(:disabled) > span': {
          transform: 'translateY(-1.5px)',
        },
      }}
      _disabled={{
        opacity: 0.375,
        '& > span': {
          cursor: 'not-allowed',
          transform: 'translateY(0px)',
        },
      }}
      onClick={() => {
        if (typeof window.navigator.vibrate === 'function')
          window.navigator.vibrate([10]);
        onClick();
      }}
    >
      <Text
        {...props}
        as='span'
        display='flex'
        justifyContent={justifyContent}
        alignItems='center'
        w='100%'
        minH={minH}
        pl={pl}
        pr={pr}
        borderRadius='xl'
        transform='translateY(-6px)'
        transition='transform 0.2s'
      >
        {children}
      </Text>
    </Button>
  );
};

export default PressableButton;
