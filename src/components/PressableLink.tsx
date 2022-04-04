import { ReactNode } from 'react';
import Link from 'next/link';
import { Button, Text } from '@chakra-ui/react';

interface PressableLinkProps {
  href: string;
  justifyContent?: string;
  pl?: number;
  pr?: number;
  fontSize?: string;
  color?: string;
  bg?: string;
  pressableBg?: string;
  _hover?: { [key: string]: string };
  onClick?: () => void;
  children: ReactNode;
}

const PressableLink = ({
  href,
  justifyContent = 'center',
  pl = 8,
  pr = 8,
  fontSize = '3xl',
  pressableBg = 'cyan.700',
  _hover,
  onClick,
  children,
  ...props
}: PressableLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        as='a'
        variant='unstyled'
        display='inline-flex'
        w='auto'
        minH={16}
        borderRadius='xl'
        fontSize={fontSize}
        bg={pressableBg}
        onClick={() => {
          if (typeof window.navigator.vibrate === 'function')
            window.navigator.vibrate([10]);

          if (typeof onClick === 'function') onClick();
        }}
      >
        <Text
          {...props}
          as='span'
          display='flex'
          justifyContent={justifyContent}
          alignItems='center'
          w='100%'
          minH={16}
          pl={pl}
          pr={pr}
          borderRadius='xl'
          transform='translateY(-6px)'
          _hover={{
            ..._hover,
            transform: 'translateY(-7.5px)',
          }}
          _active={{
            transform: 'translateY(-1.5px)',
          }}
          transition='transform 0.2s'
        >
          {children}
        </Text>
      </Button>
    </Link>
  );
};

export default PressableLink;
