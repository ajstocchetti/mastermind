const Guess = require('./guess-check'); // guess class definition
// const mongo = require('./mongo')

module.exports = {
  generateAll,
  makeSolutionSpace,
}


function zeroes(size) {
  // create array of 0's
  return Array.apply(null, Array(size)).map((v,i) => 0);
}
function range(size) {
  // create array from 0 -> size-1
  return Array.apply(null, Array(size)).map((v,i) => i);
}

function generateAll(colors, spaces) {
  // there are colors^spaces total possibilities
  // create a list of all of those possibilities

  // handle edge cases here so dont need to deal with them in various solutions
  if (colors == 0) throw new Error('Must have at least 1 color');
  if (colors == 1) return [zeroes(spaces)];

  // if the number of colors is less than 36 (the node.js max radix)
  // the list is the number from 0 -> ((colors ^ spaces) - 1),
  // in base `colors`
  // so we generate that list of numbers, convert to base `colors`,
  // pad with leading zeroes, split the number into an array of digits,
  // then convert the digits in that array into base 10

  // if the number of colors is greater than 36, we need to create the list manually

  // it would be cool to do everything in base 36
  // store solutions as strings and not arrays
  // it would take up less space, but would limit to 36 colors (not unreasonable)

  if (colors <= 10) return generateAll10(colors, spaces);
  else if (colors <= 36) return generateAll36(colors, spaces);
  else return generateAllArray(colors, spaces);
}

function generateAll10(colors, spaces) {
  // fails if more than 10 colors
  if (colors > 10) throw new Error('Cannot have more than 10 colors for this solution generator');

  const numCombos = Math.pow(colors, spaces);
  return range(numCombos)
    .map(decimal => decimal.toString(colors))
    .map(num => leftPad(num, spaces).split(''));
}

function generateAll36(colors, spaces) {
  // this also works for number 2-10, but has unnecessary conversions
  // fails if more than 36 colors
  if (colors > 36) throw new Error('Cannot have more than 36 colors for this solution generator');

  const numCombos = Math.pow(colors, spaces);
  return range(numCombos)
    .map(decimal => decimal.toString(colors))
    .map(num => leftPad(num, spaces))
    .map(padded => padded.split('').map(basedNum => parseInt(basedNum, colors)));
}


function generateAllArray(colors, spaces) {
  const numCombos = Math.pow(colors, spaces);
  const combos = [];
  let arr = zeroes(spaces);
  while(arr) {
    combos.push(arr);
    arr = increment(arr.slice(), colors);
  }
  return combos;
}

function increment(arr, colors) {
  const max = colors - 1;
  let updated = false;

  for (let x = arr.length - 1; x >= 0; x--) {
    if (arr[x] < max) {
      arr[x]++;
      updated = true;
      break;
    } else if (arr[x] == max) {
      arr[x] = 0;
    }
  }
  return updated && arr; // returns false if array resets to zeroes
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





// function makeSolutionSpace(colors, spaces) {
//   const solutions = generateAll(colors, spaces);
//   const collection = `colors${colors}Xspaces${spaces}`;
//
//
//   // loop through array twice, so each possibility for each solution
//   solutions.forEach((soln, index, arr) => {
//     arr.forEach((val, valIndex) => {
//       // can optimize and omit winning solution
//       // saves solutions.length number of rows in the database
//       if (index == valIndex) return;
//       // can probobly optimize and omit no-score solutions, too
//       // but would require more logic on game player to work around
//
//       const entry = new Guess(val, soln);
//       entry.actual = soln;
//       // insert into mongo collection
//       // mongo.db.collection(collection).insert(entry, (err, reps) => {
//       //   if (err) console.log(err);
//       //   else console.log('inserted', index, valIndex);
//       // });
//     });
//   });
// }
