import { MutableRefObject } from 'react';
import { PieceType, Point } from '@/common/types';

type DivEl = HTMLDivElement | null;

interface Args {
  boardRef: MutableRefObject<DivEl>;
  squaresRef: MutableRefObject<DivEl[]>;
  boardSize: number;
  from: number;
  type: PieceType;
  pt: Point;
}

const getPieceMoveToIndex = ({
  boardSize,
  boardRef,
  squaresRef,
  from,
  type,
  pt,
}: Args) => {
  let to: number = from;

  const isPointInClientRect = (el: DivEl) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      pt.x - window.scrollX > rect?.left &&
      pt.x - window.scrollX < rect?.right &&
      pt.y - window.scrollY > rect?.top &&
      pt.y - window.scrollY < rect?.bottom
    );
  };

  const isPointInClientRectX = (el: DivEl) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      pt.y - window.scrollY > rect?.top && pt.y - window.scrollY < rect?.bottom
    );
  };

  const isPointInClientRectY = (el: DivEl) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      pt.x - window.scrollX > rect.left && pt.x - window.scrollX < rect.right
    );
  };

  if (!isPointInClientRect(boardRef.current)) {
    // Point is not within board boundaries.
    const boardClientRect: any =
      boardRef.current?.getBoundingClientRect() ?? {};

    let position;

    if (isPointInClientRectX(boardRef.current)) {
      position =
        pt.x - window.scrollX < boardClientRect.left ? 'left' : 'right';
    } else if (isPointInClientRectY(boardRef.current)) {
      position = pt.y - window.scrollY < boardClientRect.top ? 'top' : 'bottom';
    } else {
      position =
        pt.x - window.scrollX < boardClientRect.left
          ? pt.y - window.scrollY < boardClientRect.top
            ? 'top-left'
            : 'bottom-left'
          : pt.y - window.scrollY < boardClientRect.top
          ? 'top-right'
          : 'bottom-right';
    }

    if (['x', 'xr'].includes(type)) {
      // Must stay in same row.
      switch (position) {
        case 'left':
        case 'top-left':
        case 'bottom-left':
          to = Math.floor(from / boardSize) * boardSize;
          break;
        case 'right':
        case 'top-right':
        case 'bottom-right':
          to = Math.floor(from / boardSize) * boardSize + boardSize - 1;
          break;
        case 'top':
        case 'bottom':
          to = squaresRef.current.findIndex(
            (el, i) =>
              Math.floor(from / boardSize) === Math.floor(i / boardSize) &&
              isPointInClientRectY(el)
          );
          break;
        default:
          to = -1;
          break;
      }
    } else if (['y', 'yr'].includes(type)) {
      // Must stay in same column.
      switch (position) {
        case 'top':
        case 'top-left':
        case 'top-right':
          to = from % boardSize;
          break;
        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
          to = (from % boardSize) + boardSize * (boardSize - 1);
          break;
        case 'left':
        case 'right':
          to = squaresRef.current.findIndex(
            (el, i) =>
              from % boardSize === i % boardSize && isPointInClientRectX(el)
          );
          break;
        default:
          to = -1;
          break;
      }
    } else {
      switch (position) {
        case 'top':
          to = squaresRef.current.findIndex(
            (el, i) => i < boardSize && isPointInClientRectY(el)
          );
          break;
        case 'top-right':
          to = boardSize - 1;
          break;
        case 'right':
          to = squaresRef.current.findIndex(
            (el, i) =>
              i % boardSize === boardSize - 1 && isPointInClientRectX(el)
          );
          break;
        case 'bottom-right':
          to = boardSize * boardSize - 1;
          break;
        case 'bottom':
          to = squaresRef.current.findIndex(
            (el, i) =>
              i >= boardSize * (boardSize - 1) && isPointInClientRectY(el)
          );
          break;
        case 'bottom-left':
          to = boardSize * (boardSize - 1);
          break;
        case 'left':
          to = squaresRef.current.findIndex(
            (el, i) => i % boardSize === 0 && isPointInClientRectX(el)
          );
          break;
        case 'top-left':
          to = 0;
          break;
        default:
          to = -1;
          break;
      }
    }
  } else {
    // Point is within board boundaries.
    if (['x', 'xr'].includes(type)) {
      // Must stay in same row.
      to = squaresRef.current.findIndex(
        (el, i) =>
          Math.floor(from / boardSize) === Math.floor(i / boardSize) &&
          isPointInClientRectY(el)
      );
    } else if (['y', 'yr'].includes(type)) {
      // Must stay in same column.
      to = squaresRef.current.findIndex(
        (el, i) =>
          from % boardSize === i % boardSize && isPointInClientRectX(el)
      );
    } else {
      to = squaresRef.current.findIndex((el) => isPointInClientRect(el));
    }
  }

  return to;
};

export default getPieceMoveToIndex;
