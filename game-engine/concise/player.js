// eventually these will be inputs
const GUESSES = 10;
const COLORS = 6;
const SPACES = 4;

const utils = require('./utils');
const col = utils.getCollectionName(COLORS, SPACES);


const MongoClient = require('mongodb').MongoClient;
const Mastermind = require('../mastermind');
const util = require('util');

function printGame(game) {
  console.log(util.inspect(game, { depth: null }));
}

function randomGuess(colors, spaces) {
  return Array.apply(null, Array(spaces)).map(() => {
    return Math.floor(Math.random() * colors);
  });
}


utils.ready().then(() => {
  const game = new Mastermind(GUESSES, COLORS, SPACES);
  game.setBoardRandom();

  // const initialGuess = randomGuess(COLORS, SPACES);
  // game.attempt(initialGuess);
  return guess(game, []).then(resp => {
    console.log('game finished');
    printGame(resp);
  }).catch(err => {
    console.log('Error playing game');
    console.log(err);
  });
});


function guess(game, possibilities) {
  if (possibilities.length == 0 && game.tries.length) {
    throw new Error('Ran out of possibilities!');
  }

  printGame(game);
  const pLen = possibilities.length;
  let nextGuess; // could do this with ternery, but its way too long
  if (pLen) {
    // pick random possibility
    const rand = possibilities[Math.floor(Math.random() * pLen)];
    nextGuess = utils.convertDbToGame(rand, COLORS);
  } else {
    // initial guess
    nextGuess = randomGuess(COLORS, SPACES);
  }
  game.attempt(nextGuess);
  if (game.gameState != 'playing') return game;

  const latest = game.tries[game.tries.length - 1];
  const query = {
    g: utils.convertGameToDb(latest.guess, COLORS),
    p: latest.placement,
    c: latest.color,
  };
  return utils.getDb().collection(col).find(query, { a: 1 }).toArray()
  .then(solutions => {
    const lastPos = solutions.map(soln => soln.a);
    // filter possibilities against lastPos
    if (!possibilities.length) possibilities = lastPos; // first iteration
    else {
      // so this is has O(nxm)
      // where n = number of old possibilities
      // and m = munber of possibilities for this guess
      // not great...
      possibilities = possibilities.filter(val => {
        return ~lastPos.indexOf(val);
      });
    }
    console.log(`After guess ${game.tries.length} there are ${possibilities.length} possibilities`);
    return guess(game, possibilities);
  });
}
