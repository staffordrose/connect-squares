import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Heading, Icon, IconButton } from '@chakra-ui/react';
import type { As } from '@chakra-ui/react';
import useSound from 'use-sound';
import { MdArrowBack, MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import { useVolumeContext } from '@/context';

const VolumeToggle = ({
  isMuted,
  toggleVolume,
  playSoundOn,
}: {
  isMuted: boolean;
  toggleVolume: () => void;
  playSoundOn: () => void;
}) => {
  const [playSoundOff] = useSound('/sounds/click.mp3', { volume: 0.125 });

  // Prevent hydration error by waiting until component is mounted to display volume icon.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <IconButton
      justifySelf='end'
      variant='ghost'
      colorScheme='cyan'
      minW={[14, 16]}
      minH={[14, 16]}
      color='cyan.900'
      aria-label={`Turn Volume ${isMuted ? 'On' : 'Off'}`}
      icon={<Icon as={isMuted ? MdVolumeOff : MdVolumeUp} boxSize={[10, 12]} />}
      onClick={() => {
        toggleVolume();
        isMuted ? playSoundOn() : playSoundOff();
      }}
    />
  );
};

interface AppBarProps {
  as?: As;
  ['aria-label']?: string;
  backHref?: string;
  title?: string;
}

const AppBar = ({ as, backHref, title, ...props }: AppBarProps) => {
  const router = useRouter();

  const volumeContext = useVolumeContext();
  const { isMuted } = volumeContext;
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.625 });

  return (
    <Box
      as={as}
      position='sticky'
      zIndex='modal'
      top={0}
      left={0}
      backdropFilter='blur(4px)'
      _after={{
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        w: '100%',
        h: '100%',
        bg: 'cyan.200',
        opacity: 0.25,
      }}
    >
      <Grid
        templateColumns='auto auto 1fr'
        gap={[1.5, 2.5]}
        alignItems='center'
        w='100%'
        maxW={1280}
        minH={[20, 24]}
        mx='auto'
        px={[4, null, 6]}
      >
        {backHref ? (
          <Button
            {...props}
            variant='ghost'
            minH={[14, 16]}
            pl={1}
            pr={[1, 2]}
            color='cyan.900'
            onClick={() => {
              !isMuted && playClick();
              router.push(backHref);
            }}
          >
            <Icon as={MdArrowBack} boxSize={[10, 12]} />
            <Image
              src='/logo.svg'
              alt='Connect Squares Logo'
              width={48}
              height={48}
            />
          </Button>
        ) : (
          <span />
        )}

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

        <VolumeToggle {...volumeContext} playSoundOn={playClick} />
      </Grid>
    </Box>
  );
};

export default AppBar;
