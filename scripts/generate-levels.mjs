import fs from 'fs';
import shuffleBoardPieces from './shuffle-board-pieces.mjs';

const pieceProbabilities = {
  4: {
    10: 'f', // 10%
    30: 'r', // 20%
    65: 'xy', // 35%
    100: 'xyr', // 35%
  },
  5: {
    5: 'f', // 5%
    15: 'x', // 10%
    25: 'y', // 10%
    40: 'r', // 15%
    60: 'xy', // 20%
    70: 'xr', // 10%
    80: 'yr', // 10%
    100: 'xyr', // 20%
  },
  6: {
    5: 'f', // 5%
    20: 'x', // 15%
    35: 'y', // 15%
    45: 'r', // 10%
    60: 'xy', // 15%
    75: 'xr', // 15%
    90: 'yr', // 15%
    100: 'xyr', // 10%
  },
};

const generatePieceType = (boardSize) => {
  const rand = Math.floor(Math.random() * 100);
  const keys = Object.keys(pieceProbabilities[boardSize]).map(Number);
  const key = keys.find((key) => rand < key);

  return pieceProbabilities[boardSize][key];
};

const getPieceCount = (boardSize, levelIndex, levelsLength) => {
  const levelProgress = levelIndex / levelsLength;

  const minPieces = boardSize === 6 ? 12 : boardSize === 5 ? 10 : 4;
  const minEmptySquares = boardSize === 6 ? 6 : boardSize === 5 ? 4 : 2;
  const piecesCount =
    Math.round(
      (boardSize * boardSize - minPieces - minEmptySquares) * levelProgress
    ) + minPieces;

  return piecesCount;
};

const getSurroundingIndices = (i, board) => {
  const boardSize = Math.sqrt(board.length);

  let index;
  let count = 1;

  while (index === undefined) {
    if (count > boardSize) {
      // Find first square that is next to a square with a game piece.
      const firstConnectedSquare = board.findIndex(
        (b, i) =>
          !b?.type &&
          // Next square in row has a game piece.
          ((i % boardSize < boardSize - 1 && board[i + 1]?.type) ||
            // Next square in column has a game piece.
            (i < boardSize * (boardSize - 1) && board[i + boardSize]?.type))
      );
      index = firstConnectedSquare;
      break;
    }

    let availableSquares = [];

    // Top side
    if (i > boardSize - 1) {
      if (!board[i - boardSize]?.type) {
        availableSquares.push(i - boardSize);
      }
    }

    // Right side
    if (i % boardSize < boardSize - 1) {
      if (!board[i + 1]?.type) {
        availableSquares.push(i + 1);
      }
    }

    // Bottom side
    if (i < boardSize * (boardSize - 1)) {
      if (!board[i + boardSize]?.type) {
        availableSquares.push(i + boardSize);
      }
    }

    // Left side
    if (i % boardSize > 0) {
      if (!board[i - 1]?.type) {
        availableSquares.push(i - 1);
      }
    }

    if (availableSquares.length) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      if (typeof availableSquares[randomIndex] === 'number') {
        index = availableSquares[randomIndex];
        break;
      }
    }

    // Top-right side
    if (i > boardSize - 1 && i % boardSize < boardSize - 1) {
      if (!board[i - boardSize + 1]?.type) {
        availableSquares.push(i - boardSize + 1);
      }
    }

    // Bottom-right side
    if (i < boardSize * (boardSize - 1) && i % boardSize < boardSize - 1) {
      if (!board[i + boardSize + 1]?.type) {
        availableSquares.push(i + boardSize + 1);
      }
    }

    // Bottom-left side
    if (i < boardSize * (boardSize - 1) && i % boardSize > 0) {
      if (!board[i + boardSize - 1]?.type) {
        availableSquares.push(i + boardSize - 1);
      }
    }

    // Top-left side
    if (i > boardSize - 1 && i % boardSize > 0) {
      if (!board[i - boardSize - 1]?.type) {
        availableSquares.push(i - boardSize - 1);
      }
    }

    if (availableSquares.length) {
      const randomIndex = Math.floor(Math.random() * availableSquares.length);
      if (typeof availableSquares[randomIndex] === 'number') {
        index = availableSquares[randomIndex];
        break;
      }
    }

    count++;
  }

  return index;
};

const setBoardPieces = (board, piecesCount) => {
  const boardSize = Math.sqrt(board.length);

  let prevBoardIndex;

  for (let i = 0; i < piecesCount; i++) {
    let boardIndex;

    if (i === 0) {
      boardIndex = Math.floor(Math.random() * board.length);
    } else {
      boardIndex = getSurroundingIndices(prevBoardIndex, board);
    }

    board[boardIndex] = {
      type: generatePieceType(boardSize),
      connectors: [0, 0, 0, 0],
      rotate: 0,
    };

    prevBoardIndex = boardIndex;
  }
};

const confirmAllPiecesAreConnected = (board) => {
  if (!board.length) return false;

  const boardSize = Math.sqrt(board.length);

  for (let i = 0; i < board.length; i++) {
    if (!board[i]?.type) continue;

    // Top side
    if (i > boardSize - 1 && board[i - boardSize]?.type) continue;

    // Right side
    if (i % boardSize < boardSize - 1 && board[i + 1]?.type) continue;

    // Bottom side
    if (i < boardSize * (boardSize - 1) && board[i + boardSize]?.type) continue;

    // Left side
    if (i % boardSize > 0 && board[i - 1]?.type) continue;

    return false;
  }

  return true;
};

const pieceConnectors = [0, 1, 2, 3, 4];

const generatePieceConnectors = (board) => {
  const boardSize = Math.sqrt(board.length);

  for (let i = 0; i < board.length; i++) {
    if (!board[i]?.type) continue;

    // Bottom side
    if (i < boardSize * (boardSize - 1) && board[i + boardSize]?.type) {
      board[i].connectors[2] = Math.ceil(
        Math.random() * (pieceConnectors.length - 1)
      );
    }

    // Right side
    if (i % boardSize < boardSize - 1 && board[i + 1]?.type) {
      board[i].connectors[1] = Math.ceil(
        Math.random() * (pieceConnectors.length - 1)
      );
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (!board[i]?.type) continue;

    // Top side
    if (i > boardSize - 1 && board[i - boardSize]?.type) {
      board[i].connectors[0] = board[i - boardSize].connectors?.[2];
    }

    // Left side
    if (i % boardSize > 0 && board[i - 1]?.type) {
      board[i].connectors[3] = board[i - 1].connectors?.[1];
    }
  }
};

const boardSizes = [
  4, // normal
  5, // hard
  6, // expert
];

const generateLevels = (count = 100) => {
  let levels = {
    normal: [],
    hard: [],
    expert: [],
  };

  // Determine how many levels to generate.
  const emptyLevels = [...Array(count)].map((_, i) => i);

  for (const boardSize of boardSizes) {
    for (const level of emptyLevels) {
      const pieceCount = getPieceCount(boardSize, level, emptyLevels.length);

      let board = [];

      while (!confirmAllPiecesAreConnected(board)) {
        board = [...Array(boardSize * boardSize)].map(() => ({}));
        setBoardPieces(board, pieceCount);
      }

      generatePieceConnectors(board);

      const shuffled = shuffleBoardPieces(board);

      const category =
        boardSize === 6 ? 'expert' : boardSize === 5 ? 'hard' : 'normal';

      levels[category][level] = shuffled;
    }
  }

  // Write to Next.js public directory.
  if (!fs.existsSync('public/levels')) {
    fs.mkdirSync('public/levels');

    if (!fs.existsSync('public/levels/normal')) {
      fs.mkdirSync('public/levels/normal');
    }
    if (!fs.existsSync('public/levels/hard')) {
      fs.mkdirSync('public/levels/hard');
    }
    if (!fs.existsSync('public/levels/expert')) {
      fs.mkdirSync('public/levels/expert');
    }
  }

  for (let i = 0; i < levels.normal.length; i++) {
    let data = JSON.stringify(levels.normal[i], null, 2);
    fs.writeFile(`public/levels/normal/${i + 1}.json`, data, (err) => {
      if (err) throw err;
    });
  }
  for (let i = 0; i < levels.hard.length; i++) {
    let data = JSON.stringify(levels.hard[i], null, 2);
    fs.writeFile(`public/levels/hard/${i + 1}.json`, data, (err) => {
      if (err) throw err;
    });
  }
  for (let i = 0; i < levels.expert.length; i++) {
    let data = JSON.stringify(levels.expert[i], null, 2);
    fs.writeFile(`public/levels/expert/${i + 1}.json`, data, (err) => {
      if (err) throw err;
    });
  }
};

generateLevels();
