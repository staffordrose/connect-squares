const transposeArray = (arr) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

// Keep board position of pieces that can't be moved.
const getKeepSquares = (arr, keepTypes) =>
  arr.reduce(
    (accum, curr, i) => (keepTypes.includes(curr.type) && accum.push(i), accum),
    []
  );

const filterAndShuffle = (arr, keepIndices) =>
  arr
    .filter(({}, i) => !keepIndices.includes(i))
    .sort(() => 0.5 - Math.random());

const addBackKeepSquares = (arr, referenceArr, keepIndices) => {
  for (const index of keepIndices) {
    arr.splice(index, 0, referenceArr[index]);
  }
};

const shuffleSquares = (board) => {
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
  const yShuffled = yGroupsShuffled.flat();

  return yShuffled;
};

const rotatePieces = (board) => {
  const rotated = board.reduce((accum, curr, i) => {
    // Randomly rotate all pieces that can be rotated.
    if (curr.type && !['f', 'x', 'y', 'xy'].includes(curr.type)) {
      accum[i] = { ...curr, rotate: Math.floor(Math.random() * 4) * 90 };
    } else {
      accum[i] = curr;
    }

    return accum;
  }, []);

  return rotated;
};

const shuffleBoardPieces = (board) => {
  let result = board;

  result = shuffleSquares(result);
  result = rotatePieces(result);

  return result;
};

export default shuffleBoardPieces;
