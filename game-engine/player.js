// eventually these will be inputs
const GUESSES = 10;
const COLORS = 6;
const SPACES = 4;
const col = `colors${COLORS}Xspaces${SPACES}`


const MongoClient = require('mongodb').MongoClient;
const Mastermind = require('./mastermind');
const util = require('util');

let _db = null;

function connect() {
  if (_db) return Promise.resolve(_db);

  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/mastermind', function(err, db) {
  		if (err) {
  			console.log('Error connecting to MongoDb', err);
        reject(err);
  		} else {
  			console.log('Successfully connected to MongoDb');
  			_db = db;
        resolve(db);
  		}
  	});
  });
}

function printGame(game) {
  console.log(util.inspect(game, { depth: null }));
}

function randomGuess(colors, spaces) {
  return Array.apply(null, Array(spaces)).map(() => {
    return Math.floor(Math.random() * colors);
  });
}


connect().then(() => {
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
  // pick random possibility
  const nextGuess = possibilities.length ? possibilities[Math.floor(Math.random() * possibilities.length)] : randomGuess(COLORS, SPACES);
  game.attempt(nextGuess);
  if (game.gameState != 'playing') return game;

  const latest = game.tries[game.tries.length - 1];
  return _db.collection(col).find({
    guess: latest.guess,
    placement: latest.placement,
    color: latest.color,
  }, { actual: 1 }).toArray().then(solutions => {
    const lastPos = solutions.map(soln => soln.actual);
    // filter possibilities against lastPos
    if (!possibilities.length) possibilities = lastPos; // first iteration
    else {
      // TODO: this
    }
    console.log(`After guess ${game.tries.length} there are ${possibilities.length} possibilities`);
    return guess(game, possibilities);
  });
}
