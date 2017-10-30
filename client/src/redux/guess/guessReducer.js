const actions = require('../actions');

const INITIAL_STATE = [];

function initializeArr(size) {
  // create aray of length `spaces`, all with val -1
  // sorry this is sory of cryptic, but this is the best way to do it
  // (because for loops suck)
  return Array.apply(null, Array(size)).map(() => -1);
}

const reduce = (state = INITIAL_STATE, action) => {
  let nextArr;
  switch(action.type) {
    case actions.GAME_SUBMIT_NEW_SUCCESS:
      return initializeArr(action.pieces);
    case actions.GAME_SUBMIT_GUESS_SUCCESS:
      return initializeArr(state.length);
    case actions.GUESS_MODIFY_PIECE:
      nextArr = [...state];
      nextArr[action.position] = action.color;
      return nextArr;
    default:
      return state;
  }
};

module.exports = reduce;
