const redux = require('redux');
const game = require('./game/gameReducer');

module.exports = redux.combineReducers({
  game,
});
