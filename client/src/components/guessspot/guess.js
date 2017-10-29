const React = require('react');
const PropTypes = require('prop-types');
require('./guess.less');

class Guess extends React.Component {
  static propTypes = {
    color: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired,
  };

  getBg = () => {
    switch (this.props.color) {
      // red, black, blue, white, green, yellow
      case -1:
        return "gray";
      case 0:
        return "white";
      case 1:
        return "black";
      case 2:
        return "red";
      case 3:
        return "blue";
      case 4:
        return "green";
      case 5:
        return "yellow";
      case 6:
        return "purple";
      case 7:
      default:
        return "magenta";
    }
  };

  render() {
    const style = {
      backgroundColor: this.getBg(),
    };
    return (
      <div className="guessspot"
        style={style}
        onClick={this.props.change}>
      </div>
    );
  }
}

module.exports = Guess;
