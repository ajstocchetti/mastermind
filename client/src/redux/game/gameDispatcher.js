const actions = require('../actions');

function newGame(tries, colors, pieces) {
  return {
    types: [actions.GAME_SUBMIT_NEW, actions.GAME_SUBMIT_NEW_SUCCESS, actions.GAME_SUBMIT_NEW_FAILURE ],
    API: {
      url: '/api/newgame',
      method: 'POST',
      body: { tries, colors, pieces },
    },
    tries,
    colors,
    pieces,
  };
}

function guess(guess) {
  return {
    types: [
      actions.GAME_SUBMIT_GUESS,
      actions.GAME_SUBMIT_GUESS_SUCCESS,
      actions.GAME_SUBMIT_GUESS_FAILURE,
    ],
    API: {
      url: '/api/attempt',
      method: 'PUT',
      body: guess,
    },
  }
}

module.exports = {
  newGame,
  guess,
};
