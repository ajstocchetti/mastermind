const actions = require('../actions');

const INITIAL_STATE = {
  gameState: 'uninitiated', // uninitiated, initializing, playing, won, loss
  tries: [],
  maxTries: 10,
  numColors: 6,
  numPieces: 4,
};

const reduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GAME_SUBMIT_NEW:
      return {
        gameState: 'initializing',
        maxTries: action.tries,
        numColors: action.colors,
        numPieces: action.pieces,
        tries: [],
      };
    case actions.GAME_SUBMIT_NEW_SUCCESS:
    case actions.GAME_SUBMIT_GUESS_SUCCESS:
      return action.RESPONSE.data;
    default:
      return state
  }
}

module.exports = reduce;
