const React = require('react');
const PropTypes = require('prop-types');
const Guess = require('../guessspot/guess');
require('./row.less');

class Row extends React.Component {
  static propTypes = {
    // submit: PropTypes.func.isRequired,
    colors: PropTypes.number.isRequired,
    spaces: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    // create aray of length `spaces`, all with val -1
    // sorry this is sory of cryptic, but this is the best way to do it
    // (because for loops suck)
    const arr = Array.apply(null, Array(this.props.spaces)).map(() => -1);
    this.state = {
      guess: arr,
    };
  }

  advaceColor = (color) => {
    color = (++color == this.props.colors) ? -1 : color;
    return color;
  }

  updateSpot = (position) => () => {
    const guess = this.state.guess;
    guess[position] = this.advaceColor(guess[position]);
    this.setState({ guess });
  }

  render() {
    const spots = this.state.guess.map((val, index) => {
      return (
        <Guess key={index}
          className="guess"
          color={this.state.guess[index]}
          change={this.updateSpot(index)}
        />);
    });
    return (
      <div className="guessrow">{spots}</div>
    );
  }

};

module.exports = Row;
