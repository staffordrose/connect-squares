import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Heading, Icon, IconButton } from '@chakra-ui/react';
import { MdArrowBack, MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import { useVolumeContext } from '@/context';

const VolumeToggle = () => {
  // Prevent hydration error by waiting until component is mounted to display volume icon.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const { isMuted, toggleVolume } = useVolumeContext();

  if (!isMounted) return null;

  return (
    <IconButton
      justifySelf='end'
      display='flex'
      justifyContent='center'
      alignItems='center'
      minW={[14, 16]}
      minH={[14, 16]}
      color='cyan.900'
      bg='transparent'
      boxShadow='sm'
      _hover={{
        bg: 'cyan.50',
        boxShadow: 'md',
        transform: 'translateY(-1px)',
      }}
      aria-label={`Turn Volume ${isMuted ? 'On' : 'Off'}`}
      icon={<Icon as={isMuted ? MdVolumeOff : MdVolumeUp} boxSize={[10, 12]} />}
      onClick={toggleVolume}
    />
  );
};

interface HeaderProps {
  ['aria-label']: string;
  backHref: string;
  title?: string;
}

const Header = ({ backHref, title, ...props }: HeaderProps) => {
  const router = useRouter();

  return (
    <Box
      as='header'
      position='sticky'
      zIndex='modal'
      top={0}
      left={0}
      backdropFilter='auto'
      backdropBlur='8px'
      _after={{
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        w: '100%',
        h: '100%',
        bg: 'cyan.100',
        opacity: 0.25,
      }}
    >
      <Grid
        templateColumns='auto auto 1fr'
        gap={[1.5, 2.5]}
        alignItems='center'
        w='100%'
        maxW={1280}
        minH={24}
        mx='auto'
        px={[4, null, 6]}
      >
        <Button
          {...props}
          variant='unstyled'
          display='flex'
          justifyContent='center'
          alignItems='center'
          minH={[14, 16]}
          pl={1}
          pr={[1, 2]}
          color='cyan.900'
          boxShadow='sm'
          _hover={{
            bg: 'cyan.50',
            boxShadow: 'md',
            transform: 'translateY(-1px)',
          }}
          onClick={() => router.push(backHref)}
        >
          <Icon as={MdArrowBack} boxSize={[10, 12]} />
          <Image
            src='/logo.svg'
            alt='Connect Squares Logo'
            width={48}
            height={48}
          />
        </Button>

        {title ? (
          <Heading
            as='h1'
            fontSize={['3xl', '4xl']}
            lineHeight={1}
            color='cyan.900'
          >
            {title}
          </Heading>
        ) : (
          <span />
        )}

        <VolumeToggle />
      </Grid>
    </Box>
  );
};

export default Header;
