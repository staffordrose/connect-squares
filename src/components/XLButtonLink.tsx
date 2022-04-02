import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/react';

interface XLButtonLinkProps {
  href: string;
  color?: string;
  bg?: string;
  _hover?: { [key: string]: string };
  children: ReactNode;
}

const XLButtonLink = ({ href, _hover, ...props }: XLButtonLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        {...props}
        as='a'
        variant='unstyled'
        display='inline-flex'
        w='auto'
        minH={16}
        pl={8}
        pr={8}
        fontSize='3xl'
        boxShadow='sm'
        _hover={{
          ..._hover,
          boxShadow: 'md',
          transform: 'translateY(-2px)',
        }}
      />
    </Link>
  );
};

export default XLButtonLink;
