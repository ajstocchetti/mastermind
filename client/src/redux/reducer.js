const redux = require('redux');
const game = require('./game/gameReducer');
const guess = require('./guess/guessReducer');

module.exports = redux.combineReducers({
  game,
  guess,
});
