const actions = require('../actions');

module.exports = {
  update,
};

function update(position, color) {
  return {
    type: actions.GUESS_MODIFY_PIECE,
    position,
    color,
  };
}
