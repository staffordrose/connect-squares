import { MutableRefObject, ReactNode, useRef } from 'react';
import { Box, Center, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Piece, PieceType, Point } from '@/common/types';
import {
  LockIcon,
  MoveXIcon,
  MoveXRotateIcon,
  MoveXYIcon,
  MoveXYRotateIcon,
  MoveYIcon,
  MoveYRotateIcon,
  RotateIcon,
} from '@/components';
import PieceConnectors from './PieceConnectors';

const MotionBox = motion(Box);

const pieceColors = {
  f: 'red',
  x: 'yellow',
  y: 'yellow',
  r: 'orange',
  xy: 'green',
  xr: 'brown',
  yr: 'brown',
  xyr: 'purple',
};

const pieceIcons = {
  f: LockIcon,
  x: MoveXIcon,
  y: MoveYIcon,
  r: RotateIcon,
  xy: MoveXYIcon,
  xr: MoveXRotateIcon,
  yr: MoveYRotateIcon,
  xyr: MoveXYRotateIcon,
};

interface BoardPieceProps extends Piece {
  boardRef: MutableRefObject<HTMLDivElement | null>;
  pauseAnimation: boolean;
  rotatePiece: () => void;
  movePiece: (type: PieceType, point: Point) => void;
  children?: ReactNode;
}

const BoardPiece = ({
  boardRef,
  pauseAnimation,
  type,
  connectors,
  rotate,
  rotatePiece,
  movePiece,
  ...props
}: BoardPieceProps) => {
  // Prevent rotation when ending drag action.
  const isDragging = useRef(false);

  const color = type ? pieceColors[type] : null;

  const absRotate = rotate % 360;

  return (
    <MotionBox
      {...props}
      position='relative'
      zIndex={10}
      w='100%'
      h='100%'
      cursor={type === 'f' ? 'default' : type === 'r' ? 'pointer' : 'grab'}
      sx={{
        WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
      }}
      drag={
        type.includes('x') && type.includes('y')
          ? true
          : type.includes('x')
          ? 'x'
          : type.includes('y')
          ? 'y'
          : false
      }
      dragConstraints={boardRef}
      dragElastic={0.025}
      dragSnapToOrigin
      whileDrag={{ zIndex: 100, scale: 1.1 }}
      initial={{ rotate }}
      animate={{ rotate }}
      transition={{
        duration: pauseAnimation ? 0 : 0.3,
      }}
      onTap={() => {
        if (!isDragging.current && type.includes('r')) {
          rotatePiece();
        }
        isDragging.current = false;
      }}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={({}, info: { point: Point }) => {
        movePiece(type, info.point);
      }}
    >
      {connectors?.map((count, i) => (
        <PieceConnectors
          key={i}
          count={count}
          rotate={i * 90}
          relRotate={(360 - ((i * 90 + absRotate) % 360)) % 360}
        />
      ))}

      <Box
        position='absolute'
        top='12.5%'
        left='12.5%'
        w='75%'
        h='75%'
        borderRadius='12.5%'
        bg={`${color}.700`}
        transform={
          absRotate === 270
            ? 'translateX(-10%)'
            : absRotate === 180
            ? 'translateY(-10%)'
            : absRotate === 90
            ? 'translateX(10%)'
            : 'translateY(10%)'
        }
        transition='transform 0.3s'
      >
        <Center
          w='100%'
          h='100%'
          borderRadius='12.5%'
          bgGradient={`radial(${color}.400, ${color}.500)`}
          transform={
            absRotate === 270
              ? 'translateX(10%)'
              : absRotate === 180
              ? 'translateY(10%)'
              : absRotate === 90
              ? 'translateX(-10%)'
              : 'translateY(-10%)'
          }
          transition='transform 0.3s'
        >
          <MotionBox
            display='flex'
            justifyContent='center'
            alignItems='center'
            w='100%'
            h='100%'
            initial={
              ['xr', 'yr'].includes(type)
                ? {
                    rotate: -rotate,
                  }
                : {}
            }
            animate={
              ['xr', 'yr'].includes(type)
                ? {
                    rotate: -rotate,
                  }
                : {}
            }
            transition={{
              duration: pauseAnimation ? 0 : 0.3,
            }}
          >
            <Icon as={pieceIcons[type]} boxSize='75%' color='whiteAlpha.800' />
          </MotionBox>
        </Center>
      </Box>
    </MotionBox>
  );
};

export default BoardPiece;
