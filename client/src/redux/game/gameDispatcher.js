const actions = require('../actions');

function newGame(tries, colors, pieces) {
  return {
    type: actions.GAME_SUBMIT_NEW,
    tries,
    colors,
    pieces,
  };
}

module.exports = {
  newGame,
};
