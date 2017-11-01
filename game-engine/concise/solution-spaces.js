const Guess = require('../guess-check'); // guess class definition
const utils = require('./utils');


module.exports = {
  generateAll,
  makeSolutionSpace,
}

function generateAll(colors, spaces) {
  // there are colors^spaces total possibilities
  // create a list of all of those possibilities
  // instead of array of numbers, convert number to base = # colors,
  // (which is basically base 36)
  // and join arr into a string so it takes less space

  if (colors == 0) throw new Error('Must have at least 1 color');
  if (colors == 1) return [utils.zeroes(spaces)];
  // fails if more than 36 colors
  if (colors > 36) throw new Error('Cannot have more than 36 colors for this solution generator');

  const numCombos = Math.pow(colors, spaces);
  return utils.range(numCombos)
    .map(decimal => decimal.toString(colors))
    .map(num => leftPad(num, spaces));
}

function leftPad(num, size) {
  // TODO: validation
  // - num is number or string
  // - size is integer
  // - num is not more than size digits

  let str = String(num);
  while (str.length < size) str = '0' + str;
  return str;
}


function makeSolutionSpace(colors, spaces) {
  const solutions = generateAll(colors, spaces);
  const collection = utils.getCollectionName(colors, spaces);

  return doSomeStuff(solutions, 0, 0, collection, colors)
  .then(() => {
    console.log('Finished saving solution space');
  }).catch(err => {
    // should never get here
    console.log('Error saving solution space');
    console.log(err);
  });
}


function doSomeStuff(solutions, solnIndex, guessIndex, collection, colors) {
  let finished = false;
  const entries = [];

  // batch 800 at a time
  for(let x = 0; x < 800; x++) {
    if (guessIndex != solnIndex) {
      // skip the winning guess
      const guessArr = utils.convertDbToGame(solutions[guessIndex], colors);
      const solnArr = utils.convertDbToGame(solutions[solnIndex], colors);
      const theGuess = new Guess(guessArr, solnArr);
      const entry = {
        a: solutions[solnIndex],
        g: utils.convertGameToDb(theGuess.guess, colors),
        p: theGuess.placement,
        c: theGuess.color,
      }
      entries.push(entry);
    }

    // advance counters
    guessIndex++;
    if (guessIndex == solutions.length) {
      guessIndex = 0;
      solnIndex++;
    }

    // check if finished
    if (guessIndex == 0 && solnIndex == solutions.length) {
      finished = true;
      break;
    }
  }

  return utils.getDb().collection(collection).insertMany(entries)
  .catch(err => {
    console.log('error inserting into DB');
    console.log(err);
  }).then(() => {
    console.log(`Processed guess ${guessIndex} of solution ${solnIndex}`);
    if (finished) return Promise.resolve();
    else return doSomeStuff(solutions, solnIndex, guessIndex, collection, colors);
  });
}
