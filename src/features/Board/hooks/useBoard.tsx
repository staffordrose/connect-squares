import { useEffect, useRef, useState } from 'react';
import { Piece } from '@/common/types';
import { arrayToObject } from '@/common/utils';

const useBoard = (level: Piece[]) => {
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [board, setBoard] = useState<{ [index: number]: Piece }>(
    arrayToObject(level)
  );

  const [boardSize, setBoardSize] = useState(Math.sqrt(level.length));

  useEffect(() => {
    setBoard(arrayToObject(level));
    setBoardSize(Math.sqrt(level.length));

    return () => {
      setBoard({});
      setBoardSize(0);
    };
  }, [level]);

  return { boardRef, board, setBoard, boardSize };
};

export default useBoard;
