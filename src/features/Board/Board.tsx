import { useEffect, useRef } from 'react';
import { AspectRatio, Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { Piece, PieceType, Point } from '@/common/types';
import { XLButtonLink } from '@/components';
import { useVolumeContext } from '@/context';
import BoardPiece from './BoardPiece';
import { getPieceMoveToIndex } from './helpers';
import { useBoard, useBoardErrors, useBoardSounds } from './hooks';

interface BoardProps {
  level: Piece[];
  onComplete: () => void;
  nextHref?: string;
}

const Board = ({ level, onComplete, nextHref }: BoardProps) => {
  const { boardRef, board, setBoard, boardSize } = useBoard(level);

  // Prevent page scrolling on touch events within the board.
  useEffect(() => {
    const preventPageScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    const ref = boardRef.current;

    if (ref) {
      ref.addEventListener('touchmove', preventPageScroll, {
        passive: false,
      });

      return () => {
        ref.removeEventListener('touchmove', preventPageScroll);
      };
    }
  }, [boardRef]);

  const hasErrors = useBoardErrors(board);

  const { isMuted } = useVolumeContext();
  const { playMove, playRotate, playSuccess } = useBoardSounds();

  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!hasErrors) {
      !isMuted && playSuccess();
      onComplete();
    }
  }, [hasErrors, onComplete, isMuted, playSuccess]);

  const rotatePiece = (i: number) => {
    !isMuted && playRotate();
    setBoard((prevBoard) => ({
      ...prevBoard,
      [i]: {
        ...prevBoard[i],
        rotate: prevBoard[i].rotate + 90,
      },
    }));
  };

  const movePiece = (from: number, type: PieceType, pt: Point) => {
    const to = getPieceMoveToIndex({
      boardRef,
      squaresRef,
      boardSize,
      from,
      type,
      pt,
    });

    if (to >= 0 && !board[to]?.type) {
      !isMuted && playMove();
      setBoard((prevBoard) => ({
        ...prevBoard,
        [from]: {} as Piece,
        [to]: prevBoard[from],
      }));
    }
  };

  if (!Object.keys(board).length) return null;

  return (
    <>
      <Flex justifyContent='center' alignItems='center' minH={16} mx='auto'>
        {!hasErrors && (
          <Heading
            as='h2'
            fontSize='4xl'
            lineHeight={1}
            textAlign='center'
            color='cyan.900'
          >
            Completed!
          </Heading>
        )}
      </Flex>

      <AspectRatio
        w='100%'
        maxW={
          boardSize === 6
            ? [360, 420, 480]
            : boardSize === 5
            ? [360, null, 420]
            : [360]
        }
        mt={[4, null, 6]}
        mx='auto'
        ratio={1}
      >
        <Box
          w='100%'
          h='100%'
          borderWidth={4}
          borderStyle='solid'
          borderColor='cyan.900'
          borderRadius={4}
          bgGradient='radial(cyan.300, cyan.400)'
          boxShadow='2xl'
        >
          <Grid
            ref={boardRef}
            templateColumns={`repeat(${boardSize}, 1fr)`}
            templateRows={`repeat(${boardSize}, 1fr)`}
            w='100%'
            h='100%'
          >
            {Object.values(board).map((piece, i) => (
              <Box
                key={i}
                ref={(el) => (squaresRef.current[i] = el)}
                position='relative'
                w='100%'
                h='100%'
                _after={{
                  content: '""',
                  position: 'absolute',
                  zIndex: 0,
                  top: 0,
                  left: 0,
                  w: '100%',
                  h: '100%',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'cyan.800',
                }}
              >
                {!!piece?.type && (
                  <BoardPiece
                    {...piece}
                    boardRef={boardRef}
                    rotatePiece={() => rotatePiece(i)}
                    movePiece={(type: PieceType, point: Point) =>
                      movePiece(i, type, point)
                    }
                  />
                )}
              </Box>
            ))}
          </Grid>
        </Box>
      </AspectRatio>

      <Flex
        justifyContent='center'
        alignItems='center'
        minH={16}
        mt={[8, null, 12]}
        mx='auto'
      >
        {!hasErrors && (
          <>
            {nextHref ? (
              <XLButtonLink
                href={nextHref}
                color='orange.700'
                bg='orange.100'
                _hover={{ bg: 'orange.50' }}
              >
                Next Level
              </XLButtonLink>
            ) : (
              <Text fontSize='xl' textAlign='center' color='cyan.900'>
                You completed every level!
              </Text>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default Board;
