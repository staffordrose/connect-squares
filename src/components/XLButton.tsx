import { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

interface XLButtonProps {
  color?: string;
  bg?: string;
  _hover?: { [key: string]: string };
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const XLButton = ({ _hover, ...props }: XLButtonProps) => {
  return (
    <Button
      {...props}
      variant='unstyled'
      minH={16}
      pl={8}
      pr={8}
      fontSize='3xl'
      boxShadow='sm'
      _hover={{
        ..._hover,
        boxShadow: !props.disabled ? 'md' : undefined,
        transform: !props.disabled ? 'translateY(-2px)' : undefined,
      }}
    />
  );
};

export default XLButton;
