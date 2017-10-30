const actions = require('../actions');

const INITIAL_STATE = {
  gameState: 'uninitiated', // uninitiated, initializing, playing, won, loss
  tries: [],
  maxTries: null,
  numColors: null,
  numPieces: null,
};

const reduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GAME_SUBMIT_NEW:
      return {
        gameState: 'initializing',
        maxTries: action.tries,
        numColors: action.colors,
        numPieces: action.pieces,
        tried: [],
      };
    case actions.GAME_SUBMIT_NEW_SUCCESS:
      return {
        ...state,
        gameState: 'playing',
      };
    // case actions.GAME_SUBMIT_GUESS_SUCCESS:
    //   return
    default:
      return state
  }
}

module.exports = reduce;
