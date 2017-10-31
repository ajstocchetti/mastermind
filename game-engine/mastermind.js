const Guess = require('./guess-check');

class mastermind {
  constructor(guesses, colors, pieces) {
    // TODO: better error handling of input validation
    if (!(validateNum(guesses) && validateNum(colors) && validateNum(pieces))) throw new Error('Invalid input!');

    this.maxTries = guesses;
    this.tries = [];
    this.numColors = colors;
    this.numPieces = pieces;
    this.gameState = 'new'; // new, playing, win, loss
  }

  // set up goal
  setBoard(board) {
    if (this.gameState != 'new') throw new Error('Cannot setup game once it has been initialized');
    if (board.length != this.numPieces) throw new Error(`Board should have ${this.numPieces} entries, ${board.length} given`);
    board.forEach((piece, index) => {
      if (!isWholeNum(piece) || piece < 0 || piece >= this.numColors) {
        throw new Error(`Invalid piece in position ${index + 1}: ${piece}`);
      }
    });

    this.board = board;
    this.gameState = 'playing';
  }

  setBoardRandom() {
    const arr = [];
    for (let x = 0; x < this.numPieces; x++) {
      arr.push(Math.floor(Math.random() * this.numColors));
    }
    this.setBoard(arr);
  }

  attempt(guess) {
    // TODO: validate input
    if (this.gameState != 'playing') throw new Error('Cannot attempt to solve game at this time');

    const result = new Guess(guess, this.board);
    this.tries.push(result);
    if (result.placement == this.numPieces) this.gameState = 'win';
    else if (this.tries.length >= this.maxTries) this.gameState = 'loss';
  }
}

function isWholeNum(num) {
  if (typeof num == 'string') num = +num;
  return Number.isSafeInteger(num);
}

function validateNum(num, max) {
  max = max || Infinity;
  return isWholeNum(num) && (num > 0) && (num < max);
}

module.exports = mastermind;
