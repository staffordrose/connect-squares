import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AspectRatio, Box, Grid, useDisclosure } from '@chakra-ui/react';
import { Piece, PieceType, Point } from '@/common/types';
import { arrayToObject } from '@/common/utils';
import { useVolumeContext } from '@/context';
import BoardPiece from './BoardPiece';
import SuccessModal from './SuccessModal';
import { getPieceMoveToIndex } from './helpers';
import { useBoard, useBoardErrors, useBoardSounds } from './hooks';

interface BoardProps {
  level: Piece[];
  levelNum: number;
  onSuccess: () => void;
  nextHref?: string;
}

const Board = ({ level, levelNum, onSuccess, nextHref }: BoardProps) => {
  const router = useRouter();

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
  const { playClick, playMove, playReset, playRotate, playSuccess } =
    useBoardSounds();

  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);

  // Controls success modal.
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!hasErrors) {
      const modalDelay = setTimeout(() => {
        !isMuted && playSuccess();
        if (typeof window.navigator.vibrate === 'function')
          window.navigator.vibrate([80, 80, 160]);
        onSuccess();
        onOpen();
      }, 300);

      return () => clearTimeout(modalDelay);
    }
  }, [hasErrors, onSuccess, onOpen, isMuted, playSuccess]);

  const rotatePiece = (i: number) => {
    !isMuted && playRotate();
    if (typeof window.navigator.vibrate === 'function')
      window.navigator.vibrate([5]);
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
      if (typeof window.navigator.vibrate === 'function')
        window.navigator.vibrate([10]);
      setBoard((prevBoard) => ({
        ...prevBoard,
        [from]: {} as Piece,
        [to]: prevBoard[from],
      }));
    }
  };

  const pauseAnimation = useRef(false);

  useEffect(() => {
    if (pauseAnimation.current) {
      pauseAnimation.current = false;
    }
  });

  if (!Object.keys(board).length) return null;

  return (
    <>
      <SuccessModal
        levelNum={levelNum}
        hasNext={!!nextHref}
        isOpen={!hasErrors && isOpen}
        onClose={onClose}
        handleReset={() => {
          pauseAnimation.current = true;
          !isMuted && playReset();
          setBoard(arrayToObject(level));
          router.push(router.asPath);
          onClose();
        }}
        handleContinue={async () => {
          !isMuted && playClick();
          if (nextHref) {
            onClose();
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push(`${nextHref}`);
          } else {
            onClose();
          }
        }}
      />

      <Box
        w='100%'
        maxW={
          boardSize === 6
            ? [360, 420, 480]
            : boardSize === 5
            ? [360, 420]
            : [360]
        }
        borderRadius={10}
        bg='cyan.800'
      >
        <AspectRatio w='100%' transform='translateY(-15px)' ratio={1}>
          <Box w='100%' h='100%' borderRadius={10} bg='cyan.500'>
            <Grid
              ref={boardRef}
              templateColumns={`repeat(${boardSize}, 1fr)`}
              templateRows={`repeat(${boardSize}, 1fr)`}
              w='100%'
              h='100%'
              p={2}
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
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderColor: 'cyan.500',
                    borderRadius: 8,
                    bg: 'cyan.700',
                    boxShadow: 'inset 0 4px 4px 0 rgba(6, 86, 102,0.75)',
                  }}
                >
                  {!!piece?.type && (
                    <BoardPiece
                      {...piece}
                      boardRef={boardRef}
                      pauseAnimation={pauseAnimation.current}
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
      </Box>
    </>
  );
};

export default Board;
