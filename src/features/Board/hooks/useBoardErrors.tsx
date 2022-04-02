import { useEffect, useMemo, useRef } from 'react';
import { Piece } from '@/common/types';
import { checkBoardHasErrors } from '../helpers';

const useBoardErrors = (board: { [index: number]: Piece }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const hasErrors = useMemo(() => {
    if (isMounted.current === true) {
      return checkBoardHasErrors(Object.values(board));
    } else {
      return true;
    }
  }, [board]);

  return hasErrors;
};

export default useBoardErrors;
