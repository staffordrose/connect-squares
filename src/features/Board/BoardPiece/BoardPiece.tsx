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
  xyr: 'blue',
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
  rotatePiece: () => void;
  movePiece: (type: PieceType, point: Point) => void;
  children?: ReactNode;
}

const BoardPiece = ({
  boardRef,
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
        duration: 0.3,
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
          bottom={i === 2 ? 0 : undefined}
          rotate={i * 90}
        />
      ))}

      <Center
        position='absolute'
        zIndex={1}
        top='12.5%'
        left='12.5%'
        w='75%'
        h='75%'
        borderWidth={1}
        borderStyle='solid'
        borderColor={`${color}.600`}
        borderRadius='6.25%'
        bgGradient={`radial(${color}.400, ${color}.500)`}
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
            duration: 0.3,
          }}
        >
          <Icon as={pieceIcons[type]} boxSize='75%' color='whiteAlpha.700' />
        </MotionBox>
      </Center>
    </MotionBox>
  );
};

export default BoardPiece;
