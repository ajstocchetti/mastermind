const React = require('react');
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;
const dispatcher = require('../../redux/dispatcher');
const Guess = require('../guessspot/guess');
require('./row.less');

class Row extends React.Component {
  static propTypes = {
    guess: PropTypes.array.isRequired,
    colors: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
  };

  advaceColor = (color) => {
    color = (++color == this.props.colors) ? -1 : color;
    return color;
  }

  updateSpot = (position) => () => {
    const color = this.advaceColor(this.props.guess[position]);
    this.props.update(position, color);
  }

  render() {
    const spots = this.props.guess.map((val, index) => {
      return (
        <Guess key={index}
          className="guess"
          color={this.props.guess[index]}
          change={this.updateSpot(index)}
        />);
    });
    return (
      <div className="guessrow">{spots}</div>
    );
  }

};

function mapStateToProps(state) {
  return {
    guess: state.guess,
    colors: state.game.numColors,
  };
}

module.exports = connect(
  mapStateToProps,
  { update: dispatcher.guess.update }
)(Row);
