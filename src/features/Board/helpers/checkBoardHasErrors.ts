import { Piece } from '@/common/types';
import { arrayRotate } from '@/common/utils';

// Shift connectors array based on rotation of board piece.
const getRotatedConnectors = (p: Piece) => {
  const r = (p.rotate ?? 0) % 360;
  const shift = r > 0 ? r / 90 : 0;
  const rotated = arrayRotate(p.connectors as [], shift > 0 ? -shift : 0);
  return rotated;
};

const validatePieces = (board: Piece[], boardSize: number) => {
  for (let b in board) {
    const index = parseInt(b);
    const piece = board[index];

    if (piece?.type) {
      const connectors = getRotatedConnectors(piece);

      // Check top side connectors.
      if (index > boardSize - 1) {
        if (connectors[0] > 0) {
          const compPiece = board[index - boardSize];
          if (compPiece?.type) {
            const compConnectors = getRotatedConnectors(compPiece);
            if (connectors[0] !== compConnectors[2]) {
              throw Error(
                `Connectors don't match for ${index}:${index - boardSize}`
              );
            }
          } else {
            throw Error(
              `Connectors are facing an empty square at ${index}:${
                index - boardSize
              }`
            );
          }
        }
      } else {
        // Check for any connectors facing the top edge of the board.
        if (getRotatedConnectors(piece)[0] > 0) {
          throw Error(
            `Connectors are facing the top edge of the board at ${index}`
          );
        }
      }

      // Check right side connectors.
      if (index % boardSize < boardSize - 1) {
        if (connectors[1] > 0) {
          const compPiece = board[index + 1];
          if (compPiece?.type) {
            const compConnectors = getRotatedConnectors(compPiece);
            if (connectors[1] !== compConnectors[3]) {
              throw Error(`Connectors don't match for ${index}:${index + 1}`);
            }
          } else {
            throw Error(
              `Connectors are facing an empty square at ${index}:${index + 1}`
            );
          }
        }
      } else {
        // Check for any connectors facing the right edge of the board.
        if (getRotatedConnectors(piece)[1] > 0) {
          throw Error(
            `Connectors are facing the right edge of the board at ${index}`
          );
        }
      }

      // Check bottom side connectors.
      if (index < boardSize * (boardSize - 1)) {
        if (connectors[2] > 0) {
          const compPiece = board[index + boardSize];
          if (compPiece?.type) {
            const compConnectors = getRotatedConnectors(compPiece);
            if (connectors[2] !== compConnectors[0]) {
              throw Error(
                `Connectors don't match for ${index}:${index + boardSize}`
              );
            }
          } else {
            throw Error(
              `Connectors are facing an empty square at ${index}:${
                index + boardSize
              }`
            );
          }
        }
      } else {
        // Check for any connectors facing the bottom edge of the board.
        if (getRotatedConnectors(piece)[2] > 0) {
          throw Error(
            `Connectors are facing the bottom edge of the board at ${index}`
          );
        }
      }

      // Check left side connectors.
      if (index % boardSize > 0) {
        if (connectors[3] > 0) {
          const compPiece = board[index - 1];
          if (compPiece?.type) {
            const compConnectors = getRotatedConnectors(compPiece);
            if (connectors[3] !== compConnectors[1]) {
              throw Error(`Connectors don't match for ${index}:${index - 1}`);
            }
          } else {
            throw Error(
              `Connectors are facing an empty square at ${index}:${index - 1}`
            );
          }
        }
      } else {
        // Check for any connectors facing the bottom edge of the board.
        if (getRotatedConnectors(piece)[3] > 0) {
          throw Error(
            `Connectors are facing the left edge of the board at ${index}`
          );
        }
      }
    }
  }
};

const checkBoardHasErrors = (board: Piece[]) => {
  try {
    const boardSize = Math.sqrt(board.length);

    if (![4, 5, 6].includes(boardSize)) {
      throw Error(`Board size is not valid`);
    }

    validatePieces(board, boardSize);

    return false;
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Board error: ', error.message);
    }
    return true;
  }
};

export default checkBoardHasErrors;
