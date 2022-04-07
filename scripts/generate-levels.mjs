import fs from 'fs';

const transposeArray = (arr) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

const getPieceCount = function (boardLength, levelProgress) {
  const minPieces = boardLength === 36 ? 12 : boardLength === 25 ? 10 : 4;
  const maxPieces = boardLength === 36 ? 30 : boardLength === 25 ? 21 : 14;

  return Math.round((maxPieces - minPieces) * levelProgress) + minPieces;
};

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

const generatePieceType = function (boardSize) {
  const rand = Math.floor(Math.random() * 100);
  const keys = Object.keys(pieceProbabilities[boardSize]).map(Number);
  const key = keys.find((key) => rand < key);

  return pieceProbabilities[boardSize][key];
};

const getSurroundingIndices = function (i, board) {
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

const setBoardPieces = function (board, piecesCount) {
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

const confirmAllPiecesAreConnected = function (board) {
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

const generatePieceConnectors = function (board) {
  const boardSize = Math.sqrt(board.length);

  for (let i = 0; i < board.length; i++) {
    if (!board[i]?.type) continue;

    // Bottom side
    if (i < boardSize * (boardSize - 1) && board[i + boardSize]?.type) {
      board[i].connectors[2] = Math.ceil(Math.random() * 4);
    }

    // Right side
    if (i % boardSize < boardSize - 1 && board[i + 1]?.type) {
      board[i].connectors[1] = Math.ceil(Math.random() * 4);
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

// Keep board position of pieces that can't be moved.
const getKeepSquares = function (arr, keepTypes) {
  return arr.reduce(
    (accum, curr, i) => (keepTypes.includes(curr.type) && accum.push(i), accum),
    []
  );
};

const filterAndShuffle = function (arr, keepIndices) {
  return arr
    .filter(({}, i) => !keepIndices.includes(i))
    .sort(() => 0.5 - Math.random());
};

const addBackKeepSquares = function (arr, referenceArr, keepIndices) {
  for (const index of keepIndices) {
    arr.splice(index, 0, referenceArr[index]);
  }
};

const shuffleSquares = function (board) {
  const boardSize = Math.sqrt(board.length);

  // Shuffle pieces that can move along x-axis and y-axis.
  const keepSquares = getKeepSquares(board, ['f', 'r', 'x', 'y', 'xr', 'yr']);
  let initialShuffled = filterAndShuffle(board, keepSquares);
  addBackKeepSquares(initialShuffled, board, keepSquares);

  // Shuffle pieces that can move along x-axis.
  let xShuffled = [];
  for (let i = 0; i < initialShuffled.length; i += boardSize) {
    const boardRow = initialShuffled.slice(i, i + boardSize);

    const keepSquares = getKeepSquares(boardRow, ['f', 'r', 'y', 'yr']);
    let shuffled = filterAndShuffle(boardRow, keepSquares);
    addBackKeepSquares(shuffled, boardRow, keepSquares);

    xShuffled = [...xShuffled, ...shuffled];
  }

  // Shuffle pieces that can move along y-axis.
  let yGroupsShuffled = [];
  for (let i = 0; i < xShuffled.length; i += boardSize) {
    const boardCol = xShuffled.filter(
      (_, index) => index % boardSize === i / boardSize
    );

    const keepSquares = getKeepSquares(boardCol, ['f', 'r', 'x', 'xr']);
    let shuffled = filterAndShuffle(boardCol, keepSquares);
    addBackKeepSquares(shuffled, boardCol, keepSquares);

    yGroupsShuffled.push(shuffled);
  }
  yGroupsShuffled = transposeArray(yGroupsShuffled);

  return yGroupsShuffled.flat();
};

const rotatePieces = function (board) {
  return board.reduce((accum, curr, i) => {
    // Randomly rotate all pieces that can be rotated.
    if (curr.type && !['f', 'x', 'y', 'xy'].includes(curr.type)) {
      accum[i] = { ...curr, rotate: Math.floor(Math.random() * 4) * 90 };
    } else {
      accum[i] = curr;
    }

    return accum;
  }, []);
};

const shuffleBoardPieces = function (board) {
  let result = shuffleSquares(board);
  result = rotatePieces(result);

  return result;
};

const boardSizes = {
  4: 'normal',
  5: 'hard',
  6: 'expert',
};

(function () {
  let levels = {
    normal: [],
    hard: [],
    expert: [],
  };

  // Determine how many levels to generate.
  const emptyLevels = [...Array(100)].map((_, i) => i);

  for (const size in boardSizes) {
    const boardSize = parseInt(size);

    for (const level of emptyLevels) {
      const pieceCount = getPieceCount(
        boardSize * boardSize,
        level / emptyLevels.length
      );

      let board = [];

      while (!confirmAllPiecesAreConnected(board)) {
        board = [...Array(boardSize * boardSize)].map(() => ({}));
        setBoardPieces(board, pieceCount);
      }

      generatePieceConnectors(board);

      const shuffled = shuffleBoardPieces(board);

      const category = boardSizes[size];

      levels[category][level] = shuffled;
    }
  }

  if (!fs.existsSync('public/levels')) {
    fs.mkdirSync('public/levels');
  }

  // Write to public levels directories.
  ['normal', 'hard', 'expert'].forEach((category) => {
    if (!fs.existsSync(`public/levels/${category}`)) {
      fs.mkdirSync(`public/levels/${category}`);
    }

    for (let i = 0; i < levels[category].length; i++) {
      let data = JSON.stringify(levels[category][i], null, 2);
      fs.writeFile(`public/levels/${category}/${i + 1}.json`, data, (err) => {
        if (err) throw err;
      });
    }
  });
})();
